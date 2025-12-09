'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Download, FileText, Calendar, Filter } from 'lucide-react'

const reports = [
  {
    id: 1,
    title: 'Aylık Gelir-Gider Raporu',
    period: 'Ocak 2024',
    type: 'Income/Expense',
    date: '2024-01-31',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Yatırım Performans Raporu',
    period: 'Q4 2023',
    type: 'Investment',
    date: '2023-12-31',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Vergi Raporu',
    period: '2023 Yılı',
    type: 'Tax',
    date: '2023-12-31',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Aylık Gelir-Gider Raporu',
    period: 'Şubat 2024',
    type: 'Income/Expense',
    date: '2024-02-29',
    status: 'pending',
  },
]

const reportCategories = [
  { name: 'Gelir-Gider', count: 12, icon: FileText },
  { name: 'Yatırım', count: 5, icon: Calendar },
  { name: 'Vergi', count: 3, icon: FileText },
  { name: 'Özel', count: 2, icon: FileText },
]

export default function ReportsPage() {
  return (
    <DashboardLayout>
      {/* Page Title */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Raporlar</h1>
            <p className="text-gray-500 mt-1">
              Finansal raporlarınızı görüntüleyin ve indirin
            </p>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
            <FileText size={20} />
            <span>Yeni Rapor Oluştur</span>
          </button>
        </div>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {reportCategories.map((category, index) => {
          const Icon = category.icon
          return (
            <div key={index} className="card card-hover">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Icon className="text-primary-600" size={20} />
                </div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{category.count}</p>
              <p className="text-sm text-gray-500">Rapor</p>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Filter size={20} />
            <span className="font-medium">Filtrele:</span>
          </div>
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Tümü
          </button>
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Bu Ay
          </button>
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Bu Yıl
          </button>
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Özel Tarih
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Son Raporlar</h2>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <FileText className="text-primary-600" size={24} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{report.title}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">{report.period}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(report.date).toLocaleDateString('tr-TR')}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        report.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {report.status === 'completed' ? 'Tamamlandı' : 'Beklemede'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <FileText size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="mt-6 card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4">Hızlı Rapor Şablonları</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all text-left">
            <h4 className="font-medium text-gray-900 mb-1">Aylık Özet</h4>
            <p className="text-sm text-gray-500">Gelir ve giderlerinizin aylık özeti</p>
          </button>
          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all text-left">
            <h4 className="font-medium text-gray-900 mb-1">Yatırım Analizi</h4>
            <p className="text-sm text-gray-500">Portföy performans analizi</p>
          </button>
          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all text-left">
            <h4 className="font-medium text-gray-900 mb-1">Vergi Raporu</h4>
            <p className="text-sm text-gray-500">Yıllık vergi beyannamesi için hazır rapor</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

