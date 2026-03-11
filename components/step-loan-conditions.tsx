"use client"

import { useCalculatorStore } from "@/lib/calculator-store"
import { formatNumber } from "@/lib/car-data"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const PRESETS = [10, 20, 30, 40, 50]
const MONTHS_OPTIONS = [
  { value: 12, label: "12개월 · 1년" },
  { value: 24, label: "24개월 · 2년" },
  { value: 36, label: "36개월 · 3년" },
  { value: 48, label: "48개월 · 4년" },
  { value: 60, label: "60개월 · 5년" },
  { value: 72, label: "72개월 · 6년" },
]

export function StepLoanConditions() {
  const {
    currentStep,
    carPrice,
    setCarPrice,
    downPayment,
    setDownPayment,
    downPaymentPercent,
    setDownPaymentPercent,
    interestRate,
    setInterestRate,
    loanMonths,
    setLoanMonths,
    setStep,
    getMonthlyPayment,
    getTotalPayment,
    getTotalInterest,
  } = useCalculatorStore()

  const principal = carPrice - downPayment
  const monthlyPayment = getMonthlyPayment()
  const totalPayment = getTotalPayment()
  const totalInterest = getTotalInterest()

  const getRateHint = () => {
    if (interestRate < 5) return "저금리"
    if (interestRate < 10) return "보통"
    return "고금리"
  }

  const handleNext = () => {
    if (!carPrice) return
    if (downPayment >= carPrice) return
    setStep(3)
  }

  if (currentStep !== 2) return null

  return (
    <div className="premium-card border border-border rounded-2xl p-5 sm:p-8 animate-fade-in shadow-sm bg-white">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-black flex items-center justify-center border border-primary/20">
          2
        </span>
        <h2 className="text-xl font-bold tracking-tight text-foreground">할부 조건 설정</h2>
      </div>

      <div className="space-y-8">
        {/* Section 1: Price & Down Payment */}
        <div className="grid grid-cols-1 gap-6 p-6 bg-secondary/30 rounded-2xl border border-border/50">
          {/* Car Price */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-sm font-bold tracking-wide text-foreground">
              차량 가액
              {carPrice > 0 && <span className="text-primary font-bebas-neue text-lg">{formatNumber(carPrice)}만원</span>}
            </label>
            <div className="relative">
              <input
                type="number"
                value={carPrice || ""}
                onChange={(e) => setCarPrice(Number(e.target.value) || 0)}
                placeholder="0"
                className="w-full bg-white border-2 border-border text-foreground py-4 px-5 pr-14 rounded-xl text-xl font-bold placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                만원
              </span>
            </div>
          </div>

          {/* Down Payment */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-sm font-bold tracking-wide text-foreground">
              선수금 (초기 취등록 비용 포함)
              <span className="text-primary font-medium text-xs">
                차량가의 {downPaymentPercent}% ({formatNumber(downPayment)}만원)
              </span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={downPayment || ""}
                onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                placeholder="0"
                className="w-full bg-white border-2 border-border text-foreground py-4 px-5 pr-14 rounded-xl text-xl font-bold placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                만원
              </span>
            </div>
            
            <div className="px-1 mt-2">
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-medium mt-3 px-1 uppercase tracking-tighter">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="flex gap-2.5 mt-2">
              {PRESETS.map((pct) => (
                <button
                  key={pct}
                  onClick={() => setDownPaymentPercent(pct)}
                  className={cn(
                    "flex-1 py-3 text-sm font-bold rounded-xl border transition-all text-center",
                    downPaymentPercent === pct
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-white border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5"
                  )}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Interest & Period */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Interest Rate */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-sm font-bold tracking-wide text-foreground">
              할부 금리 (연)
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full font-bold",
                interestRate < 5 ? "bg-success/10 text-success" : interestRate < 10 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
              )}>
                {getRateHint()}
              </span>
            </label>
            <div className="relative">
              <input
                type="number"
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                placeholder="0.0"
                className="w-full bg-white border-2 border-border text-foreground py-4 px-5 pr-12 rounded-xl text-xl font-bold placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                %
              </span>
            </div>
            <div className="px-1 mt-1">
              <input
                type="range"
                min={1}
                max={20}
                step={0.5}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>

          {/* Loan Period */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold tracking-wide text-foreground">
              할부 상환 기간
            </label>
            <div className="relative">
              <select
                value={loanMonths}
                onChange={(e) => setLoanMonths(Number(e.target.value))}
                className="w-full appearance-none bg-white border-2 border-border text-foreground py-4 px-5 pr-12 rounded-xl text-xl font-bold cursor-pointer focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
              >
                {MONTHS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-muted/50 rounded-md pointer-events-none">
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Result */}
        {carPrice > 0 && (
          <div className="relative overflow-hidden bg-primary p-6 rounded-2xl border border-primary/20 shadow-xl shadow-primary/10 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-1.5">예상 월 할부금</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-bebas-neue text-5xl text-white tracking-wider">
                    {formatNumber(monthlyPayment)}
                  </span>
                  <span className="text-white/90 font-bold">만원</span>
                </div>
                <div className="inline-flex items-center gap-1.5 mt-3 px-2 py-1 bg-black/10 rounded-md text-[11px] text-white/80 font-medium">
                  실제 대출 원금: {formatNumber(principal)}만원
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-1 border-t sm:border-t-0 sm:border-l border-white/20 pt-4 sm:pt-0 sm:pl-8">
                <div className="text-[10px] font-bold text-primary-foreground/60 uppercase tracking-wider">전체 할부 이자 합계</div>
                <div className="font-bebas-neue text-2xl text-white/95">
                  {formatNumber(totalInterest)}만원
                </div>
                <div className="text-[10px] text-white/70 italic mt-0.5">상환 후 총 지출: {formatNumber(totalPayment)}만원</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={!carPrice || downPayment >= carPrice}
        className="w-full mt-8 py-[18px] bg-primary text-white rounded-[14px] font-bold text-lg tracking-tight hover:opacity-90 hover:shadow-[0_8px_32px_rgba(0,51,102,0.28)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
      >
        연봉 비교 및 결과 확인
      </button>
    </div>
  )
}

// Summary component for collapsed step 2
export function Step2Summary() {
  const { currentStep, carPrice, downPayment, interestRate, loanMonths, setStep, showResults } = useCalculatorStore()

  if (currentStep <= 2 && !showResults) return null

  return (
    <div className="premium-card border border-border rounded-xl px-6 py-5 flex items-center justify-between animate-fade-in shadow-sm">
      <div className="flex items-center gap-2.5">
        <span className="text-success text-base">✓</span>
        <div>
          <div className="text-sm font-bold">
            차량가 {formatNumber(carPrice)}만원 · 선수금 {formatNumber(downPayment)}만원
          </div>
          <div className="text-xs text-muted-foreground">
            금리 {interestRate}% · {loanMonths}개월
          </div>
        </div>
      </div>
      <button
        onClick={() => setStep(2)}
        className="text-sm text-muted-foreground border border-border px-4 py-2 rounded-lg hover:text-foreground hover:border-muted-foreground transition-colors"
      >
        수정
      </button>
    </div>
  )
}
