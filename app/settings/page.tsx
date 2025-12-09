'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { User, Bell, Shield, CreditCard, Globe, Moon, Save, Check } from 'lucide-react'
import { useState, useEffect } from 'react'

// localStorage'dan profil verilerini yükle
const loadProfileData = () => {
  if (typeof window === 'undefined') {
    return {
      fullName: 'Eser Batuhan',
      email: 'eser@example.com',
      phone: '+90 555 123 45 67',
    }
  }
  
  const saved = localStorage.getItem('profileData')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      return {
        fullName: parsed.fullName || 'Eser Batuhan',
        email: parsed.email || 'eser@example.com',
        phone: parsed.phone || '+90 555 123 45 67',
      }
    } catch {
      return {
        fullName: 'Eser Batuhan',
        email: 'eser@example.com',
        phone: '+90 555 123 45 67',
      }
    }
  }
  return {
    fullName: 'Eser Batuhan',
    email: 'eser@example.com',
    phone: '+90 555 123 45 67',
  }
}

// localStorage'dan bildirim ayarlarını yükle
const loadNotificationSettings = () => {
  if (typeof window === 'undefined') {
    return { email: true, push: false, sms: false }
  }
  
  const saved = localStorage.getItem('notificationSettings')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return { email: true, push: false, sms: false }
    }
  }
  return { email: true, push: false, sms: false }
}

// localStorage'dan tercihleri yükle
const loadPreferences = () => {
  if (typeof window === 'undefined') {
    return { currency: 'TRY', language: 'tr', theme: 'light' }
  }
  
  const saved = localStorage.getItem('preferences')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return { currency: 'TRY', language: 'tr', theme: 'light' }
    }
  }
  return { currency: 'TRY', language: 'tr', theme: 'light' }
}

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState<string | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null)

  const [profileData, setProfileData] = useState(loadProfileData)
  const [notifications, setNotifications] = useState(loadNotificationSettings)
  const [preferences, setPreferences] = useState(loadPreferences)

  // Component mount olduğunda localStorage'dan verileri yükle
  useEffect(() => {
    setProfileData(loadProfileData())
    setNotifications(loadNotificationSettings())
    setPreferences(loadPreferences())
  }, [])

  const handleSaveProfile = async () => {
    setIsSaving('profile')
    
    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Profil verilerini localStorage'a kaydet (profil sayfasıyla aynı key)
      const existingData = localStorage.getItem('profileData')
      let dataToSave = {}
      
      if (existingData) {
        try {
          dataToSave = JSON.parse(existingData)
        } catch {
          dataToSave = {}
        }
      }
      
      // Mevcut verileri güncelle
      const updatedData = {
        ...dataToSave,
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
      }
      
      localStorage.setItem('profileData', JSON.stringify(updatedData))
      
      // Sidebar'ı güncellemek için custom event gönder
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('profileDataUpdated'))
      }
      
      setIsSaving(null)
      setShowSuccessMessage('profile')
      setTimeout(() => setShowSuccessMessage(null), 3000)
    } catch (error) {
      console.error('Kaydetme hatası:', error)
      setIsSaving(null)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  const handleSaveNotifications = async () => {
    setIsSaving('notifications')
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      // Bildirim ayarlarını localStorage'a kaydet
      localStorage.setItem('notificationSettings', JSON.stringify(notifications))
      
      setIsSaving(null)
      setShowSuccessMessage('notifications')
      setTimeout(() => setShowSuccessMessage(null), 3000)
    } catch (error) {
      console.error('Kaydetme hatası:', error)
      setIsSaving(null)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  const handleSavePreferences = async () => {
    setIsSaving('preferences')
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      // Tercihleri localStorage'a kaydet
      localStorage.setItem('preferences', JSON.stringify(preferences))
      
      setIsSaving(null)
      setShowSuccessMessage('preferences')
      setTimeout(() => setShowSuccessMessage(null), 3000)
    } catch (error) {
      console.error('Kaydetme hatası:', error)
      setIsSaving(null)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  return (
    <DashboardLayout>
      {/* Success Messages */}
      {showSuccessMessage === 'profile' && (
        <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <Check size={20} />
          <span>Profil bilgileri başarıyla kaydedildi!</span>
        </div>
      )}
      {showSuccessMessage === 'notifications' && (
        <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <Check size={20} />
          <span>Bildirim ayarları başarıyla kaydedildi!</span>
        </div>
      )}
      {showSuccessMessage === 'preferences' && (
        <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <Check size={20} />
          <span>Tercihler başarıyla kaydedildi!</span>
        </div>
      )}

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
        <p className="text-gray-500 mt-1">
          Hesap ayarlarınızı ve tercihlerinizi yönetin
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-100 rounded-lg">
              <User className="text-primary-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Profil Bilgileri</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad
              </label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) =>
                  setProfileData({ ...profileData, fullName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={isSaving === 'profile'}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving === 'profile' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Kaydediliyor...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Değişiklikleri Kaydet</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Bildirim Ayarları</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">E-posta Bildirimleri</p>
                <p className="text-sm text-gray-500">Önemli güncellemeler için e-posta al</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) =>
                    setNotifications({ ...notifications, email: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Bildirimleri</p>
                <p className="text-sm text-gray-500">Tarayıcı push bildirimleri</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) =>
                    setNotifications({ ...notifications, push: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Bildirimleri</p>
                <p className="text-sm text-gray-500">Acil durumlar için SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) =>
                    setNotifications({ ...notifications, sms: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleSaveNotifications}
                disabled={isSaving === 'notifications'}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving === 'notifications' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Bildirim Ayarlarını Kaydet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Globe className="text-green-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Tercihler</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Para Birimi
              </label>
              <select
                value={preferences.currency}
                onChange={(e) =>
                  setPreferences({ ...preferences, currency: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="TRY">TRY - Türk Lirası</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dil
              </label>
              <select
                value={preferences.language}
                onChange={(e) =>
                  setPreferences({ ...preferences, language: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tema
              </label>
              <select
                value={preferences.theme}
                onChange={(e) =>
                  setPreferences({ ...preferences, theme: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="light">Açık</option>
                <option value="dark">Koyu</option>
                <option value="auto">Otomatik</option>
              </select>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleSavePreferences}
                disabled={isSaving === 'preferences'}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving === 'preferences' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Tercihleri Kaydet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="text-red-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Güvenlik</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Şifre Değiştir</p>
                <p className="text-sm text-gray-500">Hesap şifrenizi güncelleyin</p>
              </div>
              <span className="text-primary-600">→</span>
            </button>
            <button className="w-full px-4 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">İki Faktörlü Doğrulama</p>
                <p className="text-sm text-gray-500">Hesabınızı daha güvenli hale getirin</p>
              </div>
              <span className="text-primary-600">→</span>
            </button>
            <button className="w-full px-4 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Oturum Yönetimi</p>
                <p className="text-sm text-gray-500">Aktif oturumları görüntüleyin</p>
              </div>
              <span className="text-primary-600">→</span>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card border-red-200 bg-red-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="text-red-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-red-900">Tehlikeli Bölge</h2>
          </div>
          <div className="space-y-4">
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Hesabı Sil
            </button>
            <p className="text-sm text-red-700">
              Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

