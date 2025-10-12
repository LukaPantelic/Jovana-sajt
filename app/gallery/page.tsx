// app/gallery/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from '../src/components/LightBox/Lightbox'

// Podaci o slikama
const galleryImages = [
  {
    id: 1,
    src: "/images/hero/Slika_1_jovana.png",
    alt: "Profesionalni portret",
    category: "Portreti"
  },
  {
    id: 2,
    src: "/images/hero/Slika_2_jovana.png",
    alt: "Venčanje u prirodi",
    category: "Venčanja"
  },
  {
    id: 3,
    src: "/images/hero/Slika_3_jovana.png",
    alt: "Porodična fotografija",
    category: "Porodica"
  },
  {
    id: 4,
    src: "/images/hero/Slika_1_jovana.png",
    alt: "Pejzažna fotografija",
    category: "Priroda"
  },
  {
    id: 5,
    src: "/images/hero/Slika_1_jovana.png",
    alt: "Gradska fotografija",
    category: "Urban"
  },
  {
    id: 6,
    src: "/images/hero/Slika_1_jovana.png",
    alt: "Crno-bela fotografija",
    category: "Portreti"
  },
  {
    id: 7,
    src: "/images/hero/Slika_1_jovana.png",
    alt: "Proslava",
    category: "Događaji"
  },
  {
    id: 8,
    src: "/images/hero/Slika_1_jovana.png",
    alt: "Noćna fotografija",
    category: "Urban"
  },
  {
    id: 9,
    src: "/images/hero/Slika_1_jovana.png",
    alt: "Apsrtaktna fotografija",
    category: "Umjetnost"
  }
]

const categories = ['Sve', 'Portreti', 'Venčanja', 'Porodica', 'Priroda', 'Urban', 'Događaji', 'Umjetnost']

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Sve')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredImages = activeCategory === 'Sve' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeCategory)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    // Disable body scroll when lightbox is open
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    // Enable body scroll
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    )
  }

  return (
    <>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Moja Galerija</h1>
        <p className="text-center text-gray-600 mb-12">Pogledajte moje najbolje radove</p>
        
        {/* Filter kategorija */}
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Galerija slika */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={500}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold">{image.category}</h3>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.alt}
                  </p>
                </div>
              </div>
              
              {/* Zoom Icon on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black bg-opacity-50 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <p className="text-center text-gray-500 mt-8">Nema slika u ovoj kategoriji.</p>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentImageIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  )
}