// components/Footer.tsx
'use client'

import { useLanguage } from '@/app/contexts/LanguageContext'
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa'

export default function Footer() {
  const { t } = useLanguage()

  const handlePhoneClick = () => {
    window.open('tel:+381641234567')
  }

  const handleEmailClick = () => {
    window.open('mailto:fotograf@example.com?subject=Upit za fotografisanje&body=Pozdrav, zanima me vaša usluga...')
  }

  const socialLinks = [
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com/tvojprofil',
      color: 'hover:text-pink-500'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://facebook.com/tvojprofil',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com/tvojprofil',
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/tvojprofil',
      color: 'hover:text-blue-700'
    }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Glavni deo footera */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* LEVI DEO - Brand sekcija (centrirana) */}
          <div className="text-center lg:text-left lg:flex-1 max-w-lg">
            <h3 className="text-2xl font-bold mb-4">
              {t('footer.brand')}
            </h3>
            <p className="text-gray-300 mb-6">
              {t('footer.description')}
            </p>

            {/* Društvene mreže - centrirane na mobilnim, levo na desktopu */}
            <div className="flex justify-center lg:justify-start space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all duration-300 transform bg-gray-800 p-3 rounded-full text-gray-300 ${social.color} hover:bg-gray-700 hover:scale-110`}
                    aria-label={`Posetite nas na ${social.name}`}
                  >
                    <IconComponent size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* DESNI DEO - Brzi kontakt (centriran) */}
          <div className="text-center lg:text-left lg:flex-1 max-w-md">
            <h4 className="text-lg font-semibold mb-6">
              {t('footer.quickContact')}
            </h4>
            <div className="space-y-4">
              {/* Telefon */}
              <button
                onClick={handlePhoneClick}
                className="transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 text-gray-300 hover:text-white w-full text-left justify-center lg:justify-start"
              >
                <div className="bg-blue-600 p-2 rounded-full transition-colors duration-300 group-hover:bg-blue-700">
                  <FaPhone size={16} />
                </div>
                <div>
                  <p className="font-medium">{t('footer.callUs')}</p>
                  <p className="text-sm">+381 64 123 4567</p>
                </div>
              </button>

              {/* Email */}
              <button
                onClick={handleEmailClick}
                className="transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 text-gray-300 hover:text-white w-full text-left justify-center lg:justify-start"
              >
                <div className="bg-green-600 p-2 rounded-full transition-colors duration-300 group-hover:bg-green-700">
                  <FaEnvelope size={16} />
                </div>
                <div>
                  <p className="font-medium">{t('footer.sendEmail')}</p>
                  <p className="text-sm">fotograf@example.com</p>
                </div>
              </button>

              {/* Lokacija (dodata za bolju simetriju) */}
              <div className="flex items-center space-x-3 text-gray-300 justify-center lg:justify-start">
                <div className="bg-red-600 p-2 rounded-full">
                  <FaMapMarkerAlt size={16} />
                </div>
                <div>
                  <p className="font-medium">{t('footer.location')}</p>
                  <p className="text-sm">Beograd, Srbija</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donji deo footera - Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {t('footer.brand')}. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  )
}