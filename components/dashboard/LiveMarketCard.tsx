'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, RefreshCw, AlertCircle } from 'lucide-react'
import { getExchangeRates } from '@/lib/api/getExchangeRates'

interface ExchangeRate {
  usd: number | null
  eur: number | null
  loading: boolean
  error: string | null
  lastUpdate: Date | null
}

export default function LiveMarketCard() {
  const [rates, setRates] = useState<ExchangeRate>({
    usd: null,
    eur: null,
    loading: true,
    error: null,
    lastUpdate: null,
  })

  const fetchExchangeRates = async () => {
    setRates((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const data = await getExchangeRates()

      setRates({
        usd: data.usd,
        eur: data.eur,
        loading: false,
        error: null,
        lastUpdate: new Date(),
      })
    } catch (error) {
      console.error('Döviz kuru hatası:', error)
      setRates((prev) => ({
        ...prev,
        loading: false,
        error: 'Döviz kurları yüklenemedi. Lütfen tekrar deneyin.',
      }))
    }
  }

  useEffect(() => {
    fetchExchangeRates()
    // Her 5 dakikada bir güncelle
    const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const formatRate = (rate: number | null) => {
    if (rate === null) return 'Yükleniyor...'
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(rate)
  }

  const formatTime = (date: Date | null) => {
    if (!date) return ''
    return new Intl.DateTimeFormat('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date)
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Canlı Piyasa Verileri
          </h2>
          <p className="text-sm text-gray-500">
            Güncel döviz kurları
          </p>
        </div>
        <button
          onClick={fetchExchangeRates}
          disabled={rates.loading}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Yenile"
        >
          <RefreshCw
            size={20}
            className={rates.loading ? 'animate-spin' : ''}
          />
        </button>
      </div>

      {rates.error ? (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="text-red-600" size={20} />
          <p className="text-sm text-red-600">{rates.error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* USD/TRY */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                $
              </div>
              <div>
                <p className="text-sm text-gray-600">USD / TRY</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rates.loading ? (
                    <span className="text-gray-400">Yükleniyor...</span>
                  ) : (
                    formatRate(rates.usd)
                  )}
                </p>
              </div>
            </div>
            <TrendingUp className="text-blue-600" size={24} />
          </div>

          {/* EUR/TRY */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                €
              </div>
              <div>
                <p className="text-sm text-gray-600">EUR / TRY</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rates.loading ? (
                    <span className="text-gray-400">Yükleniyor...</span>
                  ) : (
                    formatRate(rates.eur)
                  )}
                </p>
              </div>
            </div>
            <TrendingUp className="text-green-600" size={24} />
          </div>

          {/* Last Update */}
          {rates.lastUpdate && (
            <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
              Son güncelleme: {formatTime(rates.lastUpdate)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

