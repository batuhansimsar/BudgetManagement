# Dashboard - Finansal Yönetim Uygulaması

Modern, responsive ve component-based bir finansal dashboard arayüzü.

## 🚀 Özellikler

- ✅ **Responsive Tasarım**: Mobil ve desktop uyumlu
- ✅ **Modern UI**: Tailwind CSS ile şık ve minimal tasarım
- ✅ **Component-Based**: Yeniden kullanılabilir component yapısı
- ✅ **Canlı Döviz Kurları**: API entegrasyonu ile gerçek zamanlı veriler
- ✅ **İnteraktif Grafikler**: Recharts ile gelişmiş görselleştirmeler
- ✅ **TypeScript**: Tip güvenliği ile geliştirilmiş

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🏗️ Proje Yapısı

```
Project/
├── app/
│   ├── layout.tsx          # Ana layout
│   ├── page.tsx            # Dashboard ana sayfası
│   └── globals.css         # Global stiller
├── components/
│   ├── Sidebar.tsx         # Yan menü component'i
│   ├── Header.tsx          # Üst başlık component'i
│   ├── SummaryCard.tsx     # Özet kart component'i
│   ├── AreaChartCard.tsx   # Alan grafiği component'i
│   ├── DonutChartCard.tsx  # Donut grafik component'i
│   ├── GaugeCard.tsx       # Gauge gösterge component'i
│   └── LiveMarketCard.tsx  # Canlı piyasa verileri component'i
├── data/
│   └── mockData.ts         # Mock veri dosyası
└── package.json
```

## 🧩 Component'ler

### SummaryCard
Yeniden kullanılabilir özet kart component'i. 4 farklı metrik için kullanılıyor:
- Net Nakit Akışı
- Brüt Kar Marjı
- Toplam Gelir
- Toplam Gider

### Sidebar
Responsive navigasyon menüsü. Mobilde açılır/kapanır özellikli.

### Header
Arama çubuğu, bildirim ikonu ve profil avatar içeren üst başlık.

### AreaChartCard
Gelir ve gider trendini gösteren alan grafiği.

### DonutChartCard
Gider kategorilerinin dağılımını gösteren donut grafik.

### GaugeCard
Finansal sağlık skorunu gösteren gauge-style gösterge.

### LiveMarketCard
Canlı döviz kurlarını gösteren API entegrasyonlu component. USD/TRY ve EUR/TRY kurlarını gösterir.

## 🔌 API Entegrasyonu

Canlı döviz kurları için [Frankfurter API](https://api.frankfurter.app) kullanılmaktadır.

- Otomatik güncelleme: Her 5 dakikada bir
- Manuel yenileme: Yenile butonu ile
- Hata yönetimi: API hatalarında kullanıcıya bilgi gösterimi

## 🎨 Stil ve Tasarım

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Grafikler**: Recharts
- **İkonlar**: Lucide React

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Geliştirme

```bash
# Production build
npm run build

# Production sunucusunu başlat
npm start

# Linting
npm run lint
```

## 📝 Notlar

- Mock data kullanılmaktadır, gerçek API entegrasyonu için `data/mockData.ts` dosyasını güncelleyin.
- Döviz kurları API'si için alternatif API'ler kullanılabilir (TCMB, ExchangeRate-API vb.)

