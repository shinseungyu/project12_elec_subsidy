"use client"

import { useState } from "react"
import { useCalculatorStore } from "@/lib/calculator-store"
import { formatNumber } from "@/lib/car-data"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"

export function ResultsSection() {
  const {
    showResults,
    selectedCar,
    annualSalary,
    carPrice,
    downPayment,
    interestRate,
    loanMonths,
    getMonthlyPayment,
    getTotalInterest,
    getMonthlyInsurance,
    getMonthlyTax,
    getMonthlyMaintenance,
    getTotalMonthlyExpense,
    getIncomeRatio,
    getVerdict,
    getAmortizationSchedule,
    setStep,
    reset,
  } = useCalculatorStore()

  const [showDetail, setShowDetail] = useState(false)
  const [showAmortization, setShowAmortization] = useState(false)

  if (!showResults) return null

  const monthly = getMonthlyPayment()
  const totalInterest = getTotalInterest()
  const insurance = getMonthlyInsurance()
  const tax = getMonthlyTax()
  const maintenance = getMonthlyMaintenance()
  const totalExpense = getTotalMonthlyExpense()
  const ratio = getIncomeRatio()
  const verdict = getVerdict()
  const schedule = getAmortizationSchedule()
  const principal = carPrice - downPayment

  const verdictConfig = {
    safe: { bg: "bg-success/8", border: "border-success/20", title: "text-success", icon: "✅" },
    warn: { bg: "bg-warning/8", border: "border-warning/20", title: "text-warning", icon: "⚠️" },
    danger: { bg: "bg-destructive/8", border: "border-destructive/20", title: "text-destructive", icon: "🚨" },
  }
  const vc = verdictConfig[verdict.status]

  const handleReset = () => {
    reset()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-3 animate-fade-in">

      {/* ① Verdict */}
      <div className={cn("rounded-[18px] p-5 sm:p-6 border-2 flex items-start gap-4", vc.bg, vc.border)}>
        <span className="text-[36px] sm:text-[44px] leading-none flex-shrink-0 mt-0.5">{vc.icon}</span>
        <div>
          <div className={cn("font-[var(--font-bebas-neue)] text-[26px] sm:text-[34px] tracking-wide mb-1.5", vc.title)}>
            {verdict.title}
          </div>
          <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">{verdict.desc}</div>
        </div>
      </div>

      {/* ② Hero — 월 납입금 (가장 큰 숫자) */}
      <div className="result-hero-card p-8 sm:p-10 text-center">
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-muted-foreground mb-5">
          월 할부 납입금
        </p>
        <div className="flex items-baseline justify-center gap-3">
          <span className="font-[var(--font-bebas-neue)] text-[clamp(72px,16vw,108px)] text-primary leading-none tracking-tight">
            {formatNumber(monthly)}
          </span>
          <span className="text-[22px] sm:text-[28px] font-bold text-primary/50">만원</span>
        </div>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          실제 대출 원금{" "}
          <strong className="text-foreground font-semibold">{formatNumber(principal)}만원</strong>
          {" · "}금리 {interestRate}% · {loanMonths}개월 상환
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-destructive/8 text-destructive text-sm font-semibold px-4 py-2 rounded-full">
          총 이자 {formatNumber(totalInterest)}만원
        </div>
      </div>

      {/* ③ 월 총 지출 */}
      <div className="bg-card border-2 border-primary/15 rounded-[18px] p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <div className="text-base font-bold text-foreground">월 총 자동차 지출</div>
          <div className="text-sm text-muted-foreground mt-0.5">할부 + 보험 + 세금 + 유지비</div>
        </div>
        <div className="font-[var(--font-bebas-neue)] text-[42px] sm:text-[52px] text-primary leading-none">
          {formatNumber(totalExpense)}만원
        </div>
      </div>

      {/* ④ 상세 내역 아코디언 */}
      <div className="bg-card border border-border rounded-[18px] overflow-hidden shadow-sm">
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="w-full flex items-center justify-between px-5 sm:px-7 py-4 hover:bg-secondary/50 transition-colors"
        >
          <span className="text-sm font-bold text-foreground">상세 내역 보기</span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary border border-border px-3 py-1.5 rounded-lg">
            {showDetail ? "접기" : "펼치기"}
            {showDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>

        {showDetail && (
          <div className="border-t border-border px-5 sm:px-7 py-5 space-y-0 animate-fade-in">
            {[
              {
                label: "월 할부 납입금",
                value: `${formatNumber(monthly)}만원`,
                sub: `총 이자 ${formatNumber(totalInterest)}만원`,
                highlight: true,
              },
              {
                label: "월 평균 보험료",
                value: `${formatNumber(insurance)}만원`,
                sub: selectedCar ? `연 ${selectedCar.insurance}만원 기준` : "가격 기반 추정",
              },
              {
                label: "월 평균 자동차세",
                value: `${formatNumber(tax)}만원`,
                sub: selectedCar ? `연 ${selectedCar.tax}만원 기준` : "가격 기반 추정",
              },
              {
                label: "월 소모품·유지비",
                value: `${formatNumber(maintenance)}만원`,
                sub: "엔진오일·타이어·세차 등",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center justify-between py-4",
                  i < 3 && "border-b border-border/60"
                )}
              >
                <div>
                  <div className={cn("text-sm font-semibold", item.highlight ? "text-primary" : "text-foreground")}>
                    {item.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                </div>
                <div className={cn(
                  "font-[var(--font-bebas-neue)] text-[22px] tracking-wide",
                  item.highlight ? "text-primary" : "text-foreground"
                )}>
                  {item.value}
                </div>
              </div>
            ))}

            {/* Income Ratio */}
            {annualSalary > 0 && (
              <div className="pt-4 mt-2 border-t border-border/60">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-sm font-semibold text-foreground">월 지출 / 월 소득 비율</span>
                  <span
                    className={cn(
                      "font-[var(--font-bebas-neue)] text-[26px]",
                      ratio < 20 ? "text-success" : ratio < 30 ? "text-warning" : "text-destructive"
                    )}
                  >
                    {ratio.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000 ease-out",
                      ratio < 20 ? "bg-success" : ratio < 30 ? "bg-warning" : "bg-destructive"
                    )}
                    style={{ width: `${Math.min((ratio / 60) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
                  <span>0%</span>
                  <span className="text-success font-semibold">권장 20%</span>
                  <span className="text-warning font-semibold">주의 30%</span>
                  <span>60%+</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ⑤ CPA 링크 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button className="flex items-center gap-4 p-5 sm:p-6 rounded-[18px] bg-primary/8 border border-primary/15 hover:bg-primary/12 active:scale-[0.98] transition-all text-left">
          <span className="text-[30px] flex-shrink-0">🛡️</span>
          <div>
            <span className="text-sm font-bold text-primary block mb-0.5">보험료 최저가 비교</span>
            <span className="text-xs text-muted-foreground">30초 만에 확인</span>
          </div>
        </button>
        <button className="flex items-center gap-4 p-5 sm:p-6 rounded-[18px] bg-success/8 border border-success/15 hover:bg-success/12 active:scale-[0.98] transition-all text-left">
          <span className="text-[30px] flex-shrink-0">💰</span>
          <div>
            <span className="text-sm font-bold text-success block mb-0.5">최저금리 할부 상담</span>
            <span className="text-xs text-muted-foreground">은행·카드·캐피탈</span>
          </div>
        </button>
      </div>

      {/* ⑥ 월별 상환 일정표 아코디언 */}
      <div className="bg-card border border-border rounded-[18px] overflow-hidden shadow-sm">
        <button
          onClick={() => setShowAmortization(!showAmortization)}
          className="w-full flex items-center justify-between px-5 sm:px-7 py-4 hover:bg-secondary/50 transition-colors"
        >
          <div className="text-sm font-bold text-foreground flex items-center gap-2">
            📋 월별 상환 일정표
          </div>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary border border-border px-3 py-1.5 rounded-lg">
            {showAmortization ? "접기" : "펼치기"}
            {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>

        {showAmortization && (
          <div className="max-h-96 overflow-y-auto overflow-x-auto border-t border-border">
            <table className="w-full text-sm min-w-[380px]">
              <thead className="sticky top-0 bg-muted z-10">
                <tr>
                  {["회차", "납입금", "원금", "이자", "잔여원금"].map((h, i) => (
                    <th
                      key={h}
                      className={cn(
                        "py-3 px-3 text-[11px] font-bold tracking-wider text-muted-foreground uppercase",
                        i === 0 ? "text-left" : "text-right"
                      )}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.month} className="border-t border-border/40 hover:bg-secondary/40 transition-colors">
                    <td className="py-2.5 px-3 text-left text-muted-foreground font-semibold text-xs">{row.month}회</td>
                    <td className="py-2.5 px-3 text-right font-semibold">{formatNumber(row.payment)}만</td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">{formatNumber(row.principal)}만</td>
                    <td className="py-2.5 px-3 text-right text-destructive">{formatNumber(row.interest)}만</td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">{formatNumber(row.balance)}만</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ⑦ 액션 버튼 */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleReset}
          className="flex-1 py-5 bg-card border-2 border-border text-foreground rounded-[14px] font-bold text-base hover:border-primary/30 hover:bg-secondary active:scale-[0.98] transition-all shadow-sm"
        >
          처음부터
        </button>
        <button
          onClick={() => setStep(2)}
          className="flex-1 py-5 bg-primary text-white rounded-[14px] font-bold text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
        >
          조건 수정하기
        </button>
      </div>

      {/* ⑧ 면책 고지 */}
      <div className="text-xs text-muted-foreground leading-relaxed px-5 py-4 bg-secondary/60 rounded-[12px]">
        본 계산기는 참고용이며 실제 금융 조건에 따라 달라질 수 있습니다. 보험료·자동차세는 평균 추정값입니다.
      </div>
    </div>
  )
}
