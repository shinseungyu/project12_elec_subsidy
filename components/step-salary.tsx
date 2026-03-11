"use client"

import { useCalculatorStore } from "@/lib/calculator-store"

export function StepSalary() {
  const {
    currentStep,
    annualSalary,
    setAnnualSalary,
    extraCost,
    setExtraCost,
    setShowResults,
    setStep,
  } = useCalculatorStore()

  const handleCalculate = () => {
    setShowResults(true)
    setStep(4)
  }

  if (currentStep !== 3) return null

  return (
    <div className="premium-card border border-border rounded-[18px] p-6 sm:p-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-7">
        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-black flex items-center justify-center border border-primary/20">
          3
        </span>
        <h2 className="text-lg font-bold tracking-tight text-foreground">내 연봉 입력</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Annual Salary */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            세전 연봉
          </label>
          <div className="relative">
            <input
              type="number"
              value={annualSalary || ""}
              onChange={(e) => setAnnualSalary(Number(e.target.value) || 0)}
              placeholder="예) 4500"
              className="w-full bg-secondary/60 border-2 border-border text-foreground py-4 px-5 pr-14 rounded-[12px] text-lg font-bold placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
              만원
            </span>
          </div>
          <p className="text-xs text-muted-foreground">구매 적정성 분석에 사용됩니다</p>
        </div>

        {/* Extra Cost */}
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center justify-between text-xs font-bold tracking-widest text-muted-foreground uppercase">
            월 기타 지출
            <span className="text-primary normal-case font-medium text-xs">기름·주차 등</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={extraCost || ""}
              onChange={(e) => setExtraCost(Number(e.target.value) || 0)}
              placeholder="예) 20"
              className="w-full bg-secondary/60 border-2 border-border text-foreground py-4 px-5 pr-14 rounded-[12px] text-lg font-bold placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
              만원
            </span>
          </div>
          <p className="text-xs text-muted-foreground">연봉 미입력 시 생략 가능</p>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full mt-7 py-[18px] bg-primary text-white rounded-[14px] font-bold text-lg tracking-tight hover:opacity-90 hover:shadow-[0_8px_32px_rgba(0,51,102,0.30)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
      >
        🔍 구매 적정성 분석 시작
      </button>
    </div>
  )
}
