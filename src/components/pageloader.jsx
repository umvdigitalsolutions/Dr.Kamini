"use client"

import { useEffect, useState } from 'react'

export default function PageLoader({ autoHide = true, hideAfter = 3000 }) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(true)
  const [isDissolving, setIsDissolving] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (autoHide) {
      // 1. Start the linear dissolve (fade out) 800ms before removing component
      const dissolveTimer = setTimeout(() => setIsDissolving(true), Math.max(0, hideAfter - 800))
      
      // 2. Completely remove the loader from the DOM
      const removeTimer = setTimeout(() => setVisible(false), hideAfter)

      return () => {
        clearTimeout(dissolveTimer)
        clearTimeout(removeTimer)
      }
    }
  }, [autoHide, hideAfter])

  if (!mounted || !visible) return null

  return (
    <div
      className={`
        fixed inset-0 z-[100] flex items-center justify-center bg-white 
        transition-opacity duration-[800ms] ease-linear
        ${isDissolving ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      <div className="flex items-center justify-center w-full">
        <img
          src="/prime.png"
          alt="Prime"
          className={
            "h-[40vh] w-auto object-contain " + (isDissolving ? "linear-hidden" : "linear-dissolve")
          }
        />
      </div>
 
    </div>
  )
}