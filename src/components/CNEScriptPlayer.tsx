import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import useStore from "../store";

type Player = {
  currentTime: (t?: number) => number;
  currentVideo: () => any; // You can replace 'any' with the actual video type if known
  dispose: () => void;
  duration: () => number;
  getCuePoints: () => any[]; // If cue points have a more specific structure, define it here
  isInterlude: () => boolean;
  isLoading: () => boolean;
  isMuted: () => boolean;
  isPlaying: () => boolean;
  isPlaylist: () => boolean;
  load: (t?: any) => void;
  off: (event: string, handler: Function) => void;
  on: (event: string, handler: Function) => void;
  pause: () => void;
  play: () => void;
  setAdKeyValues: (keyValues?: any) => void;
  setNextVideo: (video: any) => void;
  volume: (t?: number) => number;
  _markCurrentlySticky: (t?: any) => void;
  _markPersistent: (t?: any) => void;
  _onConsentUpdated: (t?: any) => void;
  _overrideAutoplay: (r?: any, n?: any) => void;
  _requestCancelPersist: () => void;
  _trackCNESparrow: (t?: any, r?: any) => void;
  _trackPlayOnPage: () => void;
};

// Extend the Window interface to include `onPlayerReady`
declare global {
  interface Window {
    onPlayerReady?: (player: Player) => void;
  }
}

type CNEScriptPlayerProps = {
  videoId: string;
  /**
   *
   * **CNE Video Player Options**
   * ----------------------------
   *
   * Use the params below to configure the player and video playback behavior. For the script embed, simply include desired key/value pairs in the script url. **All params below are optional**. When in doubt, leave out the option for default behavior.
   *
   * | **Option Name (required)** | **Values (Default)** | **Description** |
   * | -------------------------- | --------------------- | --------------- |
   * | `aspectRatio` | WxH String (`16x9`) | Determines the player and its container's width and height. |
   * | `autoplay` | true/false (`true`) | The video should start playing when: <br>1. The player has loaded<br>2. A specified amount of the player is in the viewport |
   * | `adsDisabled` | true/false (`false`) | Disable all ads. Please don't override the default unless absolutely necessary. |
   * | `continuousPlay` | true/false (`true`) | After a video ends, continue to the next video instead of stopping the player. If the video is in a series, the next video is based on the ordering specified in Admin. Otherwise a related content algorithm is used to determine the next video. |
   * | `hasAnimatedThumb` | true/false (`true`) | The player should use the 5s animated clip for thumbnails and poster frames. |
   * | `hideHoverTitle` | true/false (`false`) | Don't show the title when the user mouses over the player. Useful for small players and customizations. |
   * | `hidePosterTitle` | true/false (`false`) | Don't overlay the title on the poster frame. |
   * | `loopVideo` | true/false (`false`) | After the the video is done, keep replaying it indefinitely instead. To play a video once, then stop, set `continuousPlay` false. If instead you want to continue playing different videos indefinitely, set `continuousPlay` true. |
   * | `muted` | true/false (`true`) | Determines whether or not the video starts muted (this may be overridden by the last user selection, which is stored in a cookie). |
   */
  queryParameters?: string;
  containerClass?: string;
  style?: CSSProperties;
};

export default function CNEScriptPlayer({
  videoId,
  queryParameters,
  containerClass,
  style,
}: CNEScriptPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const setCurrentTime = useStore((state) => state.setCurrentTime); // Get the setter from Zustand

  const onPlayerReady = (player: Player) => {
    console.log("Player is ready:", player);

    // Function to log and update current time if the video is playing
    const logCurrentTime = () => {
      if (player.isPlaying()) {
        // Check if the video is playing
        const timeInMilliseconds = player.currentTime() / 1000;
        setCurrentTime(timeInMilliseconds); // Update state
      }
      // Call this function again for the next frame
      requestAnimationFrame(logCurrentTime);
    };

    // Start the update loop
    requestAnimationFrame(logCurrentTime);

    // Clear the loop when the player is disposed or unmounted
    player.on("dispose", () => {
      setCurrentTime(0); // Clear the current time
    });
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && videoId) {
      videoElement.innerHTML = ""; // Clear any previous script
      const script = document.createElement("script");
      script.async = true;
      script.src = `//player.cnevids.com/script/video/${videoId}.js?${queryParameters}`;
      script.onload = () => console.log("Script loaded successfully.");
      script.onerror = (error) =>
        console.error("Failed to load the script.", error);
      videoElement.appendChild(script);
      window.onPlayerReady = onPlayerReady;

      return () => {
        if (videoElement) {
          videoElement.removeChild(script);
        }
        delete window.onPlayerReady;
      };
    }
  }, [videoId, queryParameters]);

  return <div ref={videoRef} className={containerClass} style={style} />;
}
