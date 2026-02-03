import { LoginForm } from "@/components/features/login-form"
import { AnimatedBackground } from "@/components/features/animated-background"
import { TypewriterText } from "@/components/features/typewriter-text"

const TYPEWRITER_TEXTS = ["Erarbeite neue Geschäftsideen"]

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      <div className="w-full lg:w-1/2 mt-14 lg:mt-0 flex lg:items-center lg:justify-center bg-background">
        <LoginForm />
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden m-3 rounded-lg">
        <AnimatedBackground />
        
        <div className="absolute inset-0 flex items-center justify-center px-8 z-10">
          <TypewriterText
            texts={TYPEWRITER_TEXTS}
            typingSpeed={80}
            deletingSpeed={40}
            pauseDuration={2000}
          />
        </div>
      </div>
    </main>
  )
}
