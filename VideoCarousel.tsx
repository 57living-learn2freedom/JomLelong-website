"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import VideoCard from "./VideoCard";
import { VIDEO_ITEMS } from "@/lib/videos";

function getCardsPerPage(width: number): number {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

function chunkItems<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

/**
 * VideoCarousel
 *
 * • Desktop (lg+): 3 cards per page
 * • Tablet (md):   2 cards per page
 * • Mobile:        1 card per page
 *
 * Playback: hover a card to play; mouse leave pauses that card.
 * Slide media/links configured in lib/videos.ts.
 */
export default function VideoCarousel() {
  const [activePage, setActivePage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  const pages = useMemo(
    () => chunkItems(VIDEO_ITEMS, cardsPerPage),
    [cardsPerPage]
  );
  const totalPages = pages.length;

  const setVideoRef = useCallback(
    (index: number) => (el: HTMLVideoElement | null) => {
      videoRefs.current[index] = el;
    },
    []
  );

  const playOnly = useCallback((targetIndex: number) => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === targetIndex) {
        void el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, []);

  const pauseCard = useCallback((index: number) => {
    const el = videoRefs.current[index];
    if (!el) return;
    el.pause();
  }, []);

  useEffect(() => {
    function handleResize() {
      const next = getCardsPerPage(window.innerWidth);
      setCardsPerPage((prev) => {
        if (prev !== next) setActivePage(0);
        return next;
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (activePage >= totalPages && totalPages > 0) {
      setActivePage(totalPages - 1);
    }
  }, [activePage, totalPages]);

  const goToPage = useCallback(
    (page: number) => {
      if (totalPages === 0) return;
      const wrapped = ((page % totalPages) + totalPages) % totalPages;
      setActivePage(wrapped);
    },
    [totalPages]
  );

  const goPrev = () => goToPage(activePage - 1);
  const goNext = () => goToPage(activePage + 1);

  function handleCardHover(index: number) {
    playOnly(index);
  }

  function handleCardLeave(index: number) {
    pauseCard(index);
  }

  if (VIDEO_ITEMS.length === 0) return null;

  return (
    <section
      id="video-carousel"
      className="bg-zinc-50 py-12 sm:py-16"
      aria-label="Property video carousel"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-2">
          <PlayCircle className="h-5 w-5 text-red-700" />
          <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
            Property Video
          </h2>
        </div>

        <div className="relative px-8 sm:px-0" ref={carouselTrackRef}>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous page"
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-md transition-colors hover:border-red-300 hover:text-red-700 sm:-left-5 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next page"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-md transition-colors hover:border-red-300 hover:text-red-700 sm:-right-5 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activePage * 100}%)` }}
            >
              {pages.map((pageItems, pageIndex) => (
                <div
                  key={pageIndex}
                  className="grid w-full shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
                >
                  {pageItems.map((video) => {
                    const globalIndex = VIDEO_ITEMS.findIndex(
                      (v) => v.id === video.id
                    );
                    return (
                      <VideoCard
                        key={video.id}
                        video={video}
                        index={globalIndex}
                        videoRef={setVideoRef(globalIndex)}
                        onMouseEnterCard={handleCardHover}
                        onMouseLeaveCard={handleCardLeave}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-6 flex items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Video carousel pagination"
        >
          {pages.map((_, pageIndex) => {
            const isActive = pageIndex === activePage;
            return (
              <button
                key={pageIndex}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to page ${pageIndex + 1}`}
                onClick={() => goToPage(pageIndex)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "scale-110 bg-red-700"
                    : "border border-zinc-400 bg-transparent opacity-50 hover:opacity-80"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
