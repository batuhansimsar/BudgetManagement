'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react'

const walletCards = [
  { name: 'Ana Cüzdan', balance: 125000, currency: 'TRY', type: 'primary' },
  { name: 'Tasarruf', balance: 45000, currency: 'TRY', type: 'savings' },
  { name: 'Yatırım', balance: 78000, currency: 'TRY', type: 'investment' },
]

const recentTransactions = [
  { id: 1, description: 'Maaş', amount: 15000, type: 'income', date: '2024-01-15' },
  { id: 2, description: 'Market Alışverişi', amount: -850, type: 'expense', date: '2024-01-14' },
  { id: 3, description: 'Fatura Ödemesi', amount: -1200, type: 'expense', date: '2024-01-13' },
  { id: 4, description: 'Freelance Proje', amount: 5000, type: 'income', date: '2024-01-12' },
  { id: 5, description: 'Restoran', amount: -450, type: 'expense', date: '2024-01-11' },
]

export default function WalletPage() {
  return (
    <DashboardLayout>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Cüzdan</h1>
        <p className="text-gray-500 mt-1">
          Cüzdanlarınızı ve işlemlerinizi yönetin
        </p>
      </div>

      {/* Wallet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {walletCards.map((card, index) => (
          <div
            key={index}
            className="card card-hover bg-gradient-to-br from-primary-500 to-primary-600 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <Wallet size={24} />
              </div>
              <button className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
                <Plus size={20} />
              </button>
            </div>
            <h3 className="text-sm opacity-90 mb-2">{card.name}</h3>
            <p className="text-3xl font-bold mb-1">
              {new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: card.currency,
                minimumFractionDigits: 0,
              }).format(card.balance)}
            </p>
            <p className="text-sm opacity-75">Toplam bakiye</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-3 bg-green-100 rounded-full">
              <ArrowDownRight className="text-green-600" size={24} />
            </div>
            <span className="text-sm font-medium text-gray-700">Para Yatır</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-3 bg-red-100 rounded-full">
              <ArrowUpRight className="text-red-600" size={24} />
            </div>
            <span className="text-sm font-medium text-gray-700">Para Çek</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-3 bg-blue-100 rounded-full">
              <ArrowUpRight className="text-blue-600" size={24} />
            </div>
            <span className="text-sm font-medium text-gray-700">Transfer</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-3 bg-purple-100 rounded-full">
              <CreditCard className="text-purple-600" size={24} />
            </div>
            <span className="text-sm font-medium text-gray-700">Kart Ekle</span>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Son İşlemler</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Tümünü Gör
          </button>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full ${
                    transaction.type === 'income'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}
                >
                  {transaction.type === 'income' ? (
                    <ArrowDownRight
                      className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}
                      size={20}
                    />
                  ) : (
                    <ArrowUpRight
                      className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}
                      size={20}
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <p
                className={`text-lg font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : ''}
                {new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                  minimumFractionDigits: 0,
                }).format(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

