import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "전기차 비교 2026 | 인기 전기차 모델 한눈에 비교",
  description: "2026년 국내 인기 전기차 모델을 한눈에 비교하세요. 아이오닉6, EV6, 테슬라 모델3 등 주행거리·가격·배터리 용량을 비교해드립니다.",
  keywords: ["전기차 비교", "전기차 추천 2026", "아이오닉6 비교", "EV6 비교", "테슬라 모델3", "전기차 모델 비교", "전기차 주행거리"],
  alternates: { canonical: "/ev-comparison" },
}

const evModels = [
  {
    name: "현대 아이오닉6",
    range: "614km",
    price: 5195,
    subsidy: 500,
    battery: "77.4kWh",
    note: "최장 주행거리 세단",
  },
  {
    name: "현대 아이오닉5",
    range: "475km",
    price: 5260,
    subsidy: 500,
    battery: "77.4kWh",
    note: "공간감 넓은 크로스오버",
  },
  {
    name: "기아 EV6",
    range: "483km",
    price: 5192,
    subsidy: 500,
    battery: "77.4kWh",
    note: "스포티한 디자인",
  },
  {
    name: "기아 EV3",
    range: "501km",
    price: 3999,
    subsidy: 400,
    battery: "81.4kWh",
    note: "합리적 가격 소형 SUV",
  },
  {
    name: "테슬라 모델3",
    range: "570km",
    price: 5599,
    subsidy: 250,
    battery: "75kWh",
    note: "5,500만원 초과 — 보조금 50%",
  },
  {
    name: "테슬라 모델Y",
    range: "511km",
    price: 6099,
    subsidy: 250,
    battery: "75kWh",
    note: "5,500만원 초과 — 보조금 50%",
  },
  {
    name: "KG 모빌리티 토레스EVX",
    range: "420km",
    price: 4290,
    subsidy: 400,
    battery: "73.4kWh",
    note: "정통 SUV 스타일",
  },
  {
    name: "르노 조에",
    range: "363km",
    price: 3300,
    subsidy: 400,
    battery: "52kWh",
    note: "도심형 경제적 소형차",
  },
]

