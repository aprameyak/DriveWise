# DriveWise: Used Car TCO Optimizer

A React Native app built with Expo and TypeScript that helps users calculate and optimize the Total Cost of Ownership (TCO) for used cars.

## Features

- **TCO Calculation**: Calculate total cost of ownership including depreciation, fuel, insurance, maintenance, and taxes
- **Car Recommendations**: Get personalized car recommendations based on your driving habits
- **Car Comparison**: Compare multiple vehicles side-by-side
- **Depreciation Explorer**: Visualize depreciation curves and resale forecasts
- **Alerts**: Get notified about price changes and optimal buying/selling windows
- **User Authentication**: Secure login and signup with Firebase (mock implementation)

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Zustand** for state management
- **Expo Vector Icons** for icons
- **React Native Safe Area Context** for safe area handling

## Project Structure

```
src/
├── screens/           # App screens
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── TCOOptimizerScreen.tsx
│   ├── CarCompareScreen.tsx
│   ├── DepreciationExplorerScreen.tsx
│   ├── AlertsScreen.tsx
│   ├── ProfileScreen.tsx
│   └── OnboardingScreen.tsx
├── data/             # Mock data
│   ├── cars.ts       # Car database
│   └── zipToState.ts # ZIP to state mapping
├── utils/            # Utility functions
│   ├── calculateTCO.ts
│   └── tcoCalculator.ts
├── store/            # State management
│   ├── authStore.ts  # Authentication store
│   └── index.ts
├── types/            # TypeScript types
│   └── index.ts
└── constants/        # App constants
    └── index.ts
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npx expo start
   ```

3. **Run on device/simulator**:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app

## Current Status

✅ **Completed**:
- Basic app structure and navigation
- Authentication flow (mock)
- Home screen with car recommendations
- TCO calculation engine
- Mock car database
- TypeScript types and interfaces

🔄 **In Progress**:
- Enhanced TCO Optimizer screen
- Car comparison functionality
- Depreciation visualization
- Alert system
- Profile management

📋 **Planned**:
- Firebase integration
- Real-time data
- Push notifications
- Advanced filtering
- Charts and graphs

## TCO Calculation

The app calculates Total Cost of Ownership using:
- **Depreciation**: Based on age, mileage, and market data
- **Fuel Costs**: Based on MPG and annual mileage
- **Insurance**: State-based rates
- **Maintenance**: Mileage-based service intervals
- **Taxes & Fees**: Registration, sales tax, etc.

## Contributing

This is a demo project showcasing React Native development with modern tools and best practices. 