// contexts/LanguageContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'sr' | 'en' | 'de'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Učitaj prevode
const translations: Record<Language, any> = {
  sr: require('../locales/sr/common.json'),
  en: require('../locales/en/common.json'),
  de: require('../locales/de/common.json')
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('sr')

  // Učitaj jezik iz localStorage pri učitavanju
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['sr', 'en', 'de'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Sačuvaj jezik u localStorage pri promeni
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // Funkcija za prevod
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key // Vrati key ako prevod ne postoji
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}