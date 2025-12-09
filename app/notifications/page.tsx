'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Bell, CheckCircle, AlertCircle, Info, X, Check } from 'lucide-react'
import { useState } from 'react'

const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'İşlem Başarılı',
    message: 'Para transferi başarıyla tamamlandı.',
    time: '2 dakika önce',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Bütçe Uyarısı',
    message: 'Bu ayki gider bütçenizin %80\'ine ulaştı.',
    time: '1 saat önce',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'Yeni Rapor Hazır',
    message: 'Aylık finansal raporunuz hazır.',
    time: '3 saat önce',
    read: true,
  },
  {
    id: 4,
    type: 'success',
    title: 'Yatırım Güncellemesi',
    message: 'Portföyünüz %5.2 değer kazandı.',
    time: '5 saat önce',
    read: true,
  },
  {
    id: 5,
    type: 'warning',
    title: 'Fatura Hatırlatıcı',
    message: 'Elektrik faturanızın ödeme tarihi yaklaşıyor.',
    time: '1 gün önce',
    read: false,
  },
  {
    id: 6,
    type: 'info',
    title: 'Sistem Güncellemesi',
    message: 'Yeni özellikler eklendi. Detaylar için tıklayın.',
    time: '2 gün önce',
    read: true,
  },
]

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-600" size={24} />
      case 'warning':
        return <AlertCircle className="text-yellow-600" size={24} />
      case 'info':
        return <Info className="text-blue-600" size={24} />
      default:
        return <Bell className="text-gray-600" size={24} />
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100'
      case 'warning':
        return 'bg-yellow-100'
      case 'info':
        return 'bg-blue-100'
      default:
        return 'bg-gray-100'
    }
  }

  const markAsRead = (id: number) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifs(notifs.filter((n) => n.id !== id))
  }

  const filteredNotifs =
    filter === 'unread' ? notifs.filter((n) => !n.read) : notifs
  const unreadCount = notifs.filter((n) => !n.read).length

  return (
    <DashboardLayout>
      {/* Page Title */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bildirimler</h1>
            <p className="text-gray-500 mt-1">
              {unreadCount > 0
                ? `${unreadCount} okunmamış bildirim`
                : 'Tüm bildirimler okundu'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-sm text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors flex items-center gap-2"
            >
              <Check size={18} />
              Tümünü Okundu İşaretle
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tümü ({notifs.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'unread'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Okunmamış ({unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="card">
        {filteredNotifs.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">Bildirim bulunmuyor</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifs.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 border rounded-lg transition-colors ${
                  notification.read
                    ? 'border-gray-200 bg-white'
                    : 'border-primary-200 bg-primary-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${getBgColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary-600 rounded-full mt-2"></span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Okundu işaretle"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Sil"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="mt-6 card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Bell className="text-blue-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Bildirim Ayarları</h3>
            <p className="text-sm text-gray-600 mb-4">
              Bildirim tercihlerinizi yönetmek için ayarlar sayfasını ziyaret edin.
            </p>
            <a
              href="/settings"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Ayarlara Git →
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

