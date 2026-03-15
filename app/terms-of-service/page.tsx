import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "이용약관 | 전기차 보조금 계산기",
  description: "carelec.kr(전기차 보조금 계산기) 이용약관입니다. 서비스 성격, 책임 제한, 면책 조항 등을 안내합니다.",
  alternates: { canonical: "/terms-of-service" },
  robots: { index: false, follow: false },
}

export default function TermsOfService() {
  return (
    <main className="mx-auto max-w-[800px] px-4 py-12 md:py-20">
      <h1 className="mb-8 text-3xl font-bold text-foreground">이용약관</h1>
      <div className="prose prose-gray max-w-none text-muted-foreground leading-relaxed">

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. 목적</h2>
        <p>본 약관은 carelec.kr(이하 &quot;서비스&quot;)이 제공하는 전기차 보조금 계산기 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. 서비스의 성격 및 한계</h2>
        <p>본 서비스는 사용자가 입력한 차량 정보와 거주 지역을 바탕으로 2026년 전기차 보조금을 예상 계산해주는 <strong className="text-foreground">참고용 도구</strong>입니다. 산출된 결과는 실제 보조금과 다를 수 있으며, 다음과 같은 이유로 차이가 발생할 수 있습니다.</p>
        <ul>
          <li>지자체별 보조금 예산 소진 여부</li>
          <li>차량 출시 이후 변경된 보조금 정책</li>
          <li>차량 실제 출고가와 입력가의 차이</li>
          <li>개인별 적용 조건 차이 (법인/개인, 재구매 여부 등)</li>
        </ul>
        <p>본 계산 결과는 법적 효력을 가지지 않으며, 정확한 보조금은 무공해차 통합누리집(ev.or.kr)이나 거주지 지자체를 통해 확인하시기 바랍니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. 책임의 제한</h2>
        <p>사용자가 본 서비스의 결과값을 바탕으로 행한 경제적 의사결정(전기차 구매, 계약 등)에 대한 책임은 사용자 본인에게 있으며, 서비스 제공자는 이로 인해 발생하는 어떠한 손해에 대해서도 책임을 지지 않습니다. 정확한 보조금 확인은 공식 기관(환경부, 지자체)을 통해 이루어져야 합니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. 정보의 정확성</h2>
        <p>본 서비스는 2026년 기준 전기차 보조금 정보를 최대한 정확하게 반영하기 위해 노력합니다. 그러나 보조금 정책은 정부 및 지자체의 예산 상황에 따라 수시로 변경될 수 있으므로, 최신 정보는 공식 기관을 통해 확인하시기 바랍니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. 지적재산권</h2>
        <p>서비스에서 제공하는 데이터 구조, 디자인, 콘텐츠에 대한 지적재산권은 본 서비스에 귀속됩니다. 사전 동의 없는 무단 복제 및 전재를 금합니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. 서비스 변경 및 중단</h2>
        <p>carelec.kr은 서비스의 운영 정책 변경, 기술적 사유, 또는 사업 상의 필요에 의해 서비스의 일부 또는 전부를 수정·중단할 수 있습니다. 사전 고지가 가능한 경우에는 서비스 내 공지를 통해 안내하며, 불가피한 경우에는 사후 공지할 수 있습니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. 광고 및 외부 링크</h2>
        <p>본 서비스는 Google AdSense를 통한 광고를 포함할 수 있습니다. 광고 콘텐츠는 Google의 정책에 따라 게재되며, 서비스 제공자가 광고 내용을 직접 통제하지 않습니다. 서비스 내 외부 링크는 정보 제공 목적으로만 제공되며, 해당 외부 사이트의 콘텐츠 및 운영 방식에 대한 책임은 서비스 제공자에게 없습니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. 약관의 효력 및 변경</h2>
        <p>본 약관은 carelec.kr 내 공지와 함께 효력이 발생합니다. 약관이 변경되는 경우 변경 사항을 서비스 내 공지사항을 통해 게시하며, 변경 후 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로 간주합니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. 준거법 및 관할법원</h2>
        <p>본 약관 및 서비스 이용과 관련하여 발생하는 분쟁에 대해서는 대한민국 법률이 적용되며, 관련 소송은 서비스 제공자의 주소지를 관할하는 법원을 전속 관할 법원으로 합니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">10. 문의</h2>
        <p>이용약관과 관련한 문의사항은 아래로 연락주세요.</p>
        <p className="mt-2">이메일: <a href="mailto:tlsfkaus0711@gmail.com" className="text-primary underline">tlsfkaus0711@gmail.com</a></p>
      </div>
    </main>
  )
}
