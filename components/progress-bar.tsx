"use client"

import { useCalculatorStore } from "@/lib/calculator-store"
import { cn } from "@/lib/utils"

const steps = [
  { num: 1, label: "차종" },
  { num: 2, label: "할부조건" },
  { num: 3, label: "연봉" },
  { num: 4, label: "결과", icon: true },
]

export function ProgressBar() {
  const { currentStep, setStep, showResults } = useCalculatorStore()

  const handleClick = (stepNum: number) => {
    if (stepNum < currentStep || (showResults && stepNum <= 3)) {
      setStep(stepNum)
    }
  }

  return (
    <div className="flex items-center py-8">
      {steps.map((step, idx) => {
        const isDone = step.num < currentStep || (showResults && step.num <= 3)
        const isActive = step.num === currentStep && !showResults
        const isResult = step.num === 4 && showResults

        return (
          <div key={step.num} className="flex items-center flex-1 last:flex-none">
            <div
              className={cn(
                "flex flex-col items-center",
                isDone || (showResults && step.num <= 3) ? "cursor-pointer" : "cursor-default"
              )}
              onClick={() => handleClick(step.num)}
            >
              {/* Circle */}
              <div
                className={cn(
                  "w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300",
                  isDone && "bg-primary border-primary text-white shadow-[0_4px_12px_rgba(0,51,102,0.25)]",
                  isActive && "bg-card border-primary text-primary shadow-[0_0_0_4px_rgba(0,51,102,0.12)]",
                  isResult && "bg-primary border-primary text-white shadow-[0_4px_12px_rgba(0,51,102,0.25)]",
                  !isDone && !isActive && !isResult && "bg-secondary border-border text-muted-foreground"
                )}
              >
                {isDone ? "✓" : step.icon ? "★" : step.num}
              </div>
              {/* Label */}
              <span
                className={cn(
                  "text-[10px] font-bold tracking-wide mt-2 whitespace-nowrap",
                  isDone && "text-primary/70",
                  isActive && "text-primary",
                  isResult && "text-primary",
                  !isDone && !isActive && !isResult && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-[2px] mx-2 -mt-5 rounded-full transition-colors duration-500",
                  isDone ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
