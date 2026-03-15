"use client"

import { useState, useMemo, useRef } from "react"
import Link from "next/link"
import evSubsidyRaw from "@/data/ev-subsidy.json"
import localSubsidyRaw from "@/data/localSubsidy.json"
import postsData from "@/data/posts.json"

type EvItem = { type: string; brand: string; model: string; subsidy: number; class?: string }
type LocalEntry = { region_kr: string; ev_subsidy: { min: number; max: number } }

const ALL_VEHICLES = evSubsidyRaw as EvItem[]
const LOCAL_MAP = Object.fromEntries(
  (localSubsidyRaw.subsidy_data as LocalEntry[]).map((d) => [d.region_kr, d.ev_subsidy])
)
const REGIONS = (localSubsidyRaw.subsidy_data as LocalEntry[]).map((d) => d.region_kr)

const TYPE_TABS = ["전체", "승용", "경·소형", "화물", "승합", "이륜"] as const
type TypeTab = typeof TYPE_TABS[number]
const TYPE_MAP: Record<TypeTab, string[]> = {
  전체: [], 승용: ["승용"], "경·소형": ["경·소형"], 화물: ["화물"], 승합: ["승합"], 이륜: ["이륜"],
}
const TYPE_ICONS: Record<TypeTab, string> = {
  전체: "⚡", 승용: "🚗", "경·소형": "🚙", 화물: "🚛", 승합: "🚌", 이륜: "🛵",
}

function fmt(n: number) { return n.toLocaleString("ko-KR") + "만원" }
function fmtRange(min: number, max: number) {
  if (min === max) return fmt(min)
  return `${min.toLocaleString()}~${max.toLocaleString()}만원`
}

export default function Home() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [query, setQuery] = useState("")
  const [typeTab, setTypeTab] = useState<TypeTab>("전체")
  const [selected, setSelected] = useState<EvItem | null>(null)
  const [region, setRegion] = useState(REGIONS[0])
  const [regionQuery, setRegionQuery] = useState("")
  const [guidePage, setGuidePage] = useState(1)
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const types = TYPE_MAP[typeTab]
    return ALL_VEHICLES.filter((v) => {
      const matchType = types.length === 0 || types.includes(v.type)
      const q = query.trim().toLowerCase()
      return matchType && (q === "" || v.model.toLowerCase().includes(q) || v.brand.toLowerCase().includes(q))
    })
  }, [query, typeTab])

  const filteredRegions = useMemo(() =>
    REGIONS.filter((r) => r.includes(regionQuery)), [regionQuery]
  )

  const localSubsidy = LOCAL_MAP[region]
  const localMin = localSubsidy?.min ?? 0
  const localMax = localSubsidy?.max ?? 0
  const totalMin = selected ? selected.subsidy + localMin : 0
  const totalMax = selected ? selected.subsidy + localMax : 0

  const handleVehicleSelect = (v: EvItem) => {
    setSelected(v)
    setStep(2)
    setTimeout(() => step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
  }

  const handleRegionConfirm = () => {
    setStep(3)
    setTimeout(() => step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
  }

  const handleReset = () => {
    setStep(1)
    setSelected(null)
    setQuery("")
    setTypeTab("전체")
  }

  return (
    <main className="min-h-screen pt-8 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Hero */}
        <section className="text-center py-10 md:py-14 animate-fade-in">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">2026 전기차 보조금 계산기</p>
          <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">
            내 차,{" "}
            <span className="text-emerald-600">보조금 얼마나 받을까?</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            차량 선택 → 지역 선택 순서로 진행하면 <strong className="text-foreground">국고 + 지자체 보조금</strong>을 바로 확인할 수 있습니다.
          </p>
        </section>

        {/* Stepper */}
        <div className="max-w-[1200px] mx-auto mb-20 space-y-3 animate-fade-in">

          {/* ── STEP 1: 차량 선택 ── */}
          <div className="premium-card rounded-3xl border border-border overflow-hidden transition-all duration-300">

            {/* 헤더 */}
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                  step > 1 ? "bg-emerald-600 text-white" : "border-2 border-emerald-600 text-emerald-600"
                }`}>
                  {step > 1 ? "✓" : "1"}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-foreground text-sm">차량 선택</p>
                  {step > 1 && selected && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{selected.brand} · {selected.model} <span className="text-emerald-600 font-semibold">국고 {selected.subsidy.toLocaleString()}만원</span></p>
                  )}
                </div>
              </div>
              {step > 1 && (
                <button
                  onClick={() => { setStep(1); setSelected(null) }}
                  className="shrink-0 ml-3 text-xs text-emerald-600 border border-emerald-200 rounded-full px-3 py-1.5 hover:bg-emerald-50 transition-colors font-semibold"
                >
                  변경
                </button>
              )}
            </div>

            {/* 내용 — step 1일 때만 */}
            {step === 1 && (
              <div className="px-6 pb-6 border-t border-border animate-fade-in">
                {/* Search */}
                <div className="relative mt-5 mb-4">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="차량명 또는 브랜드 검색 (예: 아이오닉6, 기아)"
                    className="w-full rounded-2xl border border-border bg-background pl-11 pr-10 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {query && (
                    <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-sm">✕</button>
                  )}
                </div>

                {/* Type Tabs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {TYPE_TABS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTypeTab(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                        typeTab === t
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-background text-muted-foreground border-border hover:border-emerald-400 hover:text-foreground"
                      }`}
                    >
                      {TYPE_ICONS[t]} {t}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mb-2">
                  <span className="font-bold text-emerald-600">{filtered.length}</span>개 차량 · 차량을 클릭하면 다음 단계로 이동합니다
                </p>

                {/* Vehicle List */}
                <div className="overflow-y-auto max-h-[380px] space-y-1.5 pr-1">
                  {filtered.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground text-sm">
                      검색 결과가 없습니다.
                      <button className="block mx-auto mt-2 text-emerald-600 underline underline-offset-2 text-xs" onClick={() => { setQuery(""); setTypeTab("전체") }}>초기화</button>
                    </div>
                  )}
                  {filtered.map((v, i) => (
                    <button
                      key={`${v.model}-${i}`}
                      onClick={() => handleVehicleSelect(v)}
                      className="w-full text-left rounded-2xl px-4 py-3 transition-all border border-border bg-background hover:border-emerald-400 hover:bg-emerald-50/50 hover:shadow-sm active:scale-[0.99]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{v.model}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{v.brand} · {v.type}{v.class ? ` · ${v.class}` : ""}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-emerald-600">국고 {v.subsidy.toLocaleString()}만원</p>
                          <p className="text-xs text-muted-foreground mt-0.5">클릭하여 선택 →</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── STEP 2: 지역 선택 ── */}
          {step >= 2 && (
            <div ref={step2Ref} className="premium-card rounded-3xl border border-border overflow-hidden animate-fade-in">

              <div className="flex items-center justify-between px-6 py-5">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                    step > 2 ? "bg-emerald-600 text-white" : "border-2 border-emerald-600 text-emerald-600"
                  }`}>
                    {step > 2 ? "✓" : "2"}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-foreground text-sm">거주 지역 선택</p>
                    {step > 2 && (
                      <p className="text-xs text-muted-foreground mt-0.5">{region} <span className="text-blue-600 font-semibold">지자체 {fmtRange(localMin, localMax)}</span></p>
                    )}
                  </div>
                </div>
                {step > 2 && (
                  <button
                    onClick={() => setStep(2)}
                    className="shrink-0 ml-3 text-xs text-emerald-600 border border-emerald-200 rounded-full px-3 py-1.5 hover:bg-emerald-50 transition-colors font-semibold"
                  >
                    변경
                  </button>
                )}
              </div>

              {step === 2 && (
                <div className="px-6 pb-6 border-t border-border animate-fade-in">
                  <p className="text-xs text-muted-foreground mt-5 mb-4">지역에 따라 지자체 보조금이 달라집니다. 거주하시는 지역을 선택해주세요.</p>

                  {/* 지역 검색 */}
                  <div className="relative mb-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
                    <input
                      type="text"
                      value={regionQuery}
                      onChange={(e) => setRegionQuery(e.target.value)}
                      placeholder="지역명 검색..."
                      className="w-full rounded-2xl border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {regionQuery && (
                      <button onClick={() => setRegionQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-sm">✕</button>
                    )}
                  </div>

                  {/* 지역 버튼 그리드 */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-5">
                    {filteredRegions.length === 0 && (
                      <p className="col-span-full text-center py-4 text-xs text-muted-foreground">검색 결과 없음</p>
                    )}
                    {filteredRegions.map((r) => {
                      const isSelected = r === region
                      const local = LOCAL_MAP[r]
                      return (
                        <button
                          key={r}
                          onClick={() => setRegion(r)}
                          className={`rounded-2xl px-3 py-3 text-left transition-all border ${
                            isSelected
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-md"
                              : "bg-background border-border hover:border-emerald-400 hover:bg-emerald-50/50"
                          }`}
                        >
                          <p className={`text-xs font-bold truncate ${isSelected ? "text-white" : "text-foreground"}`}>{r}</p>
                          <p className={`text-xs mt-0.5 ${isSelected ? "text-emerald-100" : "text-muted-foreground"}`}>
                            {fmtRange(local.min, local.max)}
                          </p>
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={handleRegionConfirm}
                    className="w-full rounded-2xl bg-emerald-600 text-white py-4 text-sm font-bold hover:bg-emerald-700 active:scale-[0.99] transition-all shadow-md"
                  >
                    {region} 선택 완료 → 결과 보기
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 3: 결과 ── */}
          {step === 3 && (
            <div ref={step3Ref} className="premium-card rounded-3xl border-2 border-emerald-500 overflow-hidden animate-fade-in shadow-lg">
              <div className="px-6 py-5 bg-emerald-600">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm font-bold text-emerald-600 shrink-0">3</span>
                  <p className="font-bold text-white text-sm">예상 보조금 결과</p>
                </div>
              </div>

              <div className="px-6 py-6">
                <p className="text-xs text-muted-foreground mb-1">{selected?.brand}</p>
                <p className="text-base font-bold text-foreground mb-5">{selected?.model}</p>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between rounded-2xl px-5 py-4 bg-emerald-50 border border-emerald-100">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">🏛️ 국고 보조금</p>
                      <p className="text-xs text-muted-foreground">환경부 지원</p>
                    </div>
                    <p className="text-xl font-black text-emerald-700">{selected ? fmt(selected.subsidy) : "-"}</p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl px-5 py-4 bg-blue-50 border border-blue-100">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">🏢 지자체 보조금</p>
                      <p className="text-xs text-muted-foreground">{region} 지원</p>
                    </div>
                    <p className="text-xl font-black text-blue-700">{fmtRange(localMin, localMax)}</p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl px-5 py-5 bg-emerald-600 shadow-sm">
                    <div>
                      <p className="text-xs text-emerald-100 mb-0.5">💰 총 보조금</p>
                      <p className="text-xs text-emerald-200">국고 + 지자체 합산</p>
                    </div>
                    <p className="text-2xl font-black text-white">{fmtRange(totalMin, totalMax)}</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 mb-5">
                  <p className="text-xs text-amber-700">
                    ⚠️ 참고용 수치입니다. 실제 보조금은 지자체 예산 소진 여부, 신청 시기, 차량 옵션 등에 따라 다를 수 있습니다.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full rounded-2xl border border-border bg-background py-3.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
                >
                  ↩ 다시 계산하기
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Regional Table */}
        <section className="mb-16 animate-fade-in">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">지역별 현황</p>
          <h2 className="text-2xl font-bold text-foreground mb-4">2026 지역별 전기차 지자체 보조금</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">지역</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">지자체 보조금</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">아이오닉6 기준 총 보조금 예시</th>
                </tr>
              </thead>
              <tbody>
                {(localSubsidyRaw.subsidy_data as LocalEntry[]).map((d, i) => (
                  <tr key={d.region_kr} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className="px-4 py-2.5 font-medium text-foreground">{d.region_kr}</td>
                    <td className="px-4 py-2.5 text-right">{fmtRange(d.ev_subsidy.min, d.ev_subsidy.max)}</td>
                    <td className="px-4 py-2.5 text-right text-emerald-600 font-semibold">
                      {fmtRange(570 + d.ev_subsidy.min, 570 + d.ev_subsidy.max)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">* 더 뉴 아이오닉6 2WD 롱레인지 국고 570만원 기준 예시</p>
        </section>

        {/* Application Guide */}
        <section className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">신청 방법</p>
          <h2 className="text-2xl font-bold text-foreground mb-5">전기차 보조금 신청 방법</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { step: "01", title: "차량 선택 및 계약", desc: "구매할 전기차를 결정하고 딜러와 계약 시 보조금 신청 의사를 밝힙니다." },
              { step: "02", title: "딜러 대행 신청", desc: "제조사·딜러가 ev.or.kr을 통해 보조금을 대행 신청합니다. 소비자 직접 신청 불필요." },
              { step: "03", title: "승인 후 출고", desc: "지자체 보조금 승인 후 차량 출고. 보조금은 구매대금에서 자동 차감됩니다." },
              { step: "04", title: "의무 운행 2년", desc: "2년 이내 매각·이전 시 경과 기간에 따라 보조금 일부 반납이 필요합니다." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="premium-card rounded-2xl border border-border p-5 flex gap-4">
                <span className="text-2xl font-black text-emerald-600 shrink-0">{step}</span>
                <div>
                  <p className="font-semibold text-foreground mb-1">{title}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
            <p className="text-sm font-semibold text-emerald-800 mb-1">보조금 잔여 물량 확인</p>
            <p className="text-sm text-emerald-700">무공해차 통합누리집 <strong>ev.or.kr</strong>에서 지역별·차종별 보조금 잔여 물량을 실시간으로 확인할 수 있습니다.</p>
          </div>
        </section>

        {/* 게시판 */}
        {(() => {
          const PER_PAGE = 5
          const totalPages = Math.ceil(postsData.length / PER_PAGE)
          const pageItems = postsData.slice((guidePage - 1) * PER_PAGE, guidePage * PER_PAGE)

          return (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1">전기차 가이드</p>
                  <h2 className="text-2xl font-bold text-foreground">전기차 구매 정보</h2>
                </div>
                <span className="text-xs text-muted-foreground">{(guidePage - 1) * PER_PAGE + 1}–{Math.min(guidePage * PER_PAGE, postsData.length)} / {postsData.length}개</span>
              </div>

              {/* 게시판 리스트 */}
              <div className="rounded-2xl border border-border overflow-hidden mb-4">
                <div className="grid grid-cols-[1fr_90px_70px] bg-muted px-4 py-2.5 text-xs font-semibold text-muted-foreground border-b border-border">
                  <span>제목</span>
                  <span className="text-center">카테고리</span>
                  <span className="text-right">날짜</span>
                </div>

                {pageItems.map((post) => {
                  const isOpen = expandedGuide === String(post.id)
                  return (
                    <div key={post.id} className="border-b border-border last:border-0">
                      <button
                        onClick={() => setExpandedGuide(isOpen ? null : String(post.id))}
                        className="w-full grid grid-cols-[1fr_90px_70px] items-center px-4 py-3.5 hover:bg-emerald-50/50 transition-colors text-left gap-2"
                      >
                        <div className="min-w-0">
                          <p className={`text-sm font-semibold truncate ${isOpen ? "text-emerald-700" : "text-foreground"}`}>{post.title}</p>
                          {!isOpen && <p className="text-xs text-muted-foreground mt-0.5 truncate">{post.summary}</p>}
                        </div>
                        <span className="text-center shrink-0">
                          <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">{post.category}</span>
                        </span>
                        <span className="text-xs text-muted-foreground text-right shrink-0">{post.date.slice(5)}</span>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-5 pt-2 bg-emerald-50/40 border-t border-emerald-100 animate-fade-in">
                          <p className="text-xs text-muted-foreground mb-3">{post.summary}</p>
                          <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{post.content}</div>
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {post.tags.map((tag) => (
                              <span key={tag} className="text-xs bg-background border border-border rounded-full px-2 py-0.5 text-muted-foreground">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* 페이지네이션 */}
              <div className="flex items-center justify-center gap-1">
                <button
                  onClick={() => { setGuidePage((p) => Math.max(1, p - 1)); setExpandedGuide(null) }}
                  disabled={guidePage === 1}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-border text-muted-foreground hover:border-emerald-400 hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← 이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setGuidePage(p); setExpandedGuide(null) }}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all border ${
                      p === guidePage
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "border-border text-muted-foreground hover:border-emerald-400 hover:text-emerald-600"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => { setGuidePage((p) => Math.min(totalPages, p + 1)); setExpandedGuide(null) }}
                  disabled={guidePage === totalPages}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-border text-muted-foreground hover:border-emerald-400 hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  다음 →
                </button>
              </div>
            </section>
          )
        })()}

        {/* FAQ */}
        <section className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">자주 묻는 질문</p>
          <h2 className="text-2xl font-bold text-foreground mb-5">전기차 보조금 FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "2026년 전기차 보조금은 언제부터 신청할 수 있나요?", a: "매년 환경부와 지자체의 보조금 공고 이후 신청이 시작됩니다. 보통 1~2월경 공고가 이루어지며, 차량 구매 계약 후 딜러가 대행 신청합니다." },
              { q: "법인도 전기차 보조금을 받을 수 있나요?", a: "네, 법인도 보조금을 받을 수 있습니다. 다만 일부 지자체는 개인 우선 지원 정책을 운영하기도 합니다." },
              { q: "전기차 보조금과 세금 감면은 중복 적용되나요?", a: "네, 개별소비세 감면(최대 300만원)과 취득세 감면(최대 140만원)이 보조금과 별도로 중복 적용됩니다." },
              { q: "보조금 받은 후 2년 내에 팔면 어떻게 되나요?", a: "2년 이내 매각·명의이전 시 경과 기간에 따라 보조금의 일부를 반납해야 합니다. 1년 이내 50~100% 반납이 기준입니다." },
            ].map(({ q, a }, i) => (
              <div key={i} className="premium-card rounded-2xl border border-border p-5">
                <p className="font-semibold text-foreground mb-2">Q. {q}</p>
                <p className="text-sm text-muted-foreground">A. {a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 모델Y 전용 섹션 */}
        <section className="mb-16 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">인기 모델 전용</p>
              <h2 className="text-2xl font-bold text-foreground mb-2">테슬라 모델Y 보조금 — 지역별 실구매가는?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                2026년 모델Y RWD·롱레인지 국고 보조금과 전국 17개 지자체 보조금을 합산한 실구매가를 한 페이지에서 확인하세요. 아이오닉5·EV6와의 보조금 비교도 제공합니다.
              </p>
              <ul className="space-y-1 mb-5">
                {["RWD 5,299만원 → 보조금 적용 시 최저 4,849만원~", "지역별 실구매가 표 · 국산 SUV 보조금 비교", "모델Y 자주 묻는 질문(FAQ) 포함"].map((t) => (
                  <li key={t} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>{t}
                  </li>
                ))}
              </ul>
              <Link
                href="/model-y-subsidy"
                className="inline-block rounded-2xl bg-emerald-600 text-white px-6 py-3 text-sm font-bold hover:bg-emerald-700 transition-colors shadow-md"
              >
                테슬라 모델Y 보조금 계산하기 →
              </Link>
            </div>
            <div className="shrink-0 text-center hidden md:block">
              <div className="w-32 h-32 rounded-3xl bg-emerald-100 flex items-center justify-center text-6xl">
                🚗
              </div>
              <p className="text-xs text-emerald-700 font-bold mt-2">Tesla Model Y</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">전기차 구매를 더 깊게 알아보시겠어요?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ev-guide" className="rounded-xl bg-emerald-600 text-white px-6 py-3 text-sm font-bold hover:bg-emerald-700 transition-colors">
              전기차 구매 가이드 보기
            </Link>
            <Link href="/ev-comparison" className="rounded-xl border border-border bg-card text-foreground px-6 py-3 text-sm font-bold hover:border-emerald-400 transition-colors">
              전기차 모델 비교하기
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
