"use client";

import React from "react";

import { useState, type MouseEvent, type CSSProperties } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([]);

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

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          #email,
          #email:focus {
            border-top-width: 0 !important;
            border-left-width: 0 !important;
            border-right-width: 0 !important;
            border-bottom-width: 1px !important;
            border-top-color: transparent !important;
            border-left-color: transparent !important;
            border-right-color: transparent !important;
            border-bottom-color: rgb(212 212 212) !important;
            border-radius: 0 !important;
            padding-left: 0 !important;
            padding-bottom: 0.35rem !important;
            width: 323.63px;
          }
          #reset-button {
            width: 323.63px;
            height: 40px;
          }
          .input-wrapper {
            width: 323.63px;
          }
          label[for="email"] {
            color: #546E7A !important;
          }
          .email-input-group:focus-within label[for="email"] {
            color: black !important;
          }
          @media (min-width: 1024px) {
            #email,
            #email:focus {
              width: 368px;
            }
            .input-wrapper {
              width: 368px;
            }
            #reset-button {
              width: 368px;
            }
          }
        `,
        }}
      />
      <div className="" style={{ paddingTop: "24px" }}>
        <div
          className="bg-neutral-800 -mb-[114px] text-center lg:w-[384px] w-[340px] h-[134px] mx-auto rounded-xl flex flex-col items-center justify-center"
          style={{ padding: "32px 16px" }}
        >
          <h1
            className="font-bold text-neutral-50"
            style={{ fontSize: "30px", marginBottom: "8px" }}
          >
            Reset Password
          </h1>
          <p className="text-sm text-white" style={{color: "#FFFFFF"}}>
            You will receive an email in maximum 60 seconds
          </p>
        </div>
        <div
          className="rounded-2xl shadow-xl bg-card w-[371px] lg:w-[416px] flex flex-col justify-end"
          style={{ height: "294px" }}
        >
          {/* Dark header section */}

          {/* Form section */}
          <div className="px-6 pt-8 pb-6">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5 gap-4"
            >
              <div className="email-input-group">
                <label
                  htmlFor="email"
                  className="block text-sm"
                >
                  Your Email
                </label>
                <div className="relative input-wrapper">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full border-b border-neutral-300 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-neutral-800 transition-all duration-300 ease-out peer-focus:left-0 peer-focus:w-full" />
                </div>
              </div>

              <button
                id="reset-button"
                type="button"
                onClick={handleButtonClick}
                className="hover:shadow-xl mt-[12px] cursor-pointer relative rounded-lg bg-neutral-800 text-sm font-medium tracking-wider text-neutral-50 overflow-hidden focus:shadow-none focus:opacity-[0.85]"
              >
                RESET
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute rounded-full bg-[#fff] opacity-50 pointer-events-none"
                    style={
                      {
                        left: `${ripple.x}px`,
                        top: `${ripple.y}px`,
                        width: "0px",
                        height: "0px",
                        transform: "translate(-50%, -50%)",
                        animation: `ripple 500ms ease-out`,
                        "--ripple-size": `${ripple.size}px`,
                      } as CSSProperties & { "--ripple-size": string }
                    }
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

