import { Zap } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-600" />
              <span className="font-bold text-foreground">전기차 보조금 계산기</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              2026 전기차 보조금을 차종별·지역별로 간편하게 계산하세요.
              국고 보조금과 지자체 보조금을 합산한 실구매가를 바로 확인하실 수 있습니다.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">빠른 링크</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-emerald-600 transition-colors">
                  전기차 보조금 계산기
                </Link>
              </li>
              <li>
                <Link href="/ev-guide" className="hover:text-emerald-600 transition-colors">
                  전기차 구매 가이드
                </Link>
              </li>
              <li>
                <Link href="/ev-comparison" className="hover:text-emerald-600 transition-colors">
                  전기차 비교
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-foreground">안내</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              본 계산기의 결과는 참고용이며, 실제 보조금은 지자체별 예산 및 정책에 따라 달라질 수 있습니다.
              정확한 보조금은 무공해차 통합누리집(ev.or.kr)을 통해 확인하시기 바랍니다.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center">
          <div className="mb-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-emerald-600 transition-colors">개인정보 처리방침</Link>
            <Link href="/terms-of-service" className="hover:text-emerald-600 transition-colors">이용약관</Link>
            <Link href="/cookie-policy" className="hover:text-emerald-600 transition-colors">쿠키 정책</Link>
          </div>
          <p className="text-sm text-muted-foreground">&copy; 2026 carelec.kr &middot; 문의: tlsfkaus0711@gmail.com</p>
          <p className="mt-2 text-xs text-muted-foreground/70">본 계산기의 결과는 참고용이며, 실제 보조금은 지자체별 예산 및 정책에 따라 달라질 수 있습니다.</p>
        </div>
      </div>
    </footer>
  )
}
