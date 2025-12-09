'use client'

import { Search, Bell, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import SearchDropdown from './SearchDropdown'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // İlk sonuca git veya arama sayfasına yönlendir
      setIsSearchOpen(false)
      // Basit bir arama - ilk eşleşen sayfaya git
      const searchTerm = searchQuery.toLowerCase()
      if (searchTerm.includes('cüzdan') || searchTerm.includes('wallet')) {
        router.push('/wallet')
      } else if (searchTerm.includes('yatırım') || searchTerm.includes('investment')) {
        router.push('/investments')
      } else if (searchTerm.includes('rapor') || searchTerm.includes('report')) {
        router.push('/reports')
      } else if (searchTerm.includes('ayar') || searchTerm.includes('setting')) {
        router.push('/settings')
      } else if (searchTerm.includes('profil') || searchTerm.includes('profile')) {
        router.push('/profile')
      } else if (searchTerm.includes('bildirim') || searchTerm.includes('notification')) {
        router.push('/notifications')
      } else {
        router.push('/')
      }
      setSearchQuery('')
    }
  }

  useEffect(() => {
    setIsSearchOpen(searchQuery.trim().length > 0)
  }, [searchQuery])

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-4 lg:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearch} className="relative" ref={searchRef}>
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Sayfaları, işlemleri ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(searchQuery.trim().length > 0)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <SearchDropdown 
              query={searchQuery} 
              isOpen={isSearchOpen} 
              onClose={() => setIsSearchOpen(false)} 
            />
          </form>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Link
            href="/notifications"
            className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>

          {/* Profile Avatar */}
          <Link
            href="/profile"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <User size={18} className="text-primary-600" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">
              Profil
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

