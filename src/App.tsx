import { AnimatePresence } from "framer-motion";
import CNEScriptPlayer from "./components/CNEScriptPlayer";
import Card from "./components/Card";
import useStore from "./store";
import Image50s from "./images/50s.jpg";
import Image90s from "./images/90s.jpg";
import Image60s from "./images/60s.jpg";

const erasText = [
  {
    title: "Here’s Where to Shop Madelyn Cline’s Favorite Pre-Loved Finds",
    description:
      "What defines an eternal era of fashion? Timeless clothing? A classic accessory? All of the above. Though the ultimate philosophy behind forever style lies in how we take these pieces from the past and translate them into present times.",
  },
  {
    imgSrc: Image90s,
    imgAlt: "A stylish 90s outfit",
    title: "A Simpler Line",
    description:
      "The ’90s babe has always been eternally cool. Now, Cline gives the minimalist look an elevated edge with her new collection.",
    link: "https://www.vogue.com/sponsored/article/heres-where-to-shop-celebrity-favorite-pre-loved-finds",
  },
  {
    imgSrc: Image50s,
    imgAlt: "A stylish 50s outfit",
    title: "The New-New Look",
    description:
      "The New Look of the ’50s is very much alive thanks to its sensual silhouettes and updates.",
    link: "https://www.vogue.com/sponsored/article/heres-where-to-shop-celebrity-favorite-pre-loved-finds",
  },
  {
    imgSrc: Image60s,
    imgAlt: "A stylish 60s outfit",
    title: "Keep It Short",
    description:
      "Enter the mod movement of the ’60s, known for tiny hemlines, kicky footwear, and ample attitude.",
    link: "https://www.vogue.com/sponsored/article/heres-where-to-shop-celebrity-favorite-pre-loved-finds",
  },
];

function App() {
  const { currentTime, currentEra } = useStore();
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex-grow px-10">
          <h1 className="p-5 text-center text-3xl">CNÉPlayer Time Trigger</h1>
          <CNEScriptPlayer
            videoId="66450dc358c07122ce720954"
            queryParameters="autoplay=1&onReady=onPlayerReady&muted=1&adsDisabled=1&continuousPlay=0&hideHoverTitle=1&hidePosterTitle=1&loopVideo=1"
            containerClass="mx-auto aspect-video overflow-hidden rounded-3xl"
          />
          <div className="p-5">
            <p className="flex justify-between">
              <span className="w-[240px]">
                <span className="font-bold">Current Time:</span>{" "}
                {Math.floor(currentTime)} seconds
              </span>
              <span>
                <span className="font-bold">Current Era:</span> {currentEra}
              </span>
              <span>
                <span className="font-bold">Trigger times:</span> 0, 45, 63, 94
              </span>
            </p>
          </div>
        </div>
        <div className="relative flex h-full w-[360px] flex-col items-center justify-center border-l-2 border-gray-300">
          <AnimatePresence initial={false}>
            {currentEra > -1 && (
              <Card
                key={currentEra}
                imgSrc={erasText[currentEra].imgSrc}
                imgAlt={erasText[currentEra].imgAlt}
                title={erasText[currentEra].title}
                description={erasText[currentEra].description}
                link={erasText[currentEra].link}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default App;
