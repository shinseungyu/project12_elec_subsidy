import type { Metadata } from "next"
import ModelYClient from "./ModelYClient"

export const metadata: Metadata = {
  title: "테슬라 모델Y 보조금 2026 | 지역별 실구매가 계산기",
  description: "2026년 테슬라 모델Y 보조금을 지역별로 계산해보세요. RWD·롱레인지 국고 보조금과 지자체 보조금 합산 실구매가를 한눈에 확인할 수 있습니다.",
  keywords: ["테슬라 모델Y 보조금", "모델Y 실구매가", "모델Y 보조금 2026", "테슬라 보조금", "모델Y 지역별 보조금", "테슬라 모델Y 가격"],
  alternates: { canonical: "/model-y-subsidy" },
}

export default function ModelYPage() {
  return <ModelYClient />
}
