import { motion } from "framer-motion";

type CardProps = {
  imgSrc?: string; // URL for the image source
  imgAlt?: string; // Alternative text for the image
  title: string; // Title of the card
  description: string; // Description of the card
  link?: string; // URL for the link
};

export default function Card({
  imgSrc,
  imgAlt,
  title,
  description,
  link,
}: CardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // transition={{ duration: 0.5 }}
      className="absolute w-full px-10"
    >
      {imgSrc && (
        <div className="aspect-[278/371] h-auto w-full overflow-hidden rounded-3xl">
          <img
            width={278}
            height={371}
            className="h-full w-full object-cover"
            src={imgSrc}
            alt={imgAlt}
          />
        </div>
      )}
      <h2 className="pb-4 pt-8 text-center font-serif text-2xl">{title}</h2>
      <p className="pb-4 text-center text-sm">{description}</p>
      {link && (
        <a
          href={link}
          className="mx-auto block w-28 bg-black px-4 py-2 text-center font-mono text-sm font-bold text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          SHOP NOW
        </a>
      )}
    </motion.div>
  );
}
