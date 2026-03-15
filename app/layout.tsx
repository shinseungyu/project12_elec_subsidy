import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-kr'
})

export const metadata: Metadata = {
  title: {
    default: '전기차 보조금 조회 계산기 | 2026 국고·지자체 보조금/지원금',
    template: '%s | 2026 국고·지자체 보조금/지원금 조회',
  },
  description: '2026년 최신 전기차 보조금을 1초 만에 조회하세요. 전국 지자체별 지원금과 테슬라, 현대 등 전 차종 실구매가를 실시간 데이터로 정확하게 계산해 드립니다.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://carelec.kr'),
  alternates: {
    canonical: '/',
  },
  keywords: [
    '전기차 보조금',
    '전기차 보조금 계산기',
    '전기차 보조금 조회',
    '2026 전기차 보조금',
    '전기차 국고보조금',
    '전기차 지자체보조금',
    '전기차 보조금 신청',
    '전기차 구매 보조금',
    '전기버스 보조금',
    '전기차 가격',
  ],
  openGraph: {
    title: '전기차 보조금 계산기 | 2026 국고·지자체 보조금/지원금 조회',
    description: '2026년 최신 전기차 보조금을 1초 만에 조회하세요. 전국 지자체별 지원금과 테슬라, 현대 등 전 차종 실구매가를 실시간 데이터로 정확하게 계산해 드립니다.',
    url: '/',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'carelec.kr',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://carelec.kr'}/thumb.webp`,
        width: 1200,
        height: 630,
        alt: '전기차 보조금 계산기 썸네일',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '전기차 보조금 계산기 | 2026 국고·지자체 보조금/지원금 조회',
    description: '2026 전기차 보조금 계산기로 국고 보조금과 지자체 지원금을 간편하게 조회하세요.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://carelec.kr'}/thumb.webp`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  verification: {
    other: {
      'naver-site-verification': 'NAVER_VERIFICATION_PLACEHOLDER',
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-5378247298190063',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://carelec.kr'

  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '전기차 보조금 계산기 | 2026 국고·지자체 보조금/지원금 조회',
    description: '2026 전기차 보조금 계산기로 국고 보조금과 지자체 지원금을 간편하게 조회하세요.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: siteUrl,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    featureList: [
      '2026 전기차 국고 보조금 계산',
      '지자체별 추가 보조금 조회',
      '차종별 보조금 계산 (승용/승합/화물)',
      '실구매가 자동 계산',
      '17개 광역자치단체 지원',
    ],
  }

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '2026년 전기차 국고 보조금은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2026년 전기차 국고 보조금은 차종에 따라 다릅니다. 소형 승용은 400만원, 중형 승용은 500만원, 대형 승용은 650만원, 전기 승합차는 1,000만원, 전기 화물차는 1,200만원입니다. 단, 차량 가격이 5,500만원 초과~8,500만원 이하인 경우 보조금이 50% 감액되며, 8,500만원 초과 시 국고 보조금을 받을 수 없습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '전기차 지자체 보조금은 어떻게 받나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '전기차 지자체 보조금은 거주하는 지역의 지방자치단체에서 별도로 지원합니다. 국고 보조금과 함께 신청하며, 지역마다 지원 금액이 다릅니다. 전남(500만원), 전북(450만원), 강원·충북·경북·광주(400만원) 등 지방 지역이 상대적으로 높은 편입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '전기차 보조금 신청은 어떻게 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '전기차 보조금은 개인이 직접 신청하지 않고, 차량 구매 시 자동차 제조사·딜러가 대행 신청합니다. 소비자는 차량 구매 계약 후 보조금을 제외한 금액만 납부하면 됩니다. 무공해차 통합누리집(ev.or.kr)에서 보조금 신청 현황과 잔여 물량을 확인할 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '전기차 보조금에 소득 기준이 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2026년 기준 전기차 국고 보조금에는 별도의 소득 기준이 없습니다. 단, 차량 가격 기준이 적용되어 8,500만원 초과 차량은 국고 보조금을 받을 수 없습니다. 일부 지자체는 자체 기준을 추가로 운영할 수 있으니 거주 지역 지자체에 문의하는 것이 좋습니다.',
        },
      },
    ],
  }

  return (
    <html lang="ko">
      <head>
        <Script
          id="json-ld-app"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
          strategy="beforeInteractive"
        />
        <Script
          id="json-ld-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
          strategy="beforeInteractive"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5378247298190063"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${notoSansKR.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <SiteHeader />
        <div className="flex-1">
          {children}
        </div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
