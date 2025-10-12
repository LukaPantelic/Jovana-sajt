// components/Lightbox.tsx
'use client'

import { useEffect } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Image from 'next/image'

interface ImageType {
  id: number
  src: string
  alt: string
  category: string
}

interface LightboxProps {
  images: ImageType[]
  currentImageIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function Lightbox({ 
  images, 
  currentImageIndex, 
  isOpen, 
  onClose, 
  onNext, 
  onPrev 
}: LightboxProps) {
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch(e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrev()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen) return null

  const currentImage = images[currentImageIndex]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
      >
        <FaTimes size={28} />
      </button>

      {/* Navigation Arrows */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors p-3"
        disabled={currentImageIndex === 0}
      >
        <FaChevronLeft size={24} />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors p-3"
        disabled={currentImageIndex === images.length - 1}
      >
        <FaChevronRight size={24} />
      </button>

      {/* Image Container */}
      <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center p-4">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Image Info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-white text-center">
        <p className="text-lg font-semibold">{currentImage.category}</p>
        <p className="text-sm opacity-80">{currentImage.alt}</p>
        <p className="text-sm opacity-60 mt-1">
          {currentImageIndex + 1} / {images.length}
        </p>
      </div>

      {/* Thumbnail Strip (Optional) */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2 max-w-full overflow-x-auto px-4 py-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => {
              // Možeš da dodaš funkciju za skok na određenu sliku
              // setCurrentImageIndex(index)
            }}
            className={`flex-shrink-0 w-12 h-12 relative border-2 ${
              index === currentImageIndex ? 'border-white' : 'border-transparent'
            } rounded overflow-hidden`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}