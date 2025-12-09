'use client'

import { useState, useRef, useEffect } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, Save, X, Check } from 'lucide-react'

const profileStats = [
  { label: 'Toplam İşlem', value: '1,234' },
  { label: 'Aktif Yatırım', value: '4' },
  { label: 'Kayıt Tarihi', value: '2023' },
]

const recentActivity = [
  { action: 'Şifre değiştirildi', date: '2024-01-10', type: 'security' },
  { action: 'Yeni cüzdan eklendi', date: '2024-01-08', type: 'wallet' },
  { action: 'Profil güncellendi', date: '2024-01-05', type: 'profile' },
]

interface ProfileData {
  fullName: string
  email: string
  phone: string
  birthDate: string
  address: string
  initials: string
  avatarUrl: string | null
}

const defaultProfileData: ProfileData = {
  fullName: 'Eser Batuhan',
  email: 'eser@example.com',
  phone: '+90 555 123 45 67',
  birthDate: '1990-01-15',
  address: 'İstanbul, Türkiye',
  initials: 'EK',
  avatarUrl: null,
}

// localStorage'dan profil verilerini yükle
const loadProfileData = (): ProfileData => {
  if (typeof window === 'undefined') return defaultProfileData
  
  const saved = localStorage.getItem('profileData')
  if (saved) {
    try {
      return { ...defaultProfileData, ...JSON.parse(saved) }
    } catch {
      return defaultProfileData
    }
  }
  return defaultProfileData
}

// Profil verilerini localStorage'a kaydet
const saveProfileData = (data: ProfileData) => {
  if (typeof window === 'undefined') return
  
  const dataToSave = {
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    birthDate: data.birthDate,
    address: data.address,
    initials: data.initials,
    avatarUrl: data.avatarUrl,
  }
  localStorage.setItem('profileData', JSON.stringify(dataToSave))
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileData, setProfileData] = useState<ProfileData>(loadProfileData)
  const [originalData, setOriginalData] = useState<ProfileData>(loadProfileData)

  // Component mount olduğunda localStorage'dan veri yükle
  useEffect(() => {
    const savedData = loadProfileData()
    setProfileData(savedData)
    setOriginalData(savedData)
  }, [])

  const handleEdit = () => {
    setOriginalData({ ...profileData })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setProfileData({ ...originalData })
    setIsEditing(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Verileri localStorage'a kaydet
      saveProfileData(profileData)
      
      // Original data'yı güncelle (kaydedilen veriler artık orijinal)
      setOriginalData({ ...profileData })
      
      // Sidebar'ı güncellemek için custom event gönder
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('profileDataUpdated'))
      }
      
      setIsSaving(false)
      setIsEditing(false)
      setShowSuccessMessage(true)
      
      // Başarı mesajını 3 saniye sonra gizle
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    } catch (error) {
      console.error('Kaydetme hatası:', error)
      setIsSaving(false)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
    
    // İsim değiştiğinde initials'i güncelle
    if (field === 'fullName') {
      const names = value.split(' ')
      const initials = names.length >= 2 
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : value.substring(0, 2).toUpperCase()
      setProfileData((prev) => ({ ...prev, initials }))
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Dosya boyutu kontrolü (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB\'dan küçük olmalıdır.')
        return
      }

      // Dosya tipi kontrolü
      if (!file.type.startsWith('image/')) {
        alert('Lütfen bir resim dosyası seçin.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          avatarUrl: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <DashboardLayout>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <Check size={20} />
          <span>Profil başarıyla güncellendi!</span>
        </div>
      )}

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Profil</h1>
        <p className="text-gray-500 mt-1">
          Profil bilgilerinizi görüntüleyin ve düzenleyin
        </p>
      </div>

      {/* Profile Header */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
              {profileData.avatarUrl ? (
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                profileData.initials
              )}
            </div>
            {isEditing && (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors border-2 border-gray-200"
                >
                  <Camera size={18} className="text-gray-700" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="text-2xl font-bold text-gray-900 border-b-2 border-primary-500 focus:outline-none focus:border-primary-600"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900">{profileData.fullName}</h2>
              )}
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Düzenle"
                >
                  <Edit size={18} />
                </button>
              )}
            </div>
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="text-gray-500 mb-4 border-b-2 border-primary-500 focus:outline-none focus:border-primary-600 w-full"
              />
            ) : (
              <p className="text-gray-500 mb-4">{profileData.email}</p>
            )}
            <div className="flex flex-wrap gap-4">
              {profileStats.map((stat, index) => (
                <div key={index}>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Kişisel Bilgiler</h2>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="İptal"
                >
                  <X size={18} />
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Kaydet"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save size={18} />
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
              >
                <Edit size={16} />
                Düzenle
              </button>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="text-gray-400 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Ad Soyad</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{profileData.fullName}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="text-gray-400 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">E-posta</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{profileData.email}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-gray-400 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Telefon</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="+90 555 123 45 67"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{profileData.phone}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="text-gray-400 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Doğum Tarihi</p>
                {isEditing ? (
                  <input
                    type="date"
                    value={profileData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{formatDate(profileData.birthDate)}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-gray-400 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Adres</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="İstanbul, Türkiye"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{profileData.address}</p>
                )}
              </div>
            </div>
            {isEditing && (
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
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
                <button
                  onClick={handleCancel}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Statistics */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Hesap İstatistikleri</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Hesap Tamamlanma</span>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Toplam İşlem</p>
                <p className="text-2xl font-bold text-primary-600">1,234</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Başarılı</p>
                <p className="text-2xl font-bold text-green-600">1,198</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Son Aktiviteler</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === 'security'
                        ? 'bg-red-100'
                        : activity.type === 'wallet'
                        ? 'bg-green-100'
                        : 'bg-blue-100'
                    }`}
                  >
                    <User
                      className={
                        activity.type === 'security'
                          ? 'text-red-600'
                          : activity.type === 'wallet'
                          ? 'text-green-600'
                          : 'text-blue-600'
                      }
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

