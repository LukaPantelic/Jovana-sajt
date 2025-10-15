// contexts/LanguageContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Uvoz prevoda koristeći ES6 import
import commonSR from '../locales/sr/common.json'
import commonEN from '../locales/en/common.json'
import commonDE from '../locales/de/common.json'

// Tipovi
type Language = 'sr' | 'en' | 'de'

// Manje striktan tip za prevode
type TranslationValue = string | { [key: string]: TranslationValue }
type Translations = Record<string, TranslationValue>

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Mapiranje jezika na prevode
const translations: Record<Language, Translations> = {
  sr: commonSR,
  en: commonEN,
  de: commonDE
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('de')

  // Učitaj jezik iz localStorage pri učitavanju
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'sr' || savedLanguage === 'en' || savedLanguage === 'de')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Sačuvaj jezik u localStorage pri promeni
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // Rekurzivna funkcija za prevod
  const t = (key: string): string => {
    const keys = key.split('.')
    
    const getNestedValue = (obj: TranslationValue, keyParts: string[]): string => {
      if (keyParts.length === 0) {
        return typeof obj === 'string' ? obj : key
      }
      
      const currentKey = keyParts[0]
      if (typeof obj === 'object' && obj !== null && currentKey in obj) {
        return getNestedValue(obj[currentKey], keyParts.slice(1))
      }
      
      return key
    }
    
    return getNestedValue(translations[language], keys)
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