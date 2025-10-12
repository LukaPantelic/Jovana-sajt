// components/HeroSlider.tsx - OSTAJE ISTI
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ContactModal from '../ContactModal/ContactModal'
import { useLanguage } from '@/app/contexts/LanguageContext'

const sliderImages = [
  {
    id: 1,
    src: "/images/hero/Slika_1_jovana.png",
    alt: "Profesionalni portret",
  },
  {
    id: 2,
    src: "/images/hero/Slika_2_jovana.png",
    alt: "Venčanje u prirodi",
  },
  {
    id: 3,
    src: "/images/hero/Slika_3_jovana.png",
    alt: "Porodična fotografija",
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <section className="relative h-screen overflow-hidden bg-gray-900">
        {/* Slike */}
        {sliderImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-20"></div>
        
        {/* Tekst */}
        <div className="relative z-30 flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="space-x-4">
              <Link 
                href="/gallery" 
                className="bg-white text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-block"
              >
                {t('hero.galleryBtn')}
              </Link>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-800 transition-colors font-semibold text-lg inline-block"
              >
                {t('hero.contactBtn')}
              </button>
            </div>
          </div>
        </div>

        {/* Navigacija i tačkice ostaju isti */}
      </section>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}