import type { Metadata } from "next"
import HydrogenClient from "./HydrogenClient"

export const metadata: Metadata = {
  title: "수소차 보조금 계산기 2026 | 국고·지자체 보조금 조회",
  description: "2026년 수소차(FCEV) 보조금을 차량별·지역별로 계산해보세요. 넥쏘, 수소버스, 수소트럭 국고 보조금과 지자체 보조금 합산 금액을 바로 확인할 수 있습니다.",
  keywords: ["수소차 보조금", "수소차 보조금 2026", "넥쏘 보조금", "FCEV 보조금", "수소전기차 보조금", "수소차 지자체 보조금"],
  alternates: { canonical: "/hydrogen" },
}

export default function HydrogenPage() {
  return <HydrogenClient />
}
