# DriveWise - Free Car TCO Optimizer

A React Native app that helps users calculate the Total Cost of Ownership (TCO) for cars using real data from free APIs.

## 🚗 Features

- **Real Vehicle Data**: Fetches actual car makes and models from NHTSA and CarQuery APIs
- **TCO Calculator**: Comprehensive cost analysis including depreciation, fuel, insurance, maintenance, and taxes
- **Car Comparison**: Side-by-side comparison of up to 2 vehicles
- **Personalized Recommendations**: AI-powered suggestions based on user profile
- **Smart Alerts**: Price change and maintenance notifications
- **User Profiles**: Save preferences and driving habits

## 🆓 Free APIs Used

- **NHTSA API**: Vehicle specifications and safety data (no API key required)
- **CarQuery API**: Comprehensive vehicle data including MPG, specs (no API key required)
- **Mock Data**: Realistic fallback data for fuel prices, insurance, and taxes

## 🛠 Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Zustand** for state management
- **AsyncStorage** for data persistence
- **React Navigation** for routing

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on iOS**:
   ```bash
   npm run ios
   ```

4. **Run on Android**:
   ```bash
   npm run android
   ```

## 📱 App Structure

```
src/
├── screens/          # App screens
├── services/         # API services (NHTSA, CarQuery)
├── store/           # State management
├── utils/           # TCO calculations
├── types/           # TypeScript definitions
├── data/            # Mock data and constants
└── constants/       # App constants
```

## 🔧 API Integration

The app automatically fetches real vehicle data from:
- **NHTSA API**: `https://vpic.nhtsa.dot.gov/api/`
- **CarQuery API**: `https://www.carqueryapi.com/api/1.0/`

No API keys required - completely free to use!

## 📊 Data Sources

- **Vehicle Data**: NHTSA + CarQuery APIs
- **Fuel Prices**: Mock data (realistic estimates)
- **Insurance Rates**: Mock data (state-specific)
- **Tax Rates**: Mock data (state-specific)
- **Depreciation**: Calculated based on make/model

## 🎯 Core Features

1. **Home Screen**: Personalized car recommendations
2. **TCO Optimizer**: Detailed cost calculations
3. **Car Comparison**: Side-by-side analysis
4. **Depreciation Explorer**: Value over time
5. **Smart Alerts**: Price and maintenance notifications
6. **Profile Management**: User preferences

## 📈 Future Enhancements

- Integrate EIA API for real fuel prices
- Add more vehicle makes and models
- Implement real-time market data
- Enhanced depreciation algorithms

## 🤝 Contributing

Feel free to contribute by:
- Adding more vehicle data sources
- Improving TCO calculations
- Enhancing the UI/UX
- Adding new features

## 📄 License

This project is open source and available under the MIT License.
