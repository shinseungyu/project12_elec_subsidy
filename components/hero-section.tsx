"use client"

export function HeroSection() {
  return (
    <div className="pt-10 pb-12 text-center">
      {/* Eyebrow label */}
      <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/12 text-primary text-[11px] font-bold tracking-[0.18em] uppercase px-5 py-2 rounded-full mb-8">
        AUTO LOAN CALCULATOR
      </div>

      {/* Headline */}
      <h1 className="text-[clamp(38px,7.5vw,68px)] font-black leading-[1.06] tracking-tight text-foreground mb-5">
        자동차 할부
        <br />
        <span className="text-primary">월 납입금 계산기</span>
      </h1>

      {/* Subtitle */}
      <p className="text-[16px] sm:text-[17px] text-muted-foreground leading-relaxed max-w-[480px] mx-auto">
        보험·세금·유지비까지 합산한{" "}
        <strong className="text-foreground font-semibold">진짜 월 지출</strong>을
        <br className="hidden sm:block" />
        3단계로 정확하게 확인하세요.
      </p>

      {/* Trust stats */}
      <div className="flex items-center justify-center gap-6 sm:gap-10 mt-8">
        {[
          { value: "무료", label: "완전 무료" },
          { value: "3단계", label: "간단 입력" },
          { value: "실시간", label: "즉시 계산" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-base sm:text-lg font-black text-primary">{item.value}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5 font-medium">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
