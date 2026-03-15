import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "전기차 구매 가이드 2026 | 보조금 신청부터 차량 선택까지",
  description: "2026 전기차 구매 방법을 단계별로 안내합니다. 전기차 보조금 신청, 차량 선택, 충전 환경 구축까지 전기차 구매 전 알아야 할 모든 것을 정리했습니다.",
  keywords: ["전기차 구매 방법", "전기차 보조금 신청", "전기차 구매 가이드", "2026 전기차", "전기차 선택 방법", "전기차 충전"],
  alternates: { canonical: "/ev-guide" },
}

export default function EVGuidePage() {
  return (
    <main className="min-h-screen py-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Hero */}
        <section className="text-center py-10 md:py-14">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">구매 가이드</p>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">전기차 구매 가이드 2026</h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            전기차 보조금 신청부터 차량 선택, 충전 환경 구축까지. 처음 전기차를 구매하는 분들을 위한 완벽 가이드입니다.
          </p>
        </section>

        {/* Step Guide */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">전기차 구매 5단계</h2>
          <div className="space-y-6">

            {/* Step 1 */}
            <div className="premium-card rounded-2xl border border-border p-6 md:p-8">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-lg font-black text-emerald-600">01</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">보조금 및 예산 확인</h3>
                  <p className="text-muted-foreground mb-3">
                    전기차 구매 전 가장 먼저 할 일은 받을 수 있는 보조금을 파악하는 것입니다. 거주 지역과 차종에 따라 국고 보조금(400~1,200만원) + 지자체 보조금(200~500만원)을 합산하면 실구매가를 크게 낮출 수 있습니다.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1.5 pl-1">
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>무공해차 통합누리집(ev.or.kr)에서 지역별 보조금 확인</span></li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>차량 가격 5,500만원 이하인 경우 국고 보조금 100% 수령 가능</span></li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>개별소비세 감면(최대 300만원), 취득세 감면(최대 140만원)도 별도 적용</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="premium-card rounded-2xl border border-border p-6 md:p-8">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-lg font-black text-emerald-600">02</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">충전 환경 파악</h3>
                  <p className="text-muted-foreground mb-3">
                    전기차 구매 전 가장 중요한 것은 충전 환경입니다. 거주지 주차장에 완속 충전기 설치가 가능한지 확인하고, 주변 급속 충전소 위치를 미리 파악하세요.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1.5 pl-1">
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>아파트·주택 완속 충전기 설치 가능 여부 확인 (보조금 지원 가능)</span></li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>직장·대형마트·고속도로 급속 충전소 위치 확인</span></li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>충전 속도: 완속(7kW) 약 8~10시간, 급속(50kW) 약 1시간, 초급속(350kW) 약 20분</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="premium-card rounded-2xl border border-border p-6 md:p-8">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-lg font-black text-emerald-600">03</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">차량 선택</h3>
                  <p className="text-muted-foreground mb-3">
                    1회 충전 주행거리, 가격, 차량 크기, 브랜드 신뢰도 등을 종합적으로 고려해 차량을 선택합니다. 주행 거리는 실제 사용 패턴(도심/고속/겨울)을 고려해 최소 300km 이상을 권장합니다.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1.5 pl-1">
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>도심 위주 단거리: 기아 EV3, 르노 조에 등 합리적 가격대</span></li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>장거리·고속도로 주행: 현대 아이오닉6, 테슬라 모델3 등 장거리 특화 모델</span></li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>SUV 선호: 현대 아이오닉5, 기아 EV6, 테슬라 모델Y 등</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="premium-card rounded-2xl border border-border p-6 md:p-8">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-lg font-black text-emerald-600">04</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">계약 및 보조금 신청</h3>
                  <p className="text-muted-foreground mb-3">
                    원하는 차량을 결정했다면 공식 딜러 또는 제조사를 통해 계약합니다. 보조금 신청은 딜러가 대행하므로 보조금 신청 의사를 계약 시 반드시 밝히세요.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1.5 pl-1">
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>보조금은 선착순 소진 — 연초에 신청할수록 유리</span></li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>계약금 납부 전 보조금 잔여 물량 확인 필수</span></li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>보조금 지급은 차량 등록 완료 후 딜러에게 직접 지급 (소비자는 차액만 납부)</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="premium-card rounded-2xl border border-border p-6 md:p-8">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-lg font-black text-emerald-600">05</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">인수 및 의무 운행 기간 준수</h3>
                  <p className="text-muted-foreground mb-3">
                    차량을 인수한 후 보조금 수령 조건인 의무 운행 기간(2년)을 반드시 준수해야 합니다. 의무 기간 내 매각·양도 시 보조금 일부를 반납해야 합니다.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1.5 pl-1">
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>의무 운행 기간: 2년 (위반 시 보조금 반납 의무)</span></li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>전기차 보험: 일반 자동차 보험 적용, 배터리 손상 특약 추가 권장</span></li>
                    <li className="flex gap-2"><span className="text-emerald-600 font-bold">→</span><span>정기 점검: 배터리·모터 점검 주기 숙지 (내연기관 대비 유지비 낮음)</span></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-foreground mb-6">전기차 구매 시 알아두면 좋은 팁</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
              <h3 className="font-bold text-emerald-800 mb-2">겨울철 주행 거리 감소</h3>
              <p className="text-sm text-emerald-700">전기차는 겨울(-10°C)에 배터리 효율이 30~40% 감소할 수 있습니다. 공인 주행 거리의 60~70%를 실제 겨울 주행 거리로 예상하세요.</p>
            </div>
            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
              <h3 className="font-bold text-blue-800 mb-2">충전 비용 절감 팁</h3>
              <p className="text-sm text-blue-700">야간 심야 전력을 활용한 완속 충전이 가장 경제적입니다. 월 100kWh 기준 완속 충전 비용은 약 6,000~10,000원 수준입니다.</p>
            </div>
            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5">
              <h3 className="font-bold text-amber-800 mb-2">보조금 조기 소진 주의</h3>
              <p className="text-sm text-amber-700">인기 전기차 모델의 경우 연초에 보조금이 빠르게 소진됩니다. 구매 계획이 있다면 1~3월에 계약하는 것이 유리합니다.</p>
            </div>
            <div className="rounded-2xl bg-purple-50 border border-purple-100 p-5">
              <h3 className="font-bold text-purple-800 mb-2">배터리 보증 기간 확인</h3>
              <p className="text-sm text-purple-700">전기차 구매 시 배터리 보증 기간을 반드시 확인하세요. 대부분의 국산 전기차는 배터리 용량 70% 유지 기준으로 8년/16만km 보증을 제공합니다.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center rounded-3xl bg-emerald-50 border border-emerald-100 p-10">
          <h3 className="text-xl font-bold text-foreground mb-2">내 지역 전기차 보조금 계산하기</h3>
          <p className="text-muted-foreground mb-6">차량 가격과 거주 지역을 입력하면 국고 + 지자체 보조금 합산 금액과 실구매가를 바로 확인할 수 있습니다.</p>
          <Link href="/" className="inline-block rounded-xl bg-emerald-600 text-white px-8 py-3 font-bold hover:bg-emerald-700 transition-colors">
            보조금 계산하러 가기
          </Link>
        </div>

      </div>
    </main>
  )
}
