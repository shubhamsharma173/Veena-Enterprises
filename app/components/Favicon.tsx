'use client'

import { useEffect } from 'react'

export default function Favicon() {
  useEffect(() => {
    // Create a canvas to generate favicon
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Background circle
      ctx.fillStyle = '#1E3A8A'
      ctx.beginPath()
      ctx.arc(16, 16, 15, 0, 2 * Math.PI)
      ctx.fill()
      
      // Border
      ctx.strokeStyle = '#FFD700'
      ctx.lineWidth = 1
      ctx.stroke()
      
      // Sun rays
      ctx.fillStyle = '#FFD700'
      
      // Vertical rays
      ctx.fillRect(15, 2, 2, 4)
      ctx.fillRect(15, 26, 2, 4)
      
      // Horizontal rays
      ctx.fillRect(2, 15, 4, 2)
      ctx.fillRect(26, 15, 4, 2)
      
      // Center sun
      ctx.fillStyle = '#FFD700'
      ctx.beginPath()
      ctx.arc(16, 16, 6, 0, 2 * Math.PI)
      ctx.fill()
      
      // Convert to data URL and set as favicon
      const dataURL = canvas.toDataURL('image/png')
      
      // Create or update favicon link
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
      if (!favicon) {
        favicon = document.createElement('link')
        favicon.rel = 'icon'
        document.head.appendChild(favicon)
      }
      favicon.href = dataURL
    }
  }, [])

  return null
} 