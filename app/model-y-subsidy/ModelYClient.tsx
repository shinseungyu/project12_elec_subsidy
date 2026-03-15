"use client"

import { useState } from "react"
import Link from "next/link"
import localSubsidyRaw from "@/data/localSubsidy.json"

type LocalEntry = { region_kr: string; ev_subsidy: { min: number; max: number } }

const LOCAL_MAP = Object.fromEntries(
  (localSubsidyRaw.subsidy_data as LocalEntry[]).map((d) => [d.region_kr, d.ev_subsidy])
)
const REGIONS = (localSubsidyRaw.subsidy_data as LocalEntry[]).map((d) => d.region_kr)

const MODEL_Y_VARIANTS = [
  { name: "Model Y Premium RWD", price: 5299, subsidy: 170 },
  { name: "Model Y Premium Long Range AWD", price: 6399, subsidy: 210 },
]

function fmt(n: number) { return n.toLocaleString("ko-KR") + "만원" }
function fmtRange(min: number, max: number) {
  if (min === max) return fmt(min)
  return `${min.toLocaleString()}~${max.toLocaleString()}만원`
}

export default function ModelYClient() {
  const [variant, setVariant] = useState(MODEL_Y_VARIANTS[0])
  const [region, setRegion] = useState(REGIONS[0])
  const [regionQuery, setRegionQuery] = useState("")
  const [regionOpen, setRegionOpen] = useState(false)

  const local = LOCAL_MAP[region]
  const localMin = local?.min ?? 0
  const localMax = local?.max ?? 0
  const totalMin = variant.subsidy + localMin
  const totalMax = variant.subsidy + localMax
  const realPriceMin = variant.price - totalMax
  const realPriceMax = variant.price - totalMin

  const filteredRegions = REGIONS.filter((r) => r.includes(regionQuery))

  return (
    <main className="min-h-screen pt-8 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Hero */}
        <section className="text-center py-10 md:py-14 animate-fade-in">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">테슬라 모델Y 전용</p>
          <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">
            테슬라 모델Y 보조금,{" "}
            <span className="text-emerald-600">지역별로 얼마나 받을까?</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            2026년 테슬라 모델Y 국고 보조금과 거주 지역 지자체 보조금을 합산한 <strong className="text-foreground">실구매가를 바로 확인</strong>하세요.
          </p>
        </section>

        {/* 계산기 */}
        <section className="premium-card rounded-3xl border border-border p-6 md:p-8 mb-10 animate-fade-in">
          <h2 className="text-lg font-bold text-foreground mb-6">모델Y 보조금 계산기</h2>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {/* 트림 선택 */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">트림 선택</p>
              <div className="space-y-2">
                {MODEL_Y_VARIANTS.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setVariant(v)}
                    className={`w-full text-left rounded-2xl px-4 py-3.5 border transition-all ${
                      variant.name === v.name
                        ? "bg-emerald-50 border-emerald-400 shadow-sm"
                        : "bg-background border-border hover:border-emerald-300"
                    }`}
                  >
                    <p className={`text-sm font-semibold ${variant.name === v.name ? "text-emerald-800" : "text-foreground"}`}>{v.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">출고가 {fmt(v.price)} · 국고보조금 {fmt(v.subsidy)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 지역 선택 */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">거주 지역</p>
              <div className="relative">
                <input
                  type="text"
                  value={regionOpen ? regionQuery : region}
                  onChange={(e) => { setRegionQuery(e.target.value); setRegionOpen(true) }}
                  onFocus={() => { setRegionOpen(true); setRegionQuery("") }}
                  onBlur={() => setTimeout(() => { setRegionOpen(false); setRegionQuery("") }, 150)}
                  placeholder="지역 검색..."
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-xs">{regionOpen ? "▲" : "▼"}</span>
                {regionOpen && (
                  <div className="absolute z-50 top-full mt-1 w-full bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                    <div className="max-h-48 overflow-y-auto">
                      {filteredRegions.map((r) => (
                        <button
                          key={r}
                          onMouseDown={() => { setRegion(r); setRegionOpen(false); setRegionQuery("") }}
                          className={`w-full text-left px-4 py-2.5 text-sm flex justify-between hover:bg-emerald-50 transition-colors ${r === region ? "bg-emerald-50 font-semibold text-emerald-700" : "text-foreground"}`}
                        >
                          <span>{r}</span>
                          <span className="text-xs text-muted-foreground">{fmtRange(LOCAL_MAP[r].min, LOCAL_MAP[r].max)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">지자체 보조금은 예산 소진 시 종료될 수 있습니다.</p>
            </div>
          </div>

          {/* 결과 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-4">
              <p className="text-xs text-emerald-700 font-semibold mb-1">🏛️ 국고 보조금</p>
              <p className="text-xl font-black text-emerald-700">{fmt(variant.subsidy)}</p>
            </div>
            <div className="rounded-2xl bg-blue-50 border border-blue-100 px-4 py-4">
              <p className="text-xs text-blue-700 font-semibold mb-1">🏢 지자체 ({region})</p>
              <p className="text-xl font-black text-blue-700">{fmtRange(localMin, localMax)}</p>
            </div>
            <div className="rounded-2xl bg-emerald-600 px-4 py-4">
              <p className="text-xs text-emerald-100 font-semibold mb-1">💰 총 보조금</p>
              <p className="text-xl font-black text-white">{fmtRange(totalMin, totalMax)}</p>
            </div>
            <div className="rounded-2xl bg-background border border-border px-4 py-4">
              <p className="text-xs text-muted-foreground font-semibold mb-1">🏷️ 예상 실구매가</p>
              <p className="text-xl font-black text-foreground">{fmtRange(Math.max(0, realPriceMin), Math.max(0, realPriceMax))}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-center">
            ⚠️ 참고용 수치입니다. 실제 보조금은 지자체 예산 소진 여부, 신청 시기에 따라 다를 수 있습니다.
          </p>
        </section>

        {/* 지역별 실구매가 테이블 */}
        <section className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">지역별 비교</p>
          <h2 className="text-2xl font-bold text-foreground mb-4">테슬라 모델Y 지역별 실구매가 (RWD 기준)</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">지역</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">국고 보조금</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">지자체 보조금</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">총 보조금</th>
                  <th className="px-4 py-3 text-right font-semibold text-emerald-600">예상 실구매가</th>
                </tr>
              </thead>
              <tbody>
                {(localSubsidyRaw.subsidy_data as LocalEntry[]).map((d, i) => {
                  const nat = 170
                  const locMin = d.ev_subsidy.min
                  const locMax = d.ev_subsidy.max
                  const totalMin = nat + locMin
                  const totalMax = nat + locMax
                  const realMin = 5299 - totalMax
                  const realMax = 5299 - totalMin
                  return (
                    <tr key={d.region_kr} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <td className="px-4 py-2.5 font-medium text-foreground">{d.region_kr}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{fmt(nat)}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{fmtRange(locMin, locMax)}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-emerald-600">{fmtRange(totalMin, totalMax)}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-foreground">{fmtRange(Math.max(0,realMin), Math.max(0,realMax))}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">* Model Y Premium RWD 출고가 5,299만원 기준</p>
        </section>

        {/* 경쟁 모델 비교 */}
        <section className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">경쟁 모델 비교</p>
          <h2 className="text-2xl font-bold text-foreground mb-4">모델Y vs 국산 전기 SUV 보조금 비교 (서울 기준)</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">모델</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">출고가</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">국고 보조금</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">서울 지자체</th>
                  <th className="px-4 py-3 text-right font-semibold text-emerald-600">실구매가</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { model: "테슬라 Model Y RWD", price: 5299, nat: 170, local: 60 },
                  { model: "현대 아이오닉5 롱레인지 2WD", price: 5195, nat: 564, local: 60 },
                  { model: "기아 EV6 롱레인지 2WD", price: 4995, nat: 570, local: 60 },
                  { model: "기아 EV9 롱레인지 2WD", price: 6900, nat: 270, local: 60 },
                ].map(({ model, price, nat, local }, i) => (
                  <tr key={model} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className={`px-4 py-2.5 font-medium ${i === 0 ? "text-emerald-700" : "text-foreground"}`}>{model}{i === 0 && " ★"}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{fmt(price)}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{fmt(nat)}</td>
                    <td className="px-4 py-2.5 text-right text-muted-foreground">{fmt(local)}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-foreground">{fmt(price - nat - local)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">자주 묻는 질문</p>
          <h2 className="text-2xl font-bold text-foreground mb-5">테슬라 모델Y 보조금 FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "테슬라 모델Y RWD는 보조금을 전액 받을 수 있나요?", a: "네. 모델Y RWD 출고가가 5,299만원으로 5,500만원 이하이므로 국고 보조금 170만원을 전액 수령할 수 있습니다." },
              { q: "모델Y 롱레인지는 왜 보조금이 더 많은가요?", a: "롱레인지(6,399만원)는 5,500~8,500만원 구간에 해당해 국고 보조금의 50%만 지원받습니다. RWD(5,299만원)가 5,500만원 이하라 전액 지원을 받아 더 유리합니다." },
              { q: "테슬라 보조금은 딜러에서 바로 차감되나요?", a: "네, 테슬라 코리아 공식 홈페이지 또는 딜러 계약 시 보조금 신청 의사를 밝히면 출고 후 보조금이 자동 차감된 금액으로 청구됩니다." },
              { q: "모델Y 보조금은 언제 소진되나요?", a: "서울·경기 등 대도시는 연초에 빠르게 소진됩니다. 1~3월 내 계약하는 것이 가장 유리하며, ev.or.kr에서 잔여 물량을 실시간 확인할 수 있습니다." },
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
          <p className="text-sm text-muted-foreground mb-4">다른 전기차 보조금도 확인해보세요</p>
          <Link href="/" className="rounded-xl bg-emerald-600 text-white px-6 py-3 text-sm font-bold hover:bg-emerald-700 transition-colors">
            ⚡ 전체 전기차 보조금 계산기
          </Link>
        </div>

      </div>
    </main>
  )
}
