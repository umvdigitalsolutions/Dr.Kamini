"use client"

import { useEffect, useState } from 'react'

export default function IntroOverlay({ autoShow = true, autoHide = true, hideAfter = 3500 }) {
  const [visible, setVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (!autoShow) return
    if (typeof window === 'undefined') return

    // Only show the intro on the homepage to avoid it appearing during
    // client-side navigation between pages (e.g. clicking "Contact").
    try {
      if (window.location && window.location.pathname !== "/") return
    } catch (e) {
      return
    }

    let seen = false
    try {
      seen = !!localStorage.getItem('introSeen')
    } catch (e) {
      seen = false
    }

    const markSeen = () => {
      try {
        localStorage.setItem('introSeen', '1')
      } catch (e) {}
    }

    if (!seen) {
      setVisible(true)

      if (autoHide) {
        // Start the Linear Dissolve 800ms before removing component
        const exitT = setTimeout(() => setIsExiting(true), Math.max(0, hideAfter - 800))

        const closeT = setTimeout(() => {
          setVisible(false)
          markSeen()
        }, hideAfter)

        return () => {
          clearTimeout(exitT)
          clearTimeout(closeT)
          markSeen()
        }
      }
    }
  }, [autoShow, autoHide, hideAfter])

  if (!visible) return null

  const closeIntro = () => {
    setIsExiting(true)
    setTimeout(() => {
      setVisible(false)
      try {
        localStorage.setItem('introSeen', '1')
      } catch (e) {}
    }, 800)
  }

  return (
    <div
      onClick={closeIntro}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') closeIntro()
      }}
      role="button"
      tabIndex={0}
      className={
        "fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-[800ms] ease-linear " +
        (isExiting ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto cursor-pointer")
      }
    >
      <div className="flex items-center justify-center w-full">
        <img
          src="/prime.png"
          alt="Prime"
          className={
            "h-[40vh] w-auto object-contain " + (isExiting ? "linear-hidden" : "linear-dissolve")
          }
        />
      </div>
    </div>
  )
}