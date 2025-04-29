import React from 'react'
import { Logo } from './navbar/logo'
import Link from 'next/link'
import { Separator } from './ui/separator'
import { Github, Twitter } from 'lucide-react'

const footerLinks = [
    {
        title: "About",
        link: "#about"
    },
    {
        title: "Experience",
        link: "#experience"
    },
    {
        title: "Projects",
        link: "#projects"
    }
]

export default function Footer() {
  return (
    <footer className="mt-20">
        <div className="max-w-screen-md mx-auto">
            <div className="py-12 flex flex-col justify-start items-center">
                <Separator />

                <div className="py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
                    {/* Copyright */}
                    <span className="text-muted-foreground">
                        &copy; {new Date().getFullYear()} Max Schäfer. All rights reserved.
                    </span>

                    {/* Socials */}
                    <div className="flex items-center gap-5 text-muted-foreground">

                        {/* Github */}
                        <Link href="https://github.com/maxi-schaefer" target='_blank'>
                            <Github className='h-5 w-5 hover:text-foreground transition-all duration-300' />
                        </Link>
                        
                        {/* Twitter */}
                        <Link href="https://twitter.com/gokimax_x" target='_blank'>
                            <Twitter className='h-5 w-5 hover:text-foreground transition-all duration-300' />
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
