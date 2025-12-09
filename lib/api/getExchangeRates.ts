/**
 * Döviz kurları API fonksiyonu
 * ExchangeRate-API kullanarak USD ve EUR kurlarını TRY cinsinden getirir
 */

export interface ExchangeRate {
  usd: number | null
  eur: number | null
  loading: boolean
  error: string | null
  lastUpdate: Date | null
}

export interface ExchangeRateResponse {
  usd: number | null
  eur: number | null
}

export async function getExchangeRates(): Promise<ExchangeRateResponse> {
  try {
    const usdResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    const eurResponse = await fetch('https://api.exchangerate-api.com/v4/latest/EUR')
    
    if (!usdResponse.ok || !eurResponse.ok) {
      throw new Error('API yanıtı başarısız')
    }

    const usdData = await usdResponse.json()
    const eurData = await eurResponse.json()

    // API'den gelen TRY kurlarını alıyoruz
    const usdRate = usdData.rates?.TRY || null
    const eurRate = eurData.rates?.TRY || null

    return {
      usd: usdRate,
      eur: eurRate,
    }
  } catch (error) {
    console.error('Döviz kuru hatası:', error)
    throw error
  }
}

