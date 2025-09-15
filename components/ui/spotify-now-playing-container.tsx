"use client";

import useSWR from "swr";
import { SpotifyNowPlaying } from "./spotify-now-playing";
import { AnimatePresence, motion } from 'motion/react'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function SpotifyNowPlayingContainer() {
  const { data, isLoading } = useSWR("/api/spotify", fetcher, { refreshInterval: 3000 });

  if (isLoading) return null;

  return (
    <AnimatePresence>
      {data?.track && (
        <motion.div
          key="spotify-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpotifyNowPlaying
            isPlaying={data.isPlaying}
            track={data.track}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
