import { cn } from '@/lib/utils'
import React from 'react'

export default function GradientText({ text, className }: { text: string, className?: string }) {
  return (
    <span className={cn("inline-block text-transparent bg-clip-text bg-[linear-gradient(270deg,#ff0000,#00ff00)] bg-[length:200%_200%] animate-[gradient-x_5s_ease_infinite]", className)}>
        {text}
    </span>
  )
}