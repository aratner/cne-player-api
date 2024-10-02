import { useEffect } from "react";

const useScript = (url) => {
  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${url}"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [url]);
};

export default function CNEScriptPlayer() {
  const videoId = "65e989a84e967561ce6f563f";
  const params = {
    target: "player-div",
    autoplay: 1,
    aspectRatio: "16x9",
    adsDisabled: false,
    continuousPlay: false,
    hideHoverTitle: true,
    loopVideo: true,
    muted: true,
  };

  const url = `//player.cnevids.com/inline/video/${videoId}.js?${new URLSearchParams(
    params,
  )}`;

  useScript(url);

  return (
    <div
      className="mx-auto aspect-video w-3/4 overflow-hidden rounded-3xl"
      id="player-div"
    />
  );
}
