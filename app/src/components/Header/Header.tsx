// components/Header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaHome, 
  FaImages,  
} from 'react-icons/fa'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Navigacioni linkovi sa ikonama
  const navLinks = [
    {
      href: '/',
      label: 'Početna',
      icon: FaHome,
      active: pathname === '/'
    },
    {
      href: '/gallery',
      label: 'Galerija', 
      icon: FaImages,
      active: pathname === '/gallery'
    },
    // {
    //   href: '/about',
    //   label: 'O Meni',
    //   icon: FaUser,
    //   active: pathname === '/about'
    // },
    // {
    //   href: '/contact',
    //   label: 'Kontakt',
    //   icon: FaEnvelope,
    //   active: pathname === '/contact'
    // }
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3"
            onClick={closeMenu}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              Jolline digitalart
            </span>
          </Link>

          {/* Desktop Navigacija */}
          <div className="hidden md:flex space-x-8">
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

          {/* Hamburger Menu Button - za mobile */}
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