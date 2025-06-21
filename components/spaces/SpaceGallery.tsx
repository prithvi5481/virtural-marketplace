// components/spaces/SpaceGallery.tsx
'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SpaceGalleryProps {
  images: string[];
}

export default function SpaceGallery({ images }: SpaceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setSelectedImage((prev) => (prev + 1) % images.length);
        setIsLoading(true);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
        setIsLoading(true);
      } else if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  const handleNext = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
    setIsLoading(true);
  };

  const handlePrev = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    setIsLoading(true);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 relative group">
      {/* Main Image with Zoom Controls */}
      <div
        ref={imageRef}
        className={`aspect-video relative bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 ${
          isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={toggleZoom}
      >
        {isLoading && (
          <Skeleton className="absolute inset-0 rounded-lg" />
        )}
        <Image
          src={images[selectedImage]}
          alt={`Space image ${selectedImage + 1}`}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${isZoomed ? 'object-contain bg-white' : 'object-cover'}`}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          onLoadingComplete={() => setIsLoading(false)}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Zoom Control */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          className="absolute bottom-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
          aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
        >
          {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
        </button>
      </div>

      {/* Thumbnail Grid with Swipe Support */}
      {images.length > 1 && (
        <div className="relative">
          <div className="grid grid-cols-4 gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(index);
                  setIsLoading(true);
                }}
                className={`aspect-square relative rounded overflow-hidden transition-all ${
                  selectedImage === index
                    ? 'ring-2 ring-blue-500 scale-105'
                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 200px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}