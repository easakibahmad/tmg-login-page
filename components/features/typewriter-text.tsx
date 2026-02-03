"use client"

import { useEffect, useState } from "react"

interface TypewriterTextProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function TypewriterText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    const currentText = texts[currentIndex]

    if (isTyping) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, pauseDuration)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deletingSpeed)
        return () => clearTimeout(timeout)
      } else {
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        setIsTyping(true)
      }
    }
  }, [displayText, isTyping, currentIndex, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className="inline-flex items-baseline">
      <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
        {displayText}
      </span>
      <span
        className={`inline-block w-[4px] h-[1.2em] bg-cyan-300 ml-1 rounded-sm shadow-[0_0_8px_rgba(34,211,238,0.8)] ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          transition: "opacity 0.15s ease-in-out",
        }}
        aria-hidden="true"
      />
    </span>
  )
}
