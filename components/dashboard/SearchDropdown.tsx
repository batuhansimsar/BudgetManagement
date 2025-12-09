'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  BarChart3, 
  Settings,
  User,
  Bell,
  Search,
  FileText,
  DollarSign
} from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  category: string
}

const searchableItems: SearchResult[] = [
  // Sayfalar
  { id: '1', title: 'Dashboard', description: 'Ana sayfa ve genel görünüm', href: '/', icon: LayoutDashboard, category: 'Sayfa' },
  { id: '2', title: 'Cüzdan', description: 'Cüzdanlarınızı ve işlemlerinizi yönetin', href: '/wallet', icon: Wallet, category: 'Sayfa' },
  { id: '3', title: 'Yatırımlar', description: 'Yatırım portföyünüzün detaylı görünümü', href: '/investments', icon: TrendingUp, category: 'Sayfa' },
  { id: '4', title: 'Raporlar', description: 'Finansal raporlarınızı görüntüleyin', href: '/reports', icon: BarChart3, category: 'Sayfa' },
  { id: '5', title: 'Ayarlar', description: 'Hesap ayarlarınızı ve tercihlerinizi yönetin', href: '/settings', icon: Settings, category: 'Sayfa' },
  { id: '6', title: 'Profil', description: 'Profil bilgilerinizi görüntüleyin ve düzenleyin', href: '/profile', icon: User, category: 'Sayfa' },
  { id: '7', title: 'Bildirimler', description: 'Bildirimlerinizi görüntüleyin', href: '/notifications', icon: Bell, category: 'Sayfa' },
  
  // Hızlı İşlemler
  { id: '8', title: 'Para Yatır', description: 'Cüzdanınıza para yatırın', href: '/wallet', icon: DollarSign, category: 'İşlem' },
  { id: '9', title: 'Para Çek', description: 'Cüzdanınızdan para çekin', href: '/wallet', icon: DollarSign, category: 'İşlem' },
  { id: '10', title: 'Yeni Rapor Oluştur', description: 'Finansal rapor oluşturun', href: '/reports', icon: FileText, category: 'İşlem' },
]

interface SearchDropdownProps {
  query: string
  isOpen: boolean
  onClose: () => void
}

export default function SearchDropdown({ query, isOpen, onClose }: SearchDropdownProps) {
  const [results, setResults] = useState<SearchResult[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchTerm = query.toLowerCase()
    const filtered = searchableItems.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    )
    setResults(filtered.slice(0, 8)) // Maksimum 8 sonuç
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !query.trim()) {
    return null
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
    >
      {results.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          <Search size={24} className="mx-auto mb-2 text-gray-400" />
          <p>Sonuç bulunamadı</p>
        </div>
      ) : (
        <div className="py-2">
          {results.map((result) => {
            const Icon = result.icon
            return (
              <Link
                key={result.id}
                href={result.href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Icon size={20} className="text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{result.title}</p>
                  <p className="text-sm text-gray-500 truncate">{result.description}</p>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  {result.category}
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

