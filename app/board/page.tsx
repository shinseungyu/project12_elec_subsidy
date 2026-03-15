import posts from '@/data/posts.json'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Zap, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react'

interface Post {
  id: number
  title: string
  date: string
  category: string
  summary: string
  content: string
  tags: string[]
}

interface Props {
  searchParams: Promise<{ id?: string; page?: string }>
}

const POSTS_PER_PAGE = 5

const defaultMetadata: Metadata = {
  title: '전기차 보조금 가이드 게시판 | 전기차 구매 정보 총정리',
  description: '전기차 보조금 신청 방법, 차량별 실구매가, 충전 비용, 배터리 수명 등 전기차 구매에 필요한 모든 정보를 확인하세요.',
  alternates: { canonical: '/board' },
  openGraph: {
    title: '전기차 보조금 가이드 게시판',
    description: '전기차 보조금 신청 방법, 차량별 실구매가, 충전 비용 등 전기차 구매 정보 총정리.',
  },
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { id } = await searchParams
  if (!id) return defaultMetadata

  const allPosts: Post[] = posts as Post[]
  const post = allPosts.find((p) => p.id === Number(id))
  if (!post) return defaultMetadata

  return {
    title: `${post.title} | 전기차 보조금 계산기`,
    description: post.summary,
    alternates: { canonical: `/board?id=${post.id}` },
    openGraph: {
      title: `${post.title} | 전기차 보조금 계산기`,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function BoardPage({ searchParams }: Props) {
  const { id, page } = await searchParams
  const allPosts: Post[] = (posts as Post[]).sort((a, b) => b.date.localeCompare(a.date))

  // 개별 포스트 뷰
  if (id) {
    const post = allPosts.find((p) => p.id === Number(id))

    if (!post) {
      return (
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-muted-foreground">게시글을 찾을 수 없습니다.</p>
          <Link href="/board" className="mt-4 inline-block text-emerald-600 font-semibold hover:underline">목록으로</Link>
        </main>
      )
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      keywords: post.tags.join(', '),
    }

    return (
      <main className="mx-auto max-w-3xl px-4 py-12 md:py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Link href="/board" className="mb-8 inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" /> 목록으로 돌아가기
        </Link>

        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
          <div className="mb-4">
            <span className="inline-flex rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              {post.category}
            </span>
          </div>
          <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl leading-snug">
            {post.title}
          </h1>
          <div className="mb-8 flex flex-wrap gap-4 border-b border-border pb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
            <span className="flex items-center gap-1"><Tag className="h-4 w-4" /> {post.tags.join(', ')}</span>
          </div>

          <div className="prose prose-gray max-w-none text-base leading-loose text-foreground">
            {post.content.split('\n').map((line, i) =>
              line.trim() === ''
                ? <br key={i} />
                : <p key={i} className="mb-2 whitespace-pre-wrap">{line}</p>
            )}
          </div>
        </article>

        <section className="mt-16">
          <h2 className="mb-6 text-lg font-bold text-foreground">다른 전기차 가이드</h2>
          <div className="flex flex-col gap-3">
            {allPosts.filter(p => p.id !== post.id).slice(0, 5).map(p => (
              <Link key={p.id} href={`/board?id=${p.id}`} className="block rounded-xl border border-border bg-card p-5 transition-colors hover:bg-muted/50">
                <span className="mb-1 inline-block text-xs font-semibold text-emerald-600">{p.category}</span>
                <p className="text-base font-semibold text-foreground hover:text-emerald-600 transition-colors">{p.title}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    )
  }

  // 목록 뷰 — 페이지네이션
  const currentPage = Math.max(1, Number(page) || 1)
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE
  const pagePosts = allPosts.slice(startIdx, startIdx + POSTS_PER_PAGE)

  return (
    <main className="min-h-screen bg-background pb-20">
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center md:py-16">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <Zap className="h-7 w-7 text-emerald-600" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            전기차 보조금 &amp; 구매 가이드
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground leading-relaxed">
            보조금 신청 방법부터 차량별 실구매가, 충전 비용, 배터리 수명까지 전기차 구매에 필요한 모든 정보를 제공합니다.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            전체 <strong className="text-foreground">{allPosts.length}개</strong> 글 &middot; {currentPage}/{totalPages} 페이지
          </p>
        </div>

        <div className="grid gap-6">
          {pagePosts.map((post) => (
            <Link
              key={post.id}
              href={`/board?id=${post.id}`}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-4">
                  <span className="inline-flex rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h2 className="mb-2 text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {post.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="페이지 네비게이션">
            {currentPage > 1 ? (
              <Link
                href={`/board?page=${currentPage - 1}`}
                className="flex items-center gap-1 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-emerald-400 hover:text-emerald-600 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" /> 이전
              </Link>
            ) : (
              <span className="flex items-center gap-1 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted-foreground/40 cursor-not-allowed">
                <ChevronLeft className="h-4 w-4" /> 이전
              </span>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <Link
                key={p}
                href={`/board?page=${p}`}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold transition-colors ${
                  p === currentPage
                    ? 'border-emerald-500 bg-emerald-600 text-white'
                    : 'border-border bg-card text-foreground hover:border-emerald-400 hover:text-emerald-600'
                }`}
              >
                {p}
              </Link>
            ))}

            {currentPage < totalPages ? (
              <Link
                href={`/board?page=${currentPage + 1}`}
                className="flex items-center gap-1 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-emerald-400 hover:text-emerald-600 transition-colors"
              >
                다음 <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span className="flex items-center gap-1 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted-foreground/40 cursor-not-allowed">
                다음 <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </nav>
        )}
      </div>
    </main>
  )
}
