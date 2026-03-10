import type { Metadata } from 'next'
import { Noto_Sans_KR, Bebas_Neue } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-kr'
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-bebas-neue'
})

export const metadata: Metadata = {
  title: {
    default: '자동차 할부 계산기 | 월 납입금·중고차 이자·취등록세 무료 계산',
    template: '%s | CarPayPro 자동차 할부 계산기',
  },
  description: '자동차 할부 월 납입금, 중고차 이자, 취등록세까지 한번에 무료 계산. 내 연봉에 맞는 차가 뭔지 3초 만에 확인하세요.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://carpaypro.com'),
  alternates: {
    canonical: '/',
  },
  keywords: [
    '자동차 할부 계산기',
    '자동차 월 납입금 계산',
    '중고차 할부 이자',
    '자동차 유지비 계산',
    '차량 구매 적정성 진단',
    '자동차 취득세 계산',
    '신차 할부 계산기',
    '자동차 보험료 계산',
    '연봉별 적정 차량',
    '자동차 총 비용 계산',
  ],
  openGraph: {
    title: '자동차 할부 계산기 | 월 납입금·중고차 이자·취등록세 무료 계산',
    description: '자동차 할부 월 납입금, 중고차 이자, 취등록세까지 한번에 무료 계산. 내 연봉에 맞는 차가 뭔지 3초 만에 확인하세요.',
    url: '/',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'CarPayPro',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://carpaypro.com'}/thumb.webp`,
        width: 1200,
        height: 630,
        alt: '자동차 할부 계산기 썸네일',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차 할부 계산기 | 월 납입금·중고차 이자·취등록세 무료 계산',
    description: '자동차 할부 월 납입금, 중고차 이자, 취등록세까지 한번에 무료 계산. 내 연봉에 맞는 차를 3초 만에 확인하세요.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://carpaypro.com'}/thumb.webp`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/Gemini_Generated_Image_uqshuxuqshuxuqsh-_1_.ico',
    shortcut: '/Gemini_Generated_Image_uqshuxuqshuxuqsh-_1_.ico',
    apple: '/Gemini_Generated_Image_uqshuxuqshuxuqsh-_1_.ico',
  },
  // verification: { google: 'YOUR_GOOGLE_VERIFICATION_CODE' },
  verification: {
    other: {
      'naver-site-verification': '55a4be2d62a229995169fc5d2881a4cd327c8c3f',
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-5378247298190063',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://carpaypro.com'

  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '자동차 할부 계산기 | 월 납입금·중고차 이자·취등록세 무료 계산',
    description: '자동차 할부 월 납입금, 중고차 이자, 취등록세까지 한번에 무료 계산. 내 연봉에 맞는 차가 뭔지 3초 만에 확인하세요.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: siteUrl,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  }

  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CarPayPro',
    url: siteUrl,
    logo: `${siteUrl}/Gemini_Generated_Image_uqshuxuqshuxuqsh-_1_.ico`,
  }

  return (
    <html lang="ko">
      <head>
        <Script
          id="json-ld-app"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
          strategy="beforeInteractive"
        />
        <Script
          id="json-ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
          strategy="beforeInteractive"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5378247298190063"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${notoSansKR.variable} ${bebasNeue.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <SiteHeader />
        <div className="flex-1">
          {children}
        </div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
