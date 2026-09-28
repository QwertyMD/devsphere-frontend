interface GalleryItemProps {
  imageSrc: string;
  altText: string;
  rotation?: number;
}

const GalleryItem = ({ imageSrc, altText, rotation = 0 }: GalleryItemProps) => {
  return (
    <figure
      className="relative mx-4 w-56 shrink-0 rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-14px_rgba(15,23,42,0.35)] md:w-64"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <span
        aria-hidden
        className="absolute -top-6 left-1/2 z-10 h-7 w-2.5 -translate-x-1/2 rounded-[2px] bg-red-700 shadow-md"
      />
      <div className="overflow-hidden rounded-lg bg-slate-100">
        <img
          src={imageSrc}
          alt={altText}
          loading="lazy"
          className="aspect-[5/4] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </figure>
  );
};

export default GalleryItem;
