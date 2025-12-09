'use client'

import { financialHealthScore } from '@/data/mockData'
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

export default function GaugeCard() {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return 'bg-green-500'
    if (score >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <CheckCircle2 className="text-green-600" size={24} />
    if (score >= 50) return <AlertCircle className="text-yellow-600" size={24} />
    return <XCircle className="text-red-600" size={24} />
  }

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Mükemmel'
    if (score >= 50) return 'İyi'
    return 'Dikkat Gerekli'
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Finansal Sağlık Skoru
        </h2>
        <p className="text-sm text-gray-500">
          Genel finansal durumunuzun değerlendirmesi
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-8">
        {/* Gauge Circle */}
        <div className="relative w-48 h-48 mb-6">
          <svg className="transform -rotate-90 w-48 h-48">
            {/* Background Circle */}
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#e5e7eb"
              strokeWidth="16"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke={getScoreBgColor(financialHealthScore).replace('bg-', '')}
              strokeWidth="16"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${
                2 * Math.PI * 88 * (1 - financialHealthScore / 100)
              }`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          {/* Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`text-5xl font-bold ${getScoreColor(
                financialHealthScore
              )}`}
            >
              {financialHealthScore}
            </span>
            <span className="text-sm text-gray-500 mt-1">/ 100</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 mb-4">
          {getScoreIcon(financialHealthScore)}
          <span
            className={`text-lg font-semibold ${getScoreColor(
              financialHealthScore
            )}`}
          >
            {getScoreLabel(financialHealthScore)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreBgColor(
                financialHealthScore
              )} transition-all duration-1000`}
              style={{ width: `${financialHealthScore}%` }}
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 w-full">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Öneriler:
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>Düzenli tasarruf planı oluşturun</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>Gereksiz giderleri gözden geçirin</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>Acil durum fonu oluşturun</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

