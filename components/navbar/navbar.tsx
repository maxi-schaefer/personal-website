import React from 'react'
import NavMenu from './nav-menu'
import { Button } from '../ui/button'
import { Github, Twitter } from 'lucide-react'
import NavigationSheet from './nav-sheet'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeSwitcher } from '../ui/theme-provider'
import { TryHackMeLogo } from '../icons'

export default function Navbar() {
    return (
        <nav className="fixed z-10 top-6 inset-x-4 h-14 bg-background/50 backdrop-blur-sm border dark:border-slate-700/70 max-w-screen-md mx-auto rounded-full">
            <div className="h-full flex items-center justify-between mx-auto px-3">
                {/* Logo */}
                <Link href="/">
                    <Image width={40} height={40} src="https://avatars.githubusercontent.com/u/95922236?v=4" alt="" className='rounded-full'/>
                </Link>

                {/* Desktop Menu */}
                <NavMenu className='hidden md:block' />

                {/* Social Buttons */}
                <div className="flex items-center gap-2">

                    {/* Theme Switcher */}
                    <ThemeSwitcher />

                    {/* Tryhackme */}
                    <Link href={"https://tryhackme.com/p/Maxi.Schaefer"} target='_blank'>
                        <Button variant="outline" className='hidden sm:inline-flex rounded-full shadow-none cursor-pointer' size="icon">
                            <TryHackMeLogo />
                        </Button>
                    </Link>

                    {/* Twitter (X) */}
                    <Link href={"https://twitter.com/gokimax_x"} target='_blank'>
                        <Button variant="outline" className='hidden sm:inline-flex rounded-full shadow-none cursor-pointer' size="icon">
                            <Twitter />
                        </Button>
                    </Link>

                    {/* Github */}
                    <Link href={"https://tryhackme.com/p/Maxi.Schaefer"} target='_blank'>
                        <Button variant="outline" className='hidden sm:inline-flex rounded-full shadow-none cursor-pointer' size="icon">
                            <Github />
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <NavigationSheet />
                </div>
            </div>
        </nav>
    )
}
