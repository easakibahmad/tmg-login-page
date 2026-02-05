import { LoginForm } from "@/components/features/login-form"
import { AnimatedBackground } from "@/components/features/animated-background"
import { TypewriterText } from "@/components/features/typewriter-text"
import { ArrowUp } from "lucide-react"

const TYPEWRITER_TEXTS = [
  "interactive prototypes.",
  "dashboards.",
  "your landing page.",
  "your blog.",
  "your portfolio.",
  "your tools.",
  "your saas startup."
]

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      <div className="w-full lg:w-1/2 mt-18 lg:mt-0 flex lg:items-center lg:justify-center bg-background">
        <LoginForm />
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden m-3 rounded-xl">
        <AnimatedBackground />
        
        <div className="absolute inset-0 flex items-center justify-center px-8 z-10">
          <div className="bg-[#FCFBF8D9] w-[450px] h-[72px] flex items-center justify-between rounded-lg p-4 shadow-xl">
            <TypewriterText
              texts={TYPEWRITER_TEXTS}
              prefix="Ask Lovable to build "
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2000}
            />
            <div className="bg-[#111827] w-10 h-10 flex items-center justify-center rounded-full">
              <ArrowUp className="text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
