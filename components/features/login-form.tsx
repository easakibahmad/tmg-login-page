"use client"

import { useState, type FormEvent, type MouseEvent, type CSSProperties } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const width = rect.width
    const height = rect.height
    
    const distances = [
      Math.sqrt(x * x + y * y),
      Math.sqrt((width - x) * (width - x) + y * y),
      Math.sqrt(x * x + (height - y) * (height - y)),
      Math.sqrt((width - x) * (width - x) + (height - y) * (height - y)),
    ]
    
    const maxDistance = Math.max(...distances)
    const rippleSize = maxDistance * 2
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size: rippleSize,
    }
    
    setRipples((prev) => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 400)
  }

  return (
    <div className="w-full max-w-md mx-auto px-8">
      <div className="text-center mb-6 pb-10">
        <h1 className="text-3xl font-medium text-blue-gray-900 tracking-normal antialiased">
          Welcome to TMG!
        </h1>
        <p className="text-base font-normal text-blue-gray-500 leading-8 font-inter antialiased">
          Please <span className="cursor-pointer">log in</span> to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">
            <p className="text-sm font-semibold leading-[150%] font-inter antialiased text-ellipsis text-gray-616161">
              E-Mail-Adresse
            </p>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            className="h-[44px] border-gray-300 w-full lg:w-[388px]"
          />
        </div>

        <div className="space-y-2 mb-10">
          <Label htmlFor="password">
            <p className="text-sm font-semibold leading-[150%] font-inter antialiased text-ellipsis text-gray-616161">
              Passwort
            </p>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              placeholder={isPasswordFocused && password.length === 0 ? "********" : ""}
              className="h-[44px] border-gray-300 pr-12 w-full lg:w-[388px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 -mt-1 cursor-pointer" />
              ) : (
                <Eye className="h-5 w-5 -mt-1 cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          onClick={handleButtonClick}
          className="hover:shadow-xl relative w-full lg:w-[388px] mt-6 font-bold uppercase font-sans h-12 bg-secondary hover:bg-secondary text-white tracking-wider rounded-full cursor-pointer overflow-hidden focus:shadow-none focus:opacity-[0.85]" 
        >
          LOG IN
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full bg-[#fff] opacity-50 pointer-events-none"
              style={{
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
                width: '0px',
                height: '0px',
                transform: 'translate(-50%, -50%)',
                animation: `ripple 500ms ease-out`,
                '--ripple-size': `${ripple.size}px`,
              } as CSSProperties & { '--ripple-size': string }}
            />
          ))}
        </Button>
      </form>

      <div className="mt-8 text-center space-y-3">
        <button className="text-sm font-semibold leading-[150%] font-inter antialiased text-ellipsis text-gray-616161 cursor-pointer">
          Forgot password
        </button>
        <div className="text-sm mt-3">
          <span className="antialiased text-blue-gray-500 font-sans mr-2">Not registered?</span>
          <button className="text-sm font-semibold leading-[150%] font-inter antialiased text-ellipsis text-gray-616161">
            Create account
          </button>
        </div>
      </div>
    </div>
  )
}
