'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Wallet, label: 'Cüzdan', href: '/wallet' },
  { icon: TrendingUp, label: 'Yatırımlar', href: '/investments' },
  { icon: BarChart3, label: 'Raporlar', href: '/reports' },
  { icon: Settings, label: 'Ayarlar', href: '/settings' },
]

// localStorage'dan profil verilerini yükle
const loadProfileData = () => {
  if (typeof window === 'undefined') {
    return {
      fullName: 'Esref Batuhan',
      email: 'esref@example.com',
      initials: 'EK',
      avatarUrl: null,
    }
  }
  
  const saved = localStorage.getItem('profileData')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      const fullName = parsed.fullName || 'Esref Batuhan'
      const names = fullName.split(' ')
      const initials = parsed.initials || (names.length >= 2 
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : fullName.substring(0, 2).toUpperCase())
      
      return {
        fullName,
        email: parsed.email || 'esref@example.com',
        initials,
        avatarUrl: parsed.avatarUrl || null,
      }
    } catch {
      return {
        fullName: 'Esref Batuhan',
        email: 'esref@example.com',
        initials: 'EK',
        avatarUrl: null,
      }
    }
  }
  return {
    fullName: 'Esref Batuhan',
    email: 'esref@example.com',
    initials: 'EK',
    avatarUrl: null,
  }
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()
  // Server ve client'ta aynı default değerlerle başlat (hydration hatasını önlemek için)
  const [profileData, setProfileData] = useState({
    fullName: 'Esref Batuhan',
    email: 'esref@example.com',
    initials: 'EK',
    avatarUrl: null,
  })
  const [isMounted, setIsMounted] = useState(false)

  // Component mount olduğunda ve localStorage değiştiğinde verileri yükle
  useEffect(() => {
    setIsMounted(true)
    const updateProfile = () => {
      setProfileData(loadProfileData())
    }

    // İlk yükleme (sadece client-side)
    updateProfile()

    // localStorage değişikliklerini dinle
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'profileData') {
        updateProfile()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Custom event dinle (aynı sekmede yapılan değişiklikler için)
    const handleCustomStorageChange = () => {
      updateProfile()
    }

    window.addEventListener('profileDataUpdated', handleCustomStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('profileDataUpdated', handleCustomStorageChange)
    }
  }, [])

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            FinansApp
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-colors duration-200
                      ${
                        isActive
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Link href="/profile" className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
              {isMounted && profileData.avatarUrl ? (
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-primary-600 font-semibold">{profileData.initials}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{profileData.fullName}</p>
              <p className="text-xs text-gray-500 truncate">{profileData.email}</p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  )
}

