"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface SpotifyNowPlayingProps {
  isPlaying: boolean;
  track?: {
    title: string;
    artist: string;
    albumArtUrl: string;
    songUrl: string;
  };
}

export function SpotifyNowPlaying({ isPlaying, track }: SpotifyNowPlayingProps) {
  if (!track) return null;

  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-lg border border-border p-4 flex items-center gap-4 bg-card/80 backdrop-blur-md hover:bg-card/40 transition-colors"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={track.songUrl} // triggers animation when track changes
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={track.albumArtUrl}
            alt={track.title}
            width={64}
            height={64}
            className="rounded-md shadow-sm"
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col overflow-hidden">
        <div className="text-sm text-muted-foreground font-mono mb-1">
          {isPlaying ? "NOW PLAYING" : "LAST LISTENED"}
        </div>
        <div className="font-medium truncate group-hover:underline">{track.title}</div>
        <div className="text-sm text-muted-foreground truncate">{track.artist}</div>
      </div>

      {isPlaying && (
        <div className="ml-auto flex items-center gap-1">
          <span className={cn("inline-block rounded-md w-1 h-3 bg-green-500 animate-[bounce_1s_infinite]")} />
          <span className={cn("inline-block rounded-md w-1 h-3 bg-green-500 animate-[bounce_1s_infinite_200ms]")} />
          <span className={cn("inline-block rounded-md w-1 h-3 bg-green-500 animate-[bounce_1s_infinite_400ms]")} />
        </div>
      )}
    </a>
  );
}
