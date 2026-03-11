"use client"

import { useState, useRef, useEffect } from "react"
import { useCalculatorStore } from "@/lib/calculator-store"
import { CARS, FUEL_STYLES, Car } from "@/lib/car-data"
import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"

export function StepCarSelect() {
  const { selectedCar, setSelectedCar, applyCarData, setStep, currentStep } = useCalculatorStore()
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIdx, setFocusedIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredCars = query
    ? CARS.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : CARS

  const popularCars = CARS.filter((c) => c.popular)

  const handleSelect = (car: Car) => {
    setSelectedCar(car)
    applyCarData(car)
    setQuery(car.name)
    setIsOpen(false)
  }

  const handleClear = () => {
    setSelectedCar(null)
    setQuery("")
    setIsOpen(false)
  }

  const handleNext = () => {
    setStep(2)
  }

  const highlightMatch = (name: string, q: string) => {
    if (!q) return name
    const idx = name.toLowerCase().indexOf(q.toLowerCase())
    if (idx < 0) return name
    return (
      <>
        {name.slice(0, idx)}
        <mark className="bg-transparent text-primary font-bold">{name.slice(idx, idx + q.length)}</mark>
        {name.slice(idx + q.length)}
      </>
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setFocusedIdx((prev) => Math.min(prev + 1, filteredCars.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setFocusedIdx((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && focusedIdx >= 0 && filteredCars[focusedIdx]) {
      e.preventDefault()
      handleSelect(filteredCars[focusedIdx])
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (currentStep !== 1) return null

  return (
    <div className="premium-card border border-border rounded-2xl p-5 sm:p-8 animate-fade-in shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-black flex items-center justify-center">
          1
        </span>
        <span className="text-base font-bold tracking-wide text-foreground">차종 선택</span>
      </div>

      {/* Search Input */}
      <div className="relative" ref={dropdownRef}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
            setFocusedIdx(-1)
          }}
          onFocus={() => !selectedCar && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="차종 검색  예) 아반떼, 테슬라, 그랜저..."
          className="w-full bg-muted/50 border-2 border-border text-foreground py-4 pl-12 pr-12 rounded-xl text-lg font-medium placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-border hover:bg-muted-foreground/30 flex items-center justify-center text-muted-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-border rounded-xl z-50 max-h-[400px] overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-fade-in">
            {filteredCars.length > 0 ? (
              filteredCars.map((car, idx) => (
                <div
                  key={car.id}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 cursor-pointer transition-colors",
                    focusedIdx === idx && "bg-primary/10",
                    selectedCar?.id === car.id && "bg-primary/10"
                  )}
                  onClick={() => handleSelect(car)}
                  onMouseEnter={() => setFocusedIdx(idx)}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn("text-xs font-bold px-2 py-1 rounded border", FUEL_STYLES[car.fuel])}>
                      {car.fuel}
                    </span>
                    <span className="text-base font-semibold">{highlightMatch(car.name, query)}</span>
                  </div>
                  <span className="text-base text-muted-foreground font-semibold">
                    {car.price.toLocaleString()}만원
                  </span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground text-base">
                {`"${query}" 검색 결과가 없습니다`}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Picks */}
      <div className="flex flex-wrap items-center gap-2.5 mt-4">
        <span className="text-sm text-muted-foreground">인기</span>
        {popularCars.map((car) => (
          <button
            key={car.id}
            onClick={() => handleSelect(car)}
            className="bg-muted text-muted-foreground text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary/5 hover:text-primary transition-all"
          >
            {car.name}
          </button>
        ))}
      </div>

      {/* Selected Car Badge */}
      {selectedCar && (
        <div className="flex items-center justify-between gap-4 mt-4 p-4 bg-primary/10 border border-primary/25 rounded-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚗</span>
            <div>
              <div className="text-lg font-bold">{selectedCar.name}</div>
              <div className="text-sm text-muted-foreground">
                {selectedCar.price.toLocaleString()}만원 · {selectedCar.fuel}
                <span className="hidden sm:inline"> · 보험 {selectedCar.insurance}만원/연 · 세금 {selectedCar.tax}만원/연</span>
              </div>
            </div>
          </div>
          <button onClick={handleClear} className="text-muted-foreground hover:text-foreground p-1">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
        차종 선택 시 보험료·세금이 자동 입력됩니다. 건너뛰면 가격 기반으로 추정합니다.
      </p>

      <button
        onClick={handleNext}
        className="w-full mt-5 py-[18px] bg-primary text-white rounded-[14px] font-bold text-lg tracking-tight hover:opacity-90 hover:shadow-[0_8px_32px_rgba(0,51,102,0.28)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
      >
        다음 단계
      </button>
    </div>
  )
}

// Summary component for collapsed step 1
export function Step1Summary() {
  const { currentStep, selectedCar, setStep, showResults } = useCalculatorStore()

  if (currentStep <= 1 && !showResults) return null

  return (
    <div className="premium-card border border-border rounded-xl px-6 py-5 flex items-center justify-between animate-fade-in shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-success text-xl">✓</span>
        <div>
          <div className="text-lg font-bold">{selectedCar ? selectedCar.name : "차종 미선택"}</div>
          <div className="text-sm text-muted-foreground">
            {selectedCar
              ? `${selectedCar.price.toLocaleString()}만원 · ${selectedCar.fuel} · 보험 ${selectedCar.insurance}만원/연`
              : "가격 기반으로 자동 추정"}
          </div>
        </div>
      </div>
      <button
        onClick={() => setStep(1)}
        className="text-sm text-muted-foreground border border-border px-4 py-2 rounded-lg hover:text-foreground hover:border-muted-foreground transition-colors"
      >
        수정
      </button>
    </div>
  )
}
