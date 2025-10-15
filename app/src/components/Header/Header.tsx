// components/Header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaHome, 
  FaImages, 
  FaUser, 
  FaEnvelope,
  FaGlobe 
} from 'react-icons/fa'
import { useLanguage } from '@/app/contexts/LanguageContext'
import Image from 'next/image'

// Tip za jezik
interface LanguageOption {
  code: 'sr' | 'en' | 'de'
  name: string
  flag: string
}

// Tip za navigacioni link
interface NavLink {
  href: string
  label: string
  icon: React.ComponentType<{ size?: number }>
  active: boolean
}

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Proveri da li smo na početnoj stranici
  const isHomePage = pathname === '/'

  const languages: LanguageOption[] = [
    { code: 'sr', name: 'Srpski', flag: '🇷🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ]

  // Linkovi sa LEVE strane
  const leftNavLinks: NavLink[] = [
    { href: '/', label: t('nav.home'), icon: FaHome, active: pathname === '/' },
    { href: '/gallery', label: t('nav.gallery'), icon: FaImages, active: pathname === '/gallery' },
  ]

  // Linkovi sa DESNE strane
  const rightNavLinks: NavLink[] = [
    { href: '/about', label: t('nav.about'), icon: FaUser, active: pathname === '/about' },
    { href: '/contact', label: t('nav.contact'), icon: FaEnvelope, active: pathname === '/contact' }
  ]

  // Dinamičke klase bazirane na ruti
  const headerClasses = isHomePage 
    ? "bg-transparent absolute top-0 left-0 right-0 z-50" 
    : "bg-white shadow-sm border-b border-gray-200"

  const textColorClasses = isHomePage 
    ? "text-white hover:text-gray-200" 
    : "text-gray-600 hover:text-blue-500"

  const activeTextColorClasses = isHomePage 
    ? "text-white font-semibold" 
    : "text-blue-600 font-semibold"

  const hamburgerColor = isHomePage ? "bg-white" : "bg-gray-600"
  const mobileMenuBorder = isHomePage ? "border-t border-white/30" : "border-t border-gray-200"

  return (
    <header className={headerClasses}>
      <nav className="container mx-auto items-center">
        <div className="flex items-center space-x-20 justify-center">
          
          {/* LEVA STRANA */}
          <div className="hidden md:flex space-x-6">
            {leftNavLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`nav-link flex items-center space-x-2 ${
                    link.active 
                      ? activeTextColorClasses 
                      : textColorClasses
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* SREDINA - Logo */}
          <div className="flex justify-center">
            <Link 
              href="/" 
              className="flex items-center"
              onClick={closeMenu}
            >
              <div className="relative w-[100px] h-[100px]">
                <Image
                  src="/images/hero/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* DESNA STRANA */}
          <div className="flex items-center space-x-4">
            {/* Desktop navigacija - desni linkovi */}
            <div className="hidden md:flex space-x-6">
              {rightNavLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`nav-link flex items-center space-x-2 ${
                      link.active 
                        ? activeTextColorClasses 
                        : textColorClasses
                    }`}
                  >
                    <IconComponent size={16} />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className={`flex items-center space-x-2 transition-colors p-2 rounded-lg hover:bg-gray-100 ${
                  isHomePage 
                    ? "text-white hover:text-gray-200 hover:bg-white/10" 
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                <FaGlobe size={16} />
                <span className="hidden sm:inline">{language.toUpperCase()}</span>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setIsLanguageOpen(false)
                      }}
                      className={`flex items-center space-x-3 w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      } first:rounded-t-lg last:rounded-b-lg`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger Menu */}
            <button
              className="md:hidden flex flex-col space-y-1.5 w-6 h-6 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              } ${hamburgerColor}`}></span>
              <span className={`block w-6 h-0.5 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              } ${hamburgerColor}`}></span>
              <span className={`block w-6 h-0.5 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              } ${hamburgerColor}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className={`flex flex-col space-y-4 pb-4 pt-4 ${mobileMenuBorder}`}>
            {[...leftNavLinks, ...rightNavLinks].map((link) => {
              const IconComponent = link.icon
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`nav-link flex items-center space-x-3 text-lg ${
                    link.active 
                      ? activeTextColorClasses 
                      : textColorClasses
                  }`}
                  onClick={closeMenu}
                >
                  <IconComponent size={18} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}