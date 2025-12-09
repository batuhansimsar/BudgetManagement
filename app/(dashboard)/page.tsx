'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import SummaryCard from '@/components/dashboard/SummaryCard'
import AreaChartCard from '@/components/charts/AreaChartCard'
import DonutChartCard from '@/components/charts/DonutChartCard'
import GaugeCard from '@/components/charts/GaugeCard'
import LiveMarketCard from '@/components/dashboard/LiveMarketCard'
import { summaryData } from '@/data/mockData'
import { Wallet, TrendingUp, DollarSign, TrendingDown } from 'lucide-react'

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Finansal durumunuzun genel görünümü
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Net Nakit Akışı"
          value={summaryData.netCashFlow.value}
          change={summaryData.netCashFlow.change}
          isPositive={summaryData.netCashFlow.isPositive}
          icon={<Wallet className="text-primary-600" size={24} />}
        />
        <SummaryCard
          title="Brüt Kar Marjı"
          value={summaryData.grossProfitMargin.value}
          change={summaryData.grossProfitMargin.change}
          isPositive={summaryData.grossProfitMargin.isPositive}
          icon={<TrendingUp className="text-primary-600" size={24} />}
        />
        <SummaryCard
          title="Toplam Gelir"
          value={summaryData.totalIncome.value}
          change={summaryData.totalIncome.change}
          isPositive={summaryData.totalIncome.isPositive}
          icon={<DollarSign className="text-primary-600" size={24} />}
        />
        <SummaryCard
          title="Toplam Gider"
          value={summaryData.totalExpense.value}
          change={summaryData.totalExpense.change}
          isPositive={summaryData.totalExpense.isPositive}
          icon={<TrendingDown className="text-primary-600" size={24} />}
        />
      </div>

      {/* Charts and Market Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Area Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <AreaChartCard />
        </div>

        {/* Live Market Data */}
        <div>
          <LiveMarketCard />
        </div>
      </div>

      {/* Bottom Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <DonutChartCard />

        {/* Gauge Chart */}
        <GaugeCard />
      </div>
    </DashboardLayout>
  )
}

