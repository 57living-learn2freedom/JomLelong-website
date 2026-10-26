/**
 * Cross-browser Fullscreen API helper for <video> elements.
 */
export function requestVideoFullscreen(video: HTMLVideoElement): void {
  if (video.requestFullscreen) {
    void video.requestFullscreen();
    return;
  }

  const webkitVideo = video as HTMLVideoElement & {
    webkitRequestFullscreen?: () => void;
  };
  if (webkitVideo.webkitRequestFullscreen) {
    webkitVideo.webkitRequestFullscreen();
    return;
  }

  const msVideo = video as HTMLVideoElement & {
    msRequestFullscreen?: () => void;
  };
  if (msVideo.msRequestFullscreen) {
    msVideo.msRequestFullscreen();
  }
}
