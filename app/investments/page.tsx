'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { TrendingUp, TrendingDown, PieChart, DollarSign } from 'lucide-react'

const investments = [
  {
    id: 1,
    name: 'Borsa İstanbul',
    symbol: 'BIST',
    amount: 45000,
    change: 5.2,
    isPositive: true,
    type: 'Stocks',
  },
  {
    id: 2,
    name: 'Altın',
    symbol: 'GOLD',
    amount: 25000,
    change: 2.8,
    isPositive: true,
    type: 'Commodity',
  },
  {
    id: 3,
    name: 'Döviz (USD)',
    symbol: 'USD',
    amount: 15000,
    change: -1.5,
    isPositive: false,
    type: 'Forex',
  },
  {
    id: 4,
    name: 'Kripto Para',
    symbol: 'BTC',
    amount: 8000,
    change: 12.3,
    isPositive: true,
    type: 'Crypto',
  },
]

const portfolioStats = {
  totalValue: 93000,
  totalReturn: 8.5,
  isPositive: true,
  monthlyReturn: 3.2,
}

export default function InvestmentsPage() {
  return (
    <DashboardLayout>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Yatırımlar</h1>
        <p className="text-gray-500 mt-1">
          Yatırım portföyünüzün detaylı görünümü
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-600">Toplam Portföy Değeri</h3>
            <DollarSign className="text-primary-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {new Intl.NumberFormat('tr-TR', {
              style: 'currency',
              currency: 'TRY',
              minimumFractionDigits: 0,
            }).format(portfolioStats.totalValue)}
          </p>
          <p className="text-sm text-gray-500">Tüm yatırımlarınızın toplam değeri</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-600">Toplam Getiri</h3>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-green-600 mb-2">
            +{portfolioStats.totalReturn}%
          </p>
          <p className="text-sm text-gray-500">Genel getiri oranı</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-600">Aylık Getiri</h3>
            <PieChart className="text-blue-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-2">
            +{portfolioStats.monthlyReturn}%
          </p>
          <p className="text-sm text-gray-500">Bu ayki performans</p>
        </div>
      </div>

      {/* Investment List */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Yatırımlarım</h2>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
            Yeni Yatırım Ekle
          </button>
        </div>

        <div className="space-y-4">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-sm">
                    {investment.symbol.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{investment.name}</p>
                  <p className="text-sm text-gray-500">{investment.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                      minimumFractionDigits: 0,
                    }).format(investment.amount)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {investment.isPositive ? (
                      <TrendingUp className="text-green-600" size={16} />
                    ) : (
                      <TrendingDown className="text-red-600" size={16} />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        investment.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {investment.isPositive ? '+' : ''}
                      {investment.change}%
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                  Detay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Tips */}
      <div className="mt-6 card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary-100 rounded-lg">
            <PieChart className="text-primary-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Yatırım Önerileri</h3>
            <p className="text-sm text-gray-600 mb-3">
              Portföyünüzü çeşitlendirmek için farklı varlık sınıflarına yatırım yapmayı düşünün.
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Risk toleransınıza uygun yatırımlar seçin</li>
              <li>• Düzenli olarak portföyünüzü gözden geçirin</li>
              <li>• Uzun vadeli bir bakış açısı benimseyin</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

