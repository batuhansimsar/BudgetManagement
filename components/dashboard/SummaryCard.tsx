import { TrendingUp, TrendingDown } from 'lucide-react'

interface SummaryCardProps {
  title: string
  value: string | number
  change: number
  isPositive: boolean
  icon?: React.ReactNode
}

export default function SummaryCard({
  title,
  value,
  change,
  isPositive,
  icon,
}: SummaryCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      // Eğer yüzde değeri ise
      if (val < 100 && val > 0) {
        return `${val.toFixed(1)}%`
      }
      // Para birimi formatı
      return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
      }).format(val)
    }
    return val
  }

  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">
            {formatValue(value)}
          </p>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp size={16} className="text-green-500" />
            ) : (
              <TrendingDown size={16} className="text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isPositive ? '+' : ''}
              {change.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500">önceki aya göre</span>
          </div>
        </div>
        {icon && (
          <div className="p-3 bg-primary-50 rounded-lg">{icon}</div>
        )}
      </div>
    </div>
  )
}

