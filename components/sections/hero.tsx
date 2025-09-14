"use client";

import { cn } from '@/lib/utils'
import React, { RefObject } from 'react'
import { Ripple } from '../magicui/ripple'
import { SpotifyNowPlayingContainer } from '../ui/spotify-now-playing-container';

export default function HeroSection({ sectionsRef }: { sectionsRef: RefObject<(HTMLElement | null)[]> }) {
    return (
        <header id="hero" ref={(el) => {(sectionsRef.current[0] = el)}} className="min-h-screen flex items-center opacity-0">
            <Ripple />
            <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
                <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                    <div className="space-y-3 sm:space-y-2">
                        <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / {new Date().getFullYear()}</div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                            Maxi
                            <br />
                            <span className="text-muted-foreground">Schäfer</span>
                        </h1>
                    </div>

                    <div className="space-y-6 max-w-md">
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                            Fullstack Developer building end-to-end digital solutions at the intersection of
                            <span className="text-foreground"> design</span>,<span className="text-foreground"> technology</span>,
                            and
                            <span className="text-foreground"> user experience</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">

                                    <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-green-500")}/>
                                    <span className={cn("relative inline-flex h-2 w-2 rounded-full bg-green-500")}/>
                                </span>
                                Available for work
                            </div>
                            <div className='font-mono'>📍 Germany</div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
                    <div className="space-y-4">
                        <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                        <div className="space-y-2">
                            <div className="text-foreground">Trainee IT specialist system integration</div>
                            <div className="text-muted-foreground">@ CampusLan Software GmbH</div>
                            <div className="text-xs text-muted-foreground">2024 - Present</div>
                        </div>
                    </div>

                    <SpotifyNowPlayingContainer />
                </div>

            </div>
        </header>
    )
}
