import { Car } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">유지비 자가진단</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              자동차 할부 원금부터 보험료, 세금, 유지비까지 한번에 계산하세요. 
              내 연봉에 최적화된 차량 구매 계획을 도와드립니다.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">빠른 링크</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  할부 및 유지비 계산기
                </Link>
              </li>
              <li>
                <Link href="/board" className="hover:text-primary transition-colors">
                  구매 및 유지 가이드 (게시판)
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-primary transition-colors">
                  자주 묻는 질문 (FAQ)
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">안내</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              본 사이트의 계산 결과는 참고용이며, 실제 금리 및 보험료는 
              금융사 및 개인의 조건에 따라 달라질 수 있습니다.
              정확한 견적은 관련사 상담을 권장합니다.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center">
          <div className="mb-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">개인정보 처리방침</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">이용약관</Link>
            <Link href="/cookie-policy" className="hover:text-primary transition-colors">쿠키 정책</Link>
          </div>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} 자동차 할부 계산기 — 유지비 자가진단. All rights reserved. | 문의: tlsfkaus0711@gmail.com</p>
        </div>
      </div>
    </footer>
  )
}
