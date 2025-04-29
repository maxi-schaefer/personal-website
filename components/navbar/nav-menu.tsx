import { NavigationMenuProps } from '@radix-ui/react-navigation-menu'
import React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NavMenu({ className, ...props }: NavigationMenuProps) {
  return (
    <NavigationMenu className={cn('data-[orientation=vertical]:items-start', className)} {...props}>
        <NavigationMenuList className='gap-1 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start'>

            {/* About */}
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link href="#about">About</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            
            {/* Experience */}
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link href="#experience">Experience</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            
            {/* Projects */}
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link href="#projects">Projects</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>

        </NavigationMenuList>
    </NavigationMenu>
  )
}