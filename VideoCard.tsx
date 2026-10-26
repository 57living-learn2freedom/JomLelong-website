"use client";

import { useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { Maximize } from "lucide-react";
import { hasDetailsUrl, type VideoItem } from "@/lib/videos";
import { toPlaybackUrl } from "@/lib/video-url";
import { requestVideoFullscreen } from "@/lib/fullscreen";

interface VideoCardProps {
  video: VideoItem;
  index: number;
  videoRef: (el: HTMLVideoElement | null) => void;
  onMouseEnterCard: (index: number) => void;
  onMouseLeaveCard: (index: number) => void;
}

function waitForCanPlay(video: HTMLVideoElement): Promise<void> {
  if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const onCanPlay = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error("Video failed to load"));
    };
    const cleanup = () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.load();
  });
}

export default function VideoCard({
  video,
  index,
  videoRef,
  onMouseEnterCard,
  onMouseLeaveCard,
}: VideoCardProps) {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const playbackSrc = useMemo(
    () => toPlaybackUrl(video.videoSrc),
    [video.videoSrc]
  );
  const isClickable = hasDetailsUrl(video.detailsUrl);

  function assignRef(el: HTMLVideoElement | null) {
    localVideoRef.current = el;
    videoRef(el);
  }

  async function playVideo() {
    const el = localVideoRef.current;
    if (!el) return;

    setIsLoading(true);
    try {
      await waitForCanPlay(el);
      await el.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }

  function pauseVideo() {
    const el = localVideoRef.current;
    if (!el) return;
    el.pause();
    setIsPlaying(false);
    setIsLoading(false);
  }

  function handleMouseEnter() {
    onMouseEnterCard(index);
    void playVideo();
  }

  function handleMouseLeave() {
    onMouseLeaveCard(index);
    pauseVideo();
  }

  function handleCardClick() {
    if (!isClickable || !video.detailsUrl) return;
    window.open(video.detailsUrl, "_blank", "noopener,noreferrer");
  }

  function handleFullscreenClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();

    if (localVideoRef.current) {
      requestVideoFullscreen(localVideoRef.current);
    }
  }

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? handleCardClick : undefined}
      onKeyDown={
        isClickable
          ? (e: KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardClick();
              }
            }
          : undefined
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative aspect-video w-full overflow-hidden rounded-lg bg-black ${isClickable ? "cursor-pointer" : "cursor-default"}`}
      aria-label={`Watch: ${video.title}`}
    >
      <video
        ref={assignRef}
        data-video-index={index}
        className="h-full w-full object-contain"
        poster={video.posterSrc}
        src={playbackSrc}
        muted
        playsInline
        loop
        preload="metadata"
      />

      {!isPlaying && (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${video.posterSrc})` }}
          aria-hidden
        />
      )}

      {isLoading && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-1/2 flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-5">
        <h3 className="pr-10 text-base font-bold text-white sm:text-lg">
          {video.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-300">
          {video.description}
        </p>

        <button
          type="button"
          onClick={handleFullscreenClick}
          className="pointer-events-auto absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded text-white/90 transition-colors hover:bg-white/20 hover:text-white sm:bottom-5 sm:right-5"
          aria-label={`Fullscreen: ${video.title}`}
        >
          <Maximize className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