export default function EVComparisonPage() {
  return (
    <main className="min-h-screen py-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Hero */}
        <section className="text-center py-10 md:py-14">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">전기차 비교</p>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">2026 인기 전기차 비교</h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            국내에서 인기 있는 전기차 모델의 주행거리, 가격, 배터리 용량을 한눈에 비교하세요.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <div className="overflow-x-auto rounded-3xl border border-border shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-5 py-4 text-left font-bold text-foreground">차량명</th>
                  <th className="px-5 py-4 text-right font-bold text-foreground">주행거리</th>
                  <th className="px-5 py-4 text-right font-bold text-foreground">가격 (만원)</th>
                  <th className="px-5 py-4 text-right font-bold text-foreground">국고보조금 (예시)</th>
                  <th className="px-5 py-4 text-right font-bold text-foreground">배터리용량</th>
                  <th className="px-5 py-4 text-left font-bold text-foreground">특징</th>
                </tr>
              </thead>
              <tbody>
                {evModels.map((car, i) => (
                  <tr key={car.name} className={`border-t border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-emerald-50/50 transition-colors`}>
                    <td className="px-5 py-4 font-semibold text-foreground whitespace-nowrap">{car.name}</td>
                    <td className="px-5 py-4 text-right text-emerald-600 font-bold">{car.range}</td>
                    <td className="px-5 py-4 text-right">{car.price.toLocaleString()}</td>
                    <td className="px-5 py-4 text-right font-semibold text-primary">{car.subsidy.toLocaleString()}만원</td>
                    <td className="px-5 py-4 text-right text-muted-foreground">{car.battery}</td>
                    <td className="px-5 py-4 text-xs text-muted-foreground">{car.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            * 가격은 기본 트림 기준 참고값이며 실제와 다를 수 있습니다. 국고 보조금은 중형 승용(500만원) 또는 소형 승용(400만원) 기준이며, 차량 가격에 따라 감액됩니다. 지자체 보조금은 별도입니다.
          </p>
        </section>

        {/* Model Highlights */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">전기차 선택 가이드</h2>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="premium-card rounded-2xl border border-border p-6">
              <div className="text-2xl mb-2">장거리</div>
              <h3 className="font-bold text-foreground mb-1">현대 아이오닉6</h3>
              <p className="text-sm text-muted-foreground mb-3">공인 주행거리 614km로 국내 최장. 장거리 출장이 잦거나 고속도로 주행이 많은 분에게 추천합니다.</p>
              <p className="text-xs text-emerald-600 font-bold">주행거리 우선 선택</p>
            </div>
            <div className="premium-card rounded-2xl border border-border p-6">
              <div className="text-2xl mb-2">가성비</div>
              <h3 className="font-bold text-foreground mb-1">기아 EV3</h3>
              <p className="text-sm text-muted-foreground mb-3">3,999만원대에 501km 주행거리. 보조금 적용 시 3,000만원대 구매 가능. 도심 + 중거리 주행 모두 적합합니다.</p>
              <p className="text-xs text-emerald-600 font-bold">가격 대비 성능 우선 선택</p>
            </div>
            <div className="premium-card rounded-2xl border border-border p-6">
              <div className="text-2xl mb-2">입문</div>
              <h3 className="font-bold text-foreground mb-1">르노 조에</h3>
              <p className="text-sm text-muted-foreground mb-3">3,300만원대 소형 전기차. 도심 위주 주행에 최적화. 좁은 주차 공간과 저렴한 유지비가 장점입니다.</p>
              <p className="text-xs text-emerald-600 font-bold">도심 입문 전기차 선택</p>
            </div>
          </div>
        </section>

        {/* EV vs ICE Cost Comparison */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-4">전기차 vs 내연기관 유지비 비교</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-5 py-3 text-left font-bold text-foreground">항목</th>
                  <th className="px-5 py-3 text-right font-bold text-emerald-600">전기차</th>
                  <th className="px-5 py-3 text-right font-bold text-foreground">내연기관차</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-5 py-3 text-foreground font-medium">연료비 (월 1,500km 기준)</td>
                  <td className="px-5 py-3 text-right text-emerald-600 font-semibold">약 2~4만원</td>
                  <td className="px-5 py-3 text-right">약 15~20만원</td>
                </tr>
                <tr className="border-t border-border bg-muted/20">
                  <td className="px-5 py-3 text-foreground font-medium">엔진오일 교환</td>
                  <td className="px-5 py-3 text-right text-emerald-600 font-semibold">없음</td>
                  <td className="px-5 py-3 text-right">연 2~4회 (약 10만원)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-5 py-3 text-foreground font-medium">취득세</td>
                  <td className="px-5 py-3 text-right text-emerald-600 font-semibold">최대 140만원 감면</td>
                  <td className="px-5 py-3 text-right">차량가의 7%</td>
                </tr>
                <tr className="border-t border-border bg-muted/20">
                  <td className="px-5 py-3 text-foreground font-medium">자동차세 (2,000cc 기준)</td>
                  <td className="px-5 py-3 text-right text-emerald-600 font-semibold">연 13만원</td>
                  <td className="px-5 py-3 text-right">연 52만원</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-5 py-3 text-foreground font-medium">고속도로 통행료</td>
                  <td className="px-5 py-3 text-right text-emerald-600 font-semibold">50% 할인</td>
                  <td className="px-5 py-3 text-right">정상가</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">* 전기차 자동차세는 연료 구분 없이 동일하게 연 13만원 정액 (2026년 기준)</p>
        </section>

        {/* CTA */}
        <div className="text-center rounded-3xl bg-emerald-50 border border-emerald-100 p-10">
          <h3 className="text-xl font-bold text-foreground mb-2">내 지역 전기차 보조금 계산하기</h3>
          <p className="text-muted-foreground mb-6">차량 가격과 거주 지역을 입력하면 국고 + 지자체 보조금 합산과 실구매가를 바로 확인할 수 있습니다.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="inline-block rounded-xl bg-emerald-600 text-white px-8 py-3 font-bold hover:bg-emerald-700 transition-colors">
              보조금 계산하러 가기
            </Link>
            <Link href="/ev-guide" className="inline-block rounded-xl border border-border bg-card text-foreground px-8 py-3 font-bold hover:border-emerald-400 transition-colors">
              전기차 구매 가이드
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
