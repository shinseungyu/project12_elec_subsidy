import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "개인정보 처리방침 | 전기차 보조금 계산기",
  description: "carelec.kr(전기차 보조금 계산기)의 개인정보 처리방침입니다. 수집 항목, 이용 목적, 제3자 제공, 이용자 권리 등을 안내합니다.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: false },
}

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-[800px] px-4 py-12 md:py-20">
      <h1 className="mb-2 text-3xl font-bold text-foreground">개인정보 처리방침</h1>
      <p className="mb-8 text-sm text-muted-foreground">최종 업데이트: 2026년 3월 14일</p>
      <div className="prose prose-gray max-w-none text-muted-foreground leading-relaxed">
        <p>carelec.kr(이하 &quot;서비스&quot;)는 사용자의 개인정보를 소중하게 생각하며, 「개인정보 보호법」 제30조에 따라 아래와 같이 개인정보 처리방침을 수립·공개합니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. 개요</h2>
        <p>본 서비스는 전기차 보조금 계산기를 무료로 제공하는 웹사이트입니다. 사용자가 입력한 차량 정보 및 지역 정보는 보조금 계산 목적으로만 사용되며, 서버에 별도로 저장되지 않습니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. 수집하는 정보</h2>
        <p>서비스 이용 과정에서 다음과 같은 정보가 수집될 수 있습니다.</p>
        <ul>
          <li><strong>계산기 입력값</strong> (차량 유형, 차량 가격, 거주 지역) — 로컬 계산 및 결과 출력에만 사용되며, 서버에 저장되지 않습니다.</li>
          <li><strong>자동 수집 정보</strong> — 접속 로그, 쿠키, IP 주소, 브라우저 유형, 방문 페이지, 체류 시간 (서비스 분석 및 최적화 목적)</li>
          <li><strong>광고 관련 정보</strong> — Google AdSense를 통해 광고 쿠키 및 기기 식별자가 수집될 수 있습니다.</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. 정보 이용 목적</h2>
        <p>수집된 정보는 다음의 목적으로만 이용됩니다.</p>
        <ul>
          <li>전기차 보조금(국고·지자체) 계산 결과 제공</li>
          <li>서비스 이용 통계 분석 및 서비스 품질 개선</li>
          <li>맞춤형 또는 일반 광고 제공 (Google AdSense)</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. 쿠키 사용</h2>
        <p>본 서비스는 원활한 서비스 제공 및 광고 게재를 위해 쿠키를 사용합니다. 사용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다. 자세한 내용은 <a href="/cookie-policy" className="text-primary underline">쿠키 정책</a>을 참고하세요.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. 제3자 공유</h2>
        <p>서비스는 아래 경우에 한하여 사용자의 정보를 제3자에게 제공합니다.</p>
        <ul>
          <li><strong>Google LLC (Google AdSense)</strong> — 광고 서비스 제공 목적으로 쿠키 및 기기 식별자가 공유될 수 있습니다. Google의 광고 개인정보 처리 방식은 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google 개인정보처리방침</a>에서 확인하실 수 있습니다.</li>
          <li>법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
        </ul>
        <p>위 경우 외에는 정보주체의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. 구글 애드센스</h2>
        <p>본 서비스는 Google AdSense(ca-pub-5378247298190063)를 통해 광고를 게재합니다. Google은 사용자의 웹사이트 방문 기록을 기반으로 맞춤형 광고를 제공할 수 있습니다. Google 광고 맞춤설정은 <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google 광고 설정</a>에서 직접 변경하실 수 있습니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. 이용자 권리</h2>
        <p>사용자는 서비스에 대해 언제든지 아래의 권리를 행사할 수 있습니다.</p>
        <ul>
          <li>개인정보 처리 현황 열람 요구</li>
          <li>오류 정정 또는 삭제 요구</li>
          <li>처리 정지 요구</li>
        </ul>
        <p>개인정보 침해 관련 신고 및 상담은 아래 기관에 문의하실 수 있습니다.</p>
        <ul>
          <li>개인정보 침해신고센터 (privacy.kisa.or.kr / ☎ 118)</li>
          <li>개인정보 분쟁조정위원회 (www.kopico.go.kr / ☎ 1833-6972)</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. 문의</h2>
        <p>개인정보 처리에 관한 문의사항은 아래로 연락주세요.</p>
        <ul>
          <li><strong>사이트명:</strong> carelec.kr (전기차 보조금 계산기)</li>
          <li><strong>문의 이메일:</strong> <a href="mailto:tlsfkaus0711@gmail.com" className="text-primary underline">tlsfkaus0711@gmail.com</a></li>
        </ul>

        <p className="mt-8 text-sm">본 방침은 2026년 3월 14일부터 적용됩니다. 내용 변경 시 변경 7일 전부터 서비스 내 공지를 통해 안내드립니다.</p>
      </div>
    </main>
  )
}
