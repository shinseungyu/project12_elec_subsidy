import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "CarPayPro(carpaypro.com)의 개인정보 처리방침입니다. 수집 항목, 이용 목적, 제3자 제공, 위탁 처리, 정보주체 권리 등을 안내합니다.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: false },
}

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      <h1 className="mb-2 text-3xl font-bold text-foreground">개인정보 처리방침</h1>
      <p className="mb-8 text-sm text-muted-foreground">최종 업데이트: 2026년 3월 11일</p>
      <div className="prose prose-gray max-w-none text-muted-foreground leading-relaxed">
        <p>CarPayPro(carpaypro.com, 이하 &quot;서비스&quot;)는 사용자의 개인정보를 소중하게 생각하며, 「개인정보 보호법」 제30조에 따라 아래와 같이 개인정보 처리방침을 수립·공개합니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. 수집하는 개인정보 항목</h2>
        <p>서비스 이용 과정에서 다음과 같은 정보가 수집될 수 있습니다.</p>
        <ul>
          <li><strong>계산기 입력값</strong> (차량 가격, 할부 기간, 금리, 연봉 등) — 로컬 계산 및 결과 출력에만 사용되며, 서버에 별도로 저장되지 않습니다.</li>
          <li><strong>자동 수집 정보</strong> — 접속 로그, 쿠키, IP 주소, 브라우저 유형, 방문 페이지, 체류 시간 (서비스 분석 및 최적화 목적)</li>
          <li><strong>광고 관련 정보</strong> — Google AdSense를 통해 광고 쿠키 및 기기 식별자가 수집될 수 있습니다.</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. 개인정보의 수집 및 이용 목적</h2>
        <p>수집된 정보는 다음의 목적으로만 이용됩니다.</p>
        <ul>
          <li>자동차 할부금 및 유지비 예상 결과 제공</li>
          <li>사용자 연령/소득 대비 구매 적정성 분석 서비스 제공</li>
          <li>서비스 이용 통계 분석 및 서비스 품질 개선</li>
          <li>맞춤형 또는 일반 광고 제공 (Google AdSense)</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. 개인정보의 보유 및 이용 기간</h2>
        <p>입력된 계산 데이터는 사용자의 브라우저 세션 중에만 유지되며, 서버에 영구 보관되지 않습니다. 자동 수집 로그(접속 기록 등)는 목적 달성 후 즉시 파기하거나 익명 처리합니다. 단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. 개인정보의 제3자 제공</h2>
        <p>서비스는 아래 경우에 한하여 사용자의 정보를 제3자에게 제공합니다.</p>
        <ul>
          <li><strong>Google LLC (Google AdSense)</strong> — 광고 서비스 제공 목적으로 쿠키 및 기기 식별자가 공유될 수 있습니다. Google의 광고 개인정보 처리 방식은 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google 개인정보처리방침</a>에서 확인하실 수 있습니다.</li>
          <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
        </ul>
        <p>위 경우 외에는 정보주체의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. 개인정보 처리의 위탁</h2>
        <p>서비스는 원활한 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
        <table className="w-full text-sm border-collapse border border-border mt-2">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">수탁 업체</th>
              <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">위탁 업무</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-3 py-2">Google LLC</td>
              <td className="border border-border px-3 py-2">광고 서비스 제공 (Google AdSense), 방문 분석</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2">Vercel Inc.</td>
              <td className="border border-border px-3 py-2">서버 호스팅 및 트래픽 분석 (Vercel Analytics)</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2">위탁 업체는 위탁 목적 범위 내에서만 개인정보를 처리하며, 각 업체의 개인정보보호 정책에 따라 관리됩니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. 개인정보의 파기 절차 및 방법</h2>
        <p>서비스는 개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우 지체 없이 해당 정보를 파기합니다.</p>
        <ul>
          <li><strong>전자 파일 형태</strong> — 기술적 방법으로 복구·재생 불가능한 방식으로 영구 삭제</li>
          <li><strong>종이 문서</strong> — 해당 없음 (서비스는 서면 수집을 하지 않습니다)</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. 정보주체의 권리·의무 및 행사 방법</h2>
        <p>사용자(정보주체)는 서비스에 대해 언제든지 아래의 권리를 행사할 수 있습니다.</p>
        <ul>
          <li>개인정보 처리 현황 열람 요구</li>
          <li>오류 정정 또는 삭제 요구</li>
          <li>처리 정지 요구</li>
        </ul>
        <p>권리 행사는 아래 개인정보 보호 책임자 이메일로 서면, 이메일을 통해 요청하실 수 있으며, 서비스는 이에 대해 지체 없이 조치하겠습니다. Google AdSense 관련 광고 맞춤설정은 <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google 광고 설정</a>에서 직접 변경하실 수 있습니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. 개인정보의 안전성 확보 조치</h2>
        <p>서비스는 개인정보 보호를 위해 다음 조치를 취하고 있습니다.</p>
        <ul>
          <li>HTTPS(SSL/TLS) 암호화 통신 적용</li>
          <li>계산기 입력값의 서버 미전송 (클라이언트 사이드 로컬 처리)</li>
          <li>외부 분석 도구 데이터의 익명 처리</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. 개인정보 보호 책임자</h2>
        <p>개인정보 처리에 관한 업무를 총괄하고, 관련 고충을 처리하기 위하여 아래와 같이 개인정보 보호 책임자를 지정하고 있습니다.</p>
        <ul>
          <li><strong>사이트명:</strong> CarPayPro (carpaypro.com)</li>
          <li><strong>문의 이메일:</strong> <a href="mailto:tlsfkaus0711@gmail.com" className="text-primary underline">tlsfkaus0711@gmail.com</a></li>
        </ul>
        <p>개인정보 침해 관련 신고 및 상담은 아래 기관에 문의하실 수 있습니다.</p>
        <ul>
          <li>개인정보 침해신고센터 (privacy.kisa.or.kr / ☎ 118)</li>
          <li>개인정보 분쟁조정위원회 (www.kopico.go.kr / ☎ 1833-6972)</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">10. 처리방침 변경</h2>
        <p>본 방침은 2026년 3월 11일부터 적용됩니다. 내용 변경 시 변경 7일 전부터 서비스 내 공지를 통해 안내드립니다.</p>
      </div>
    </main>
  )
}
