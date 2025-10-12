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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand sekcija */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              {t('footer.brand')}
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            
            {/* Društvene mreže */}
            <div className="flex space-x-4">
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

          {/* Brzi kontakt */}
          <div>
            <h4 className="text-lg font-semibold mb-6">
              {t('footer.quickContact')}
            </h4>
            <div className="space-y-4">
              {/* Telefon */}
              <button
                onClick={handlePhoneClick}
                className="transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 text-gray-300 hover:text-white w-full text-left"
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
                className="transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 text-gray-300 hover:text-white w-full text-left"
              >
                <div className="bg-green-600 p-2 rounded-full transition-colors duration-300 group-hover:bg-green-700">
                  <FaEnvelope size={16} />
                </div>
                <div>
                  <p className="font-medium">{t('footer.sendEmail')}</p>
                  <p className="text-sm">fotograf@example.com</p>
                </div>
              </button>

              {/* Lokacija */}
              <div className="flex items-center space-x-3 text-gray-300">
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

          {/* Radno vreme */}
          <div>
            <h4 className="text-lg font-semibold mb-6">
              {t('footer.workingHours')}
            </h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>
                  {t('footer.weekdays')}
                </span>
                <span className="font-medium">08:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span>
                  {t('footer.saturday')}
                </span>
                <span className="font-medium">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>
                  {t('footer.sunday')}
                </span>
                <span className="font-medium">10:00 - 16:00</span>
              </div>
            </div>
            
            {/* Hitni termini */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-center text-gray-300">
                📸 <strong className="text-white">{t('footer.emergency')}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Donji deo footera */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 {t('footer.brand')}. {t('footer.rights')}
            </p>
            
            {/* Dodatni linkovi */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="/privacy" 
                className="transition-all duration-300 transform hover:scale-105 text-gray-400 hover:text-white text-sm"
              >
                {t('footer.privacy')}
              </a>
              <a 
                href="/terms" 
                className="transition-all duration-300 transform hover:scale-105 text-gray-400 hover:text-white text-sm"
              >
                {t('footer.terms')}
              </a>
              <a 
                href="/sitemap" 
                className="transition-all duration-300 transform hover:scale-105 text-gray-400 hover:text-white text-sm"
              >
                {t('footer.sitemap')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}