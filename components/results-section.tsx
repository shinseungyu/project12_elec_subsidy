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

  const verdictColors = {
    safe: {
      bg: "bg-success/10",
      border: "border-success/20",
      title: "text-success",
      icon: "✅",
    },
    warn: {
      bg: "bg-warning/10",
      border: "border-warning/20",
      title: "text-warning",
      icon: "⚠️",
    },
    danger: {
      bg: "bg-destructive/10",
      border: "border-destructive/20",
      title: "text-destructive",
      icon: "🚨",
    },
  }

  const colors = verdictColors[verdict.status]

  const handleReset = () => {
    reset()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-3 animate-fade-in">
      {/* Verdict */}
      <div className={cn("rounded-2xl p-5 sm:p-6 border-2 flex items-start gap-4", colors.bg, colors.border)}>
        <span className="text-[32px] sm:text-[42px] leading-none flex-shrink-0">{colors.icon}</span>
        <div>
          <div className={cn("font-[var(--font-bebas-neue)] text-[28px] sm:text-[36px] tracking-wide mb-1.5", colors.title)}>
            {verdict.title}
          </div>
          <div className="text-base text-muted-foreground leading-relaxed">{verdict.desc}</div>
        </div>
      </div>

      {/* Cost Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-primary/10 border border-primary/40 rounded-xl p-5">
          <div className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-2">월 할부 납입금</div>
          <div className="font-[var(--font-bebas-neue)] text-[26px] sm:text-[34px] text-primary leading-tight">{formatNumber(monthly)}만원</div>
          <div className="text-sm text-muted-foreground mt-1.5">총 이자 {formatNumber(totalInterest)}만원</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-2">월 평균 보험료</div>
          <div className="font-[var(--font-bebas-neue)] text-[26px] sm:text-[34px] leading-tight">{formatNumber(insurance)}만원</div>
          <div className="text-sm text-muted-foreground mt-1.5">
            {selectedCar ? `연 ${selectedCar.insurance}만원 기준` : "가격 기반 추정"}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-2">월 평균 자동차세</div>
          <div className="font-[var(--font-bebas-neue)] text-[26px] sm:text-[34px] leading-tight">{formatNumber(tax)}만원</div>
          <div className="text-sm text-muted-foreground mt-1.5">
            {selectedCar ? `연 ${selectedCar.tax}만원 기준` : "가격 기반 추정"}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-2">월 소모품·유지비</div>
          <div className="font-[var(--font-bebas-neue)] text-[26px] sm:text-[34px] leading-tight">{formatNumber(maintenance)}만원</div>
          <div className="text-sm text-muted-foreground mt-1.5">엔진오일·타이어·세차</div>
        </div>
      </div>

      {/* Total Row */}
      <div className="bg-card border-2 border-primary/20 rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
        <div>
          <div className="text-base font-bold text-foreground">월 총 자동차 지출</div>
          <div className="text-sm text-muted-foreground mt-1">할부 + 보험 + 세금 + 유지비</div>
        </div>
        <div className="font-[var(--font-bebas-neue)] text-4xl sm:text-5xl text-primary">{formatNumber(totalExpense)}만원</div>
      </div>

      {/* Ratio Card */}
      <div className="premium-card border border-border rounded-2xl p-8 shadow-sm">
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-sm font-bold text-muted-foreground tracking-wide">월 지출 / 월 소득 비율</span>
          <span
            className={cn(
              "font-[var(--font-bebas-neue)] text-[30px] sm:text-[38px]",
              annualSalary > 0
                ? ratio < 20
                  ? "text-success"
                  : ratio < 30
                    ? "text-warning"
                    : "text-destructive"
                : "text-muted-foreground"
            )}
          >
            {annualSalary > 0 ? `${ratio.toFixed(1)}%` : "연봉 미입력"}
          </span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              ratio < 20 ? "bg-success" : ratio < 30 ? "bg-warning" : "bg-destructive"
            )}
            style={{ width: annualSalary > 0 ? `${Math.min(ratio / 60 * 100, 100)}%` : "0%" }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>0%</span>
          <span className="text-success font-medium">권장 20%</span>
          <span className="text-warning font-medium">주의 30%</span>
          <span>60%+</span>
        </div>
      </div>

      {/* CPA Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button className="flex items-center gap-4 p-5 rounded-xl bg-primary/10 border border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all text-left">
          <span className="text-[32px]">🛡️</span>
          <div>
            <span className="text-base font-bold text-primary block">보험료 최저가 비교</span>
            <span className="text-sm text-muted-foreground">30초 만에 확인</span>
          </div>
        </button>
        <button className="flex items-center gap-4 p-5 rounded-xl bg-success/10 border border-success/30 hover:-translate-y-1 hover:shadow-lg transition-all text-left">
          <span className="text-[32px]">💰</span>
          <div>
            <span className="text-base font-bold text-success block">최저금리 할부 상담</span>
            <span className="text-sm text-muted-foreground">은행·카드·캐피탈</span>
          </div>
        </button>
      </div>

      {/* Amortization Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowAmortization(!showAmortization)}
          className="w-full flex items-center justify-between p-5 hover:bg-white/[0.03] transition-colors"
        >
          <div className="text-base font-bold text-foreground flex items-center gap-2">
            📋 월별 상환 일정표
          </div>
          <span className="text-sm text-muted-foreground bg-muted border border-border px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            {showAmortization ? "접기" : "펼치기"}
            {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>
        {showAmortization && (
          <div className="max-h-96 overflow-y-auto overflow-x-auto">
            <table className="w-full text-sm min-w-[400px]">
              <thead className="sticky top-0 bg-muted z-10">
                <tr>
                  <th className="py-2.5 px-3 text-left text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    회차
                  </th>
                  <th className="py-2.5 px-3 text-right text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    납입금
                  </th>
                  <th className="py-2.5 px-3 text-right text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    원금
                  </th>
                  <th className="py-2.5 px-3 text-right text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    이자
                  </th>
                  <th className="py-2.5 px-3 text-right text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    잔여원금
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.month} className="border-t border-border/50 hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 text-left text-muted-foreground font-semibold">{row.month}회차</td>
                    <td className="py-2.5 px-3 text-right font-medium">{formatNumber(row.payment)}만원</td>
                    <td className="py-2.5 px-3 text-right">{formatNumber(row.principal)}만원</td>
                    <td className="py-2.5 px-3 text-right text-destructive">{formatNumber(row.interest)}만원</td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">{formatNumber(row.balance)}만원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={handleReset}
          className="flex-1 py-5 bg-white border-2 border-border text-foreground rounded-2xl font-bold text-lg hover:bg-secondary hover:border-muted-foreground/30 active:scale-95 transition-all shadow-sm"
        >
          처음부터
        </button>
        <button
          onClick={() => setStep(2)}
          className="flex-1 py-5 bg-foreground text-background rounded-2xl font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-foreground/10"
        >
          조건 수정하기
        </button>
      </div>

      {/* Disclaimer */}
      <div className="text-sm text-muted-foreground leading-relaxed px-5 py-4 bg-secondary/50 rounded-xl">
        본 계산기는 참고용이며 실제 금융 조건에 따라 달라질 수 있습니다. 보험료·자동차세는 평균 추정값이며 실제와 다를 수 있습니다.
      </div>
    </div>
  )
}
