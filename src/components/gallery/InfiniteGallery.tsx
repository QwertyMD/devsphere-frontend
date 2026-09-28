import { useMemo } from 'react';
import GalleryItem from './GalleryItem';

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=560&h=448&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=560&h=448&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=560&h=448&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=560&h=448&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=560&h=448&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=560&h=448&fit=crop&auto=format',
];

const ROTATIONS = [2.4, -2.1, 1.6, -1.8, 2.8, -2.6];

const InfiniteGallery = () => {
  const items = useMemo(
    () =>
      GALLERY_IMAGES.map((src, i) => ({
        src,
        rotation: ROTATIONS[i % ROTATIONS.length],
        alt: `Community moment ${i + 1}`,
      })),
    []
  );

  return (
    <div className="group relative w-full overflow-hidden pb-12">
      <div aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-slate-900" />
      <div className="animate-marquee flex w-max items-start pt-6 group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-start">
            {items.map((item, index) => (
              <GalleryItem
                key={`${copy}-${index}`}
                imageSrc={item.src}
                altText={copy === 0 ? item.alt : ''}
                rotation={item.rotation}
              />
            ))}
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent"
      />
    </div>
  );
};

export default InfiniteGallery;
