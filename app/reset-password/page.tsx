"use client";

import React, { useEffect, useRef } from "react";

import { useState, type MouseEvent } from "react";
import { toast } from "sonner";
import "./reset-password.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([]);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const distances = [
      Math.sqrt(x * x + y * y),
      Math.sqrt((width - x) * (width - x) + y * y),
      Math.sqrt(x * x + (height - y) * (height - y)),
      Math.sqrt((width - x) * (width - x) + (height - y) * (height - y)),
    ];

    const maxDistance = Math.max(...distances);
    const rippleSize = maxDistance * 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size: rippleSize,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 400);

    toast.error("Error while sending the password reset email");
  };

  // Update dynamic styles for ripples
  useEffect(() => {
    if (!styleRef.current) {
      styleRef.current = document.createElement("style");
      document.head.appendChild(styleRef.current);
    }

    if (ripples.length > 0) {
      const styles = ripples
        .map(
          (ripple) => `
        .ripple-effect[data-ripple-id="${ripple.id}"] {
          --ripple-x: ${ripple.x}px;
          --ripple-y: ${ripple.y}px;
          --ripple-size: ${ripple.size}px;
        }
      `
        )
        .join("\n");
      styleRef.current.textContent = styles;
    } else {
      styleRef.current.textContent = "";
    }

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [ripples]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="pt-6">
        <div
          className="bg-neutral-800 -mb-[114px] text-center lg:w-[384px] w-[340px] h-[134px] mx-auto rounded-xl flex flex-col items-center justify-center p-8 px-4"
        >
          <h1 className="font-bold text-neutral-50 text-[30px] mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-white">
            You will receive an email in maximum 60 seconds
          </p>
        </div>
        <div
          className="rounded-2xl shadow-xl bg-card w-[371px] lg:w-[416px] flex flex-col justify-end h-[294px]"
        >
          {/* Dark header section */}

          {/* Form section */}
          <div className="px-6 pt-8 pb-6">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5 gap-4"
            >
              <div className="reset-email-input-group">
                <label
                  htmlFor="reset-email"
                  className="reset-email-label block text-sm"
                >
                  Your Email
                </label>
                <div className="relative reset-input-wrapper w-[323.63px] lg:w-[368px] mt-2">
                  <input
                    type="email"
                    id="reset-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="reset-email-input peer w-full border-b border-neutral-300 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-neutral-800 transition-all duration-300 ease-out peer-focus:left-0 peer-focus:w-full" />
                </div>
              </div>

              <button
                type="button"
                onClick={handleButtonClick}
                className="reset-button w-[323.63px] lg:w-[368px] h-10 hover:shadow-xl mt-[12px] cursor-pointer relative rounded-lg bg-neutral-800 text-sm font-medium tracking-wider text-neutral-50 overflow-hidden focus:shadow-none focus:opacity-[0.85]"
              >
                RESET
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple-effect"
                    data-ripple-id={ripple.id}
                  />
                ))}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

