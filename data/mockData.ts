/**
 * Mock Data Dosyası
 * Dashboard için örnek finansal veriler
 */

// Gelir/Gider zaman serisi verileri
export const incomeExpenseData = [
  { month: 'Ocak', income: 45000, expense: 32000 },
  { month: 'Şubat', income: 52000, expense: 38000 },
  { month: 'Mart', income: 48000, expense: 35000 },
  { month: 'Nisan', income: 61000, expense: 42000 },
  { month: 'Mayıs', income: 55000, expense: 39000 },
  { month: 'Haziran', income: 67000, expense: 45000 },
  { month: 'Temmuz', income: 59000, expense: 41000 },
  { month: 'Ağustos', income: 64000, expense: 44000 },
  { month: 'Eylül', income: 58000, expense: 40000 },
  { month: 'Ekim', income: 70000, expense: 48000 },
  { month: 'Kasım', income: 65000, expense: 43000 },
  { month: 'Aralık', income: 72000, expense: 50000 },
];

// Gider kategorileri dağılımı
export const expenseCategories = [
  { name: 'Kira', value: 18000, color: '#3b82f6' },
  { name: 'Yemek', value: 12000, color: '#10b981' },
  { name: 'Ulaşım', value: 8000, color: '#f59e0b' },
  { name: 'Eğlence', value: 6000, color: '#ef4444' },
  { name: 'Sağlık', value: 4000, color: '#8b5cf6' },
  { name: 'Diğer', value: 2000, color: '#6b7280' },
];

// Özet kartlar için veriler
export const summaryData = {
  netCashFlow: {
    value: 245000,
    change: 12.5,
    isPositive: true,
  },
  grossProfitMargin: {
    value: 68.5,
    change: 3.2,
    isPositive: true,
  },
  totalIncome: {
    value: 716000,
    change: 8.7,
    isPositive: true,
  },
  totalExpense: {
    value: 471000,
    change: -5.3,
    isPositive: false,
  },
};

// Finansal sağlık skoru (0-100)
export const financialHealthScore = 78;

