import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { Logo } from './logo'
import NavMenu from './nav-menu'

export default function NavigationSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className='rounded-full'>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className='pt-3 px-6'>
                <Logo />
                <NavMenu orientation='vertical' className="mt-12" />
            </SheetContent>
        </Sheet>
    )
}
