/**
 * =============================================================================
 * VIDEO CAROUSEL — DATA CONFIGURATION
 * =============================================================================
 * Populated from Google Sheet via n8n.
 * =============================================================================
 */

export function hasDetailsUrl(detailsUrl: string): boolean {
  return detailsUrl.trim().length > 0;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  posterSrc: string;
  videoSrc: string;
  detailsUrl: string;
}

export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: "video-1",
    title: "Rumah lelong mesti buruk ke?",
    description: "Jom unbox rumah lelong \"BURUK\"!",
    posterSrc: "https://drive.google.com/thumbnail?id=1v93Es6xCnxsjJv9Npbm0-xLjmS7RS7Lo&sz=w1200",
    videoSrc: "https://drive.google.com/uc?export=download&id=1dMT31RRuHYSk8HpVo6RM0dZGvC3GFsxt",
    detailsUrl: "",
  },
  {
    id: "video-2",
    title: "Beli lelong tapi terlepas step ni terus rugi RM100k!",
    description: "i dedahkan rahsia mistake pembeli rumah lelong",
    posterSrc: "https://drive.google.com/thumbnail?id=1v93Es6xCnxsjJv9Npbm0-xLjmS7RS7Lo&sz=w1200",
    videoSrc: "https://drive.google.com/uc?export=download&id=1GuxJ_j2ZoZawd7-q3HQdQDz6RkU60E7U",
    detailsUrl: "",
  },
  {
    id: "video-3",
    title: "Cara baca POS lelong",
    description: "Tips membaca Perisytiharan Jualan",
    posterSrc: "https://drive.google.com/thumbnail?id=1BlBrCtV59ZBw_gXVi1n6tgyiPPk7c_g4&sz=w1200",
    videoSrc: "https://drive.google.com/uc?export=download&id=13oMVeLyG5iLOHOkDKTnTeM6b9okOgxKM",
    detailsUrl: "",
  }
];
