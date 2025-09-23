import React from 'react'
import { ModeToggle } from '../ui/mode-toggle'

export default function Footer() {
  return (
    <div className='max-w-6xl mx-auto px-6 sm:px-8 lg:px-16'>
      <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
              <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Maxi Schäfer. All rights reserved.</div>
                  <div className="text-xs text-muted-foreground">Built with ♥️ by Maxi Schäfer</div>
              </div>

              <div className="flex items-center gap-4">
                  <ModeToggle />
              </div>
          </div>
      </footer>
    </div>
  )
}
