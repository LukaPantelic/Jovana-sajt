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
  FaBars,
  FaTimes,
  FaGlobe 
} from 'react-icons/fa'
import { useLanguage } from '@/app/contexts/LanguageContext'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const languages = [
    { code: 'sr', name: 'Srpski', flag: '🇷🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ]

  const navLinks = [
    { href: '/', label: t('nav.home'), icon: FaHome, active: pathname === '/' },
    { href: '/gallery', label: t('nav.gallery'), icon: FaImages, active: pathname === '/gallery' },
    // { href: '/about', label: t('nav.about'), icon: FaUser, active: pathname === '/about' },
    // { href: '/contact', label: t('nav.contact'), icon: FaEnvelope, active: pathname === '/contact' }
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" onClick={closeMenu}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              F
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              {t('footer.brand')}
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors p-2 rounded-lg hover:bg-gray-100"
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
                        setLanguage(lang.code as any)
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

            {/* Desktop Navigacija */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`nav-link flex items-center space-x-2 ${
                      link.active 
                        ? 'text-blue-600 font-semibold' 
                        : 'text-gray-600 hover:text-blue-500'
                    }`}
                  >
                    <IconComponent size={16} />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Hamburger Menu */}
            <button
              className="md:hidden flex flex-col space-y-1.5 w-6 h-6 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col space-y-4 pb-4 border-t border-gray-200 pt-4">
            {navLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`nav-link flex items-center space-x-3 text-lg ${
                    link.active 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-gray-600 hover:text-blue-500'
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