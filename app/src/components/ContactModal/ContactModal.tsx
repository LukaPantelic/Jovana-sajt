// components/ContactModal.tsx - AŽURIRANA VERZIJA SA PREVODIMA
'use client'

import { useState, useRef } from 'react'
import { FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import { useLanguage } from '@/app/contexts/LanguageContext'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const { language, t } = useLanguage()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // ⚡ ZAMENI OVE KLJUČEVE SA SVOJIM PODACIMA IZ EMAILJS DASHBOARDA ⚡
      const result = await emailjs.sendForm(
        'service_shou04j',      // SERVICE ID - zameni!
        'template_ndyt3lm',    // TEMPLATE ID - zameni!
        formRef.current!,               // Form element
        'TlUwJblhFrsS0WjGo'               // PUBLIC KEY - zameni!
      )

      console.log('Email sent successfully:', result)
      
      if (result.status === 200) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
      }
    } catch (error) {
      console.error('Email sending failed:', error)
      setError(t('contact.error.message'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setIsSubmitted(false)
      setError('')
    }, 300)
  }

  const socialLinks = [
    { icon: FaInstagram, url: 'https://instagram.com/jolline_digitalart', color: 'hover:text-pink-500' },
    { icon: FaFacebook, url: 'https://facebook.com', color: 'hover:text-blue-600' },
    { icon: FaTwitter, url: 'https://twitter.com', color: 'hover:text-blue-400' },
    { icon: FaLinkedin, url: 'https://linkedin.com', color: 'hover:text-blue-700' }
  ]

  // Lokacije na različitim jezicima
  const locationText = {
    en: 'Belgrade, Serbia',
    de: 'Belgrad, Serbien', 
    sr: 'Beograd, Srbija'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{t('contact.title')}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 mx-6 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isSubmitted && (
          <div className="p-6 bg-green-50 border-l-4 border-green-500 mx-6 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  ✅ {t('contact.success.message')}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Kontakt Forma */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">{t('contact.sendMessage')}</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder={t('contact.form.phonePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    t('contact.form.sendButton')
                  )}
                </button>
              </form>
            </div>

            {/* Kontakt Informacije */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">{t('contact.directContact')}</h3>
              <div className="space-y-4">
                {/* Telefon */}
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-600 p-2 rounded-full">
                    <FaPhone className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{t('contact.info.callUs')}</p>
                    <a href="tel:+381641234567" className="text-blue-600 hover:text-blue-700">
                      +381 64 123 4567
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="bg-green-600 p-2 rounded-full">
                    <FaEnvelope className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{t('contact.info.sendEmail')}</p>
                    <a href="mailto:fotograf@example.com" className="text-green-600 hover:text-green-700">
                      fotograf@example.com
                    </a>
                  </div>
                </div>

                {/* Lokacija */}
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <div className="bg-red-600 p-2 rounded-full">
                    <FaMapMarkerAlt className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{t('contact.info.location')}</p>
                    <p className="text-gray-600">
                      {locationText[language as keyof typeof locationText]}
                    </p>
                  </div>
                </div>

                {/* Društvene mreže */}
                <div className="pt-4">
                  <h4 className="font-semibold mb-3 text-gray-800">{t('contact.followUs')}</h4>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon
                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`bg-gray-100 p-3 rounded-full text-gray-600 ${social.color} hover:bg-gray-200 transition-all duration-300`}
                        >
                          <IconComponent size={18} />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}