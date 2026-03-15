"use client"

import { useState, useMemo, useRef } from "react"
import Link from "next/link"
import hydrogenRaw from "@/data/hydrogen-subsidy.json"
import localSubsidyRaw from "@/data/localSubsidy.json"

type HItem = { type: string; class: string; brand: string; model: string; subsidy: number; note?: string }
type LocalEntry = { region_kr: string; fcev_subsidy: { min: number; max: number } }

const ALL_VEHICLES = hydrogenRaw as HItem[]
const LOCAL_MAP = Object.fromEntries(
  (localSubsidyRaw.subsidy_data as LocalEntry[]).map((d) => [d.region_kr, d.fcev_subsidy])
)
const REGIONS = (localSubsidyRaw.subsidy_data as LocalEntry[]).map((d) => d.region_kr)

const CLASS_TABS = ["전체", "승용", "화물", "승합", "특수"] as const
type ClassTab = typeof CLASS_TABS[number]
const CLASS_ICONS: Record<ClassTab, string> = {
  전체: "⚡", 승용: "🚗", 화물: "🚛", 승합: "🚌", 특수: "🏗️",
}

function fmt(n: number) { return n.toLocaleString("ko-KR") + "만원" }
function fmtRange(min: number, max: number) {
  if (min === max) return fmt(min)
  return `${min.toLocaleString()}~${max.toLocaleString()}만원`
}

export default function HydrogenClient() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [query, setQuery] = useState("")
  const [classTab, setClassTab] = useState<ClassTab>("전체")
  const [selected, setSelected] = useState<HItem | null>(null)
  const [region, setRegion] = useState(REGIONS[0])
  const [regionQuery, setRegionQuery] = useState("")
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    return ALL_VEHICLES.filter((v) => {
      const matchClass = classTab === "전체" || v.class === classTab
      const q = query.trim().toLowerCase()
      return matchClass && (q === "" || v.model.toLowerCase().includes(q) || v.brand.toLowerCase().includes(q))
    })
  }, [query, classTab])

  const filteredRegions = useMemo(() =>
    REGIONS.filter((r) => r.includes(regionQuery)), [regionQuery]
  )

  const localSubsidy = LOCAL_MAP[region]
  const localMin = localSubsidy?.min ?? 0
  const localMax = localSubsidy?.max ?? 0
  const totalMin = selected ? selected.subsidy + localMin : 0
  const totalMax = selected ? selected.subsidy + localMax : 0

  const handleSelect = (v: HItem) => {
    setSelected(v)
    setStep(2)
    setTimeout(() => step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
  }

  const handleRegionConfirm = () => {
    setStep(3)
    setTimeout(() => step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
  }

  const handleReset = () => {
    setStep(1); setSelected(null); setQuery(""); setClassTab("전체")
  }

  return (
    <main className="min-h-screen pt-8 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Hero */}
        <section className="text-center py-10 md:py-14 animate-fade-in">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-600 mb-3">2026 수소차 보조금 계산기</p>
          <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">
            수소차 보조금,{" "}
            <span className="text-sky-600">얼마나 받을 수 있을까?</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            차량 선택 → 지역 선택 순서로 진행하면 <strong className="text-foreground">국고 + 지자체 수소차 보조금</strong>을 바로 확인할 수 있습니다.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-sky-50 border border-sky-200">
            <span className="text-xs text-sky-700 font-semibold">💧 수소전기차(FCEV) 전용 계산기 — 전기차(BEV) 보조금은 <Link href="/" className="underline underline-offset-2">메인 페이지</Link>에서 확인하세요</span>
          </div>
        </section>

        {/* Stepper */}
        <div className="max-w-[1200px] mx-auto mb-20 space-y-3 animate-fade-in">

          {/* STEP 1 */}
          <div className="premium-card rounded-3xl border border-border overflow-hidden transition-all duration-300">
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                  step > 1 ? "bg-sky-600 text-white" : "border-2 border-sky-600 text-sky-600"
                }`}>
                  {step > 1 ? "✓" : "1"}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-foreground text-sm">차량 선택</p>
                  {step > 1 && selected && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {selected.brand} · {selected.model}{" "}
                      <span className="text-sky-600 font-semibold">국고 {selected.subsidy.toLocaleString()}만원</span>
                    </p>
                  )}
                </div>
              </div>
              {step > 1 && (
                <button
                  onClick={() => { setStep(1); setSelected(null) }}
                  className="shrink-0 ml-3 text-xs text-sky-600 border border-sky-200 rounded-full px-3 py-1.5 hover:bg-sky-50 transition-colors font-semibold"
                >
                  변경
                </button>
              )}
            </div>

            {step === 1 && (
              <div className="px-6 pb-6 border-t border-border animate-fade-in">
                {/* Search */}
                <div className="relative mt-5 mb-4">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="차량명 또는 브랜드 검색 (예: 넥쏘, 현대)"
                    className="w-full rounded-2xl border border-border bg-background pl-11 pr-10 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {query && (
                    <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-sm">✕</button>
                  )}
                </div>

                {/* Class Tabs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {CLASS_TABS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setClassTab(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                        classTab === t
                          ? "bg-sky-600 text-white border-sky-600"
                          : "bg-background text-muted-foreground border-border hover:border-sky-400 hover:text-foreground"
                      }`}
                    >
                      {CLASS_ICONS[t]} {t}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mb-2">
                  <span className="font-bold text-sky-600">{filtered.length}</span>개 차량 · 클릭하면 다음 단계로 이동합니다
                </p>

                {/* Vehicle List */}
                <div className="overflow-y-auto max-h-[380px] space-y-1.5 pr-1">
                  {filtered.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground text-sm">
                      검색 결과가 없습니다.
                      <button className="block mx-auto mt-2 text-sky-600 underline underline-offset-2 text-xs" onClick={() => { setQuery(""); setClassTab("전체") }}>초기화</button>
                    </div>
                  )}
                  {filtered.map((v, i) => (
                    <button
                      key={`${v.model}-${i}`}
                      onClick={() => handleSelect(v)}
                      className="w-full text-left rounded-2xl px-4 py-3 transition-all border border-border bg-background hover:border-sky-400 hover:bg-sky-50/50 hover:shadow-sm active:scale-[0.99]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{v.model}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{v.brand} · {v.class}{v.note ? ` · ${v.note}` : ""}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-sky-600">국고 {v.subsidy.toLocaleString()}만원</p>
                          <p className="text-xs text-muted-foreground mt-0.5">클릭하여 선택 →</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* STEP 2 */}
          {step >= 2 && (
            <div ref={step2Ref} className="premium-card rounded-3xl border border-border overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between px-6 py-5">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                    step > 2 ? "bg-sky-600 text-white" : "border-2 border-sky-600 text-sky-600"
                  }`}>
                    {step > 2 ? "✓" : "2"}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-foreground text-sm">거주 지역 선택</p>
                    {step > 2 && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {region} <span className="text-blue-600 font-semibold">지자체 {fmtRange(localMin, localMax)}</span>
                      </p>
                    )}
                  </div>
                </div>
                {step > 2 && (
                  <button onClick={() => setStep(2)} className="shrink-0 ml-3 text-xs text-sky-600 border border-sky-200 rounded-full px-3 py-1.5 hover:bg-sky-50 transition-colors font-semibold">변경</button>
                )}
              </div>

              {step === 2 && (
                <div className="px-6 pb-6 border-t border-border animate-fade-in">
                  <p className="text-xs text-muted-foreground mt-5 mb-4">지역에 따라 지자체 수소차 보조금이 달라집니다.</p>

                  <div className="relative mb-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
                    <input
                      type="text"
                      value={regionQuery}
                      onChange={(e) => setRegionQuery(e.target.value)}
                      placeholder="지역명 검색..."
                      className="w-full rounded-2xl border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    {regionQuery && <button onClick={() => setRegionQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-sm">✕</button>}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-5">
                    {filteredRegions.map((r) => {
                      const isSelected = r === region
                      const local = LOCAL_MAP[r]
                      return (
                        <button
                          key={r}
                          onClick={() => setRegion(r)}
                          className={`rounded-2xl px-3 py-3 text-left transition-all border ${
                            isSelected ? "bg-sky-600 border-sky-600 text-white shadow-md" : "bg-background border-border hover:border-sky-400 hover:bg-sky-50/50"
                          }`}
                        >
                          <p className={`text-xs font-bold truncate ${isSelected ? "text-white" : "text-foreground"}`}>{r}</p>
                          <p className={`text-xs mt-0.5 ${isSelected ? "text-sky-100" : "text-muted-foreground"}`}>{fmtRange(local.min, local.max)}</p>
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={handleRegionConfirm}
                    className="w-full rounded-2xl bg-sky-600 text-white py-4 text-sm font-bold hover:bg-sky-700 active:scale-[0.99] transition-all shadow-md"
                  >
                    {region} 선택 완료 → 결과 보기
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div ref={step3Ref} className="premium-card rounded-3xl border-2 border-sky-500 overflow-hidden animate-fade-in shadow-lg">
              <div className="px-6 py-5 bg-sky-600">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm font-bold text-sky-600 shrink-0">3</span>
                  <p className="font-bold text-white text-sm">예상 보조금 결과</p>
                </div>
              </div>

              <div className="px-6 py-6">
                <p className="text-xs text-muted-foreground mb-1">{selected?.brand} · {selected?.class}</p>
                <p className="text-base font-bold text-foreground mb-5">{selected?.model}</p>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between rounded-2xl px-5 py-4 bg-sky-50 border border-sky-100">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">🏛️ 국고 보조금</p>
                      <p className="text-xs text-muted-foreground">환경부 지원</p>
                    </div>
                    <p className="text-xl font-black text-sky-700">{selected ? fmt(selected.subsidy) : "-"}</p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl px-5 py-4 bg-blue-50 border border-blue-100">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">🏢 지자체 보조금</p>
                      <p className="text-xs text-muted-foreground">{region} 지원</p>
                    </div>
                    <p className="text-xl font-black text-blue-700">{fmtRange(localMin, localMax)}</p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl px-5 py-5 bg-sky-600 shadow-sm">
                    <div>
                      <p className="text-xs text-sky-100 mb-0.5">💰 총 보조금</p>
                      <p className="text-xs text-sky-200">국고 + 지자체 합산</p>
                    </div>
                    <p className="text-2xl font-black text-white">{fmtRange(totalMin, totalMax)}</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 mb-5">
                  <p className="text-xs text-amber-700 text-center">
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

        {/* 지역별 수소차 보조금 테이블 */}
        <section className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-600 mb-2">지역별 현황</p>
          <h2 className="text-2xl font-bold text-foreground mb-4">2026 지역별 수소차 지자체 보조금</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">지역</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">지자체 보조금</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">넥쏘 기준 총 보조금 예시</th>
                </tr>
              </thead>
              <tbody>
                {(localSubsidyRaw.subsidy_data as LocalEntry[]).map((d, i) => (
                  <tr key={d.region_kr} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className="px-4 py-2.5 font-medium text-foreground">{d.region_kr}</td>
                    <td className="px-4 py-2.5 text-right">{fmtRange(d.fcev_subsidy.min, d.fcev_subsidy.max)}</td>
                    <td className="px-4 py-2.5 text-right text-sky-600 font-semibold">
                      {d.fcev_subsidy.min === 0 ? "미지원" : fmtRange(2250 + d.fcev_subsidy.min, 2250 + d.fcev_subsidy.max)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">* 현대 넥쏘 국고 2,250만원 기준 예시 / 제주도는 수소차 지자체 보조금 미지원</p>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-600 mb-2">자주 묻는 질문</p>
          <h2 className="text-2xl font-bold text-foreground mb-5">수소차 보조금 FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "수소차 보조금이 전기차보다 훨씬 많은 이유는?", a: "수소전기차는 충전 인프라 구축 비용이 크고 차량 가격이 높아 정부가 전기차 대비 더 많은 보조금을 지원합니다. 승용 기준 국고만 2,250만원으로 전기차의 4~5배 수준입니다." },
              { q: "수소차 보조금 신청 방법은?", a: "전기차와 동일하게 딜러가 무공해차 통합누리집(ev.or.kr)을 통해 대행 신청합니다. 소비자는 계약 시 보조금 신청 의사를 밝히면 됩니다." },
              { q: "수소 충전소는 어디서 찾나요?", a: "환경부 수소충전소 운영 현황(h2.or.kr) 또는 네이버·카카오 지도에서 '수소충전소'를 검색하면 위치를 확인할 수 있습니다. 현재 전국 약 200여 곳이 운영 중입니다." },
              { q: "제주도는 수소차 지자체 보조금이 없나요?", a: "네, 제주도는 전기차 중심의 무공해차 정책을 운영하고 있어 수소차 지자체 보조금이 지원되지 않습니다. 국고 보조금은 받을 수 있습니다." },
            ].map(({ q, a }, i) => (
              <div key={i} className="premium-card rounded-2xl border border-border p-5">
                <p className="font-semibold text-foreground mb-2">Q. {q}</p>
                <p className="text-sm text-muted-foreground">A. {a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">전기차 보조금도 확인하고 싶으신가요?</p>
          <Link href="/" className="rounded-xl bg-emerald-600 text-white px-6 py-3 text-sm font-bold hover:bg-emerald-700 transition-colors">
            ⚡ 전기차 보조금 계산기로 이동
          </Link>
        </div>

      </div>
    </main>
  )
}
