import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "쿠키 정책",
  description: "CarPayPro(carpaypro.com)의 쿠키 정책입니다. 사용 쿠키 종류, Google AdSense 광고 쿠키, 브라우저별 쿠키 설정 방법을 안내합니다.",
  alternates: { canonical: "/cookie-policy" },
  robots: { index: false, follow: false },
}

export default function CookiePolicy() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      <h1 className="mb-8 text-3xl font-bold text-foreground">쿠키 정책</h1>
      <div className="prose prose-gray max-w-none text-muted-foreground leading-relaxed">
        <p>본 서비스는 원활한 사용자 경험을 제공하기 위해 쿠키(Cookie)를 사용합니다. 쿠키는 웹사이트가 사용자의 브라우저에 저장하는 작은 텍스트 파일입니다.</p>
        
        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. 쿠키 사용 목적</h2>
        <p>우리는 다음과 같은 목적으로 쿠키를 사용합니다.</p>
        <ul>
          <li>사용자의 설정 및 이용 환경 기억 (계산기 입력값의 일시적 유지)</li>
          <li>사이트 방문 통계 분석 및 트래픽 분석</li>
          <li>사용자 인터페이스 개선 및 오류 해결</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. 쿠키의 종류</h2>
        <p>본 서비스에서 사용하는 쿠키는 다음과 같이 분류됩니다.</p>
        <ul>
          <li><strong>필수 쿠키</strong> — 서비스의 핵심 기능(계산기 작동, 페이지 이동 등)에 반드시 필요한 쿠키입니다. 이 쿠키 없이는 일부 서비스를 이용할 수 없습니다.</li>
          <li><strong>분석 쿠키</strong> — Vercel Analytics 등 방문 통계 수집 도구에서 사용됩니다. 수집된 데이터는 익명 처리되며 서비스 개선 목적으로만 활용됩니다.</li>
          <li><strong>광고 쿠키</strong> — Google AdSense를 통한 맞춤형 광고 제공에 사용될 수 있습니다. 이 쿠키를 거부해도 광고는 표시되지만, 개인화되지 않은 일반 광고가 표시됩니다.</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. 쿠키 설정 및 거부 방법</h2>
        <p>사용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나, 저장된 쿠키를 언제든지 삭제할 수 있습니다. 다만, 필수 쿠키를 거부할 경우 게시판의 게시물 읽기나 계산기 기능 이용에 일부 제약이 생길 수 있습니다.</p>
        <ul>
          <li><strong>Chrome</strong> — 설정 → 개인정보 보호 및 보안 → 쿠키 및 기타 사이트 데이터</li>
          <li><strong>Safari</strong> — 설정 → Safari → 개인정보 보호 → 모든 쿠키 차단</li>
          <li><strong>Firefox</strong> — 설정 → 개인 정보 보호 → 쿠키 및 사이트 데이터</li>
          <li><strong>Edge</strong> — 설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터 관리</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. 제3자 쿠키</h2>
        <p>본 서비스는 Google AdSense, Vercel Analytics 등 제3자 서비스와 연동될 수 있으며, 해당 제3자가 별도의 쿠키를 설정할 수 있습니다. 이러한 쿠키는 각 제3자의 개인정보 처리방침에 따라 관리됩니다. Google 광고 쿠키에 대한 자세한 내용은 Google의 광고 및 개인정보 보호 정책을 참조하십시오.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. 정책 변경 안내</h2>
        <p>본 쿠키 정책은 서비스 변경 또는 관련 법령 개정에 따라 업데이트될 수 있습니다. 중요한 변경이 있을 경우 서비스 내 공지를 통해 안내해 드립니다. 최신 정책은 carpaypro.com/cookie-policy 에서 언제든 확인하실 수 있습니다.</p>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. 문의</h2>
        <p>쿠키 정책과 관련한 문의사항은 아래로 연락주세요.</p>
        <p className="mt-2">이메일: <a href="mailto:tlsfkaus0711@gmail.com" className="text-primary underline">tlsfkaus0711@gmail.com</a></p>
      </div>
    </main>
  )
}
