// components/HeroSlider.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ContactModal from '../ContactModal/ContactModal'
import { useLanguage } from '@/app/contexts/LanguageContext'

const sliderImages = [
  {
    id: 1,
    src: "/images/hero/A_D_1.jpg",
    alt: "Profesionalni portret",
  },
  {
    id: 2,
    src: "/images/hero/A_D_2.jpg",
    alt: "Venčanje u prirodi",
  },
  {
    id: 3,
    src: "/images/hero/A_D_3.jpg",
    alt: "Venčanje u prirodi",
  },
  {
    id: 4,
    src: "/images/hero/DSC_7636.jpg",
    alt: "Venčanje u prirodi",
  },
  {
    id: 5,
    src: "/images/hero/DSC_7679.jpg",
    alt: "Venčanje u prirodi",
  },
  {
    id: 6,
    src: "/images/hero/DSC_7700.jpg",
    alt: "Venčanje u prirodi",
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

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
              className="w-full h-full object-cover brightness-50"
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
            {/* <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              {t('hero.description')}
            </p> */}
            <div className="space-x-4">
              {/* <Link 
                href="/gallery" 
                className="bg-white text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-block"
              >
                {t('hero.galleryBtn')}
              </Link> */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-800 transition-colors font-semibold text-lg inline-block"
              >
                {t('hero.contactBtn')}
              </button>
            </div>
          </div>
        </div>

        {/* Navigacione strelice - OVO JE BILO FALILO! */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all hover:scale-110"
          aria-label="Prethodna slika"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all hover:scale-110"
          aria-label="Sledeća slika"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Tačkice - OVO JE BILO FALILO! */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex space-x-3">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75 hover:scale-110'
              }`}
              aria-label={`Idi na sliku ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}