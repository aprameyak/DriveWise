# DriveWise

A mobile app that estimates the total cost of owning a car (depreciation, fuel, insurance, maintenance, taxes and fees) based on your budget, annual mileage, ownership length, and ZIP code, and ranks cars by that cost. Built with Expo and React Native.

The repo also contains the app's companion website in `webapp/` (landing, support, and privacy pages), deployed at https://drivewise-admin.vercel.app.

## Features

- Onboarding that collects annual mileage, driving type, ownership duration, maintenance tolerance, budget range, and ZIP code.
- Home screen with up to 8 cars in your budget, sorted by estimated total cost, with cost per mile, a confidence score, and short reasons (fuel economy, reliability, safety).
- TCO Optimizer screen with a per-category cost breakdown for a single car.
- Side-by-side comparison of two cars, and a depreciation explorer with a table of projected resale value by mileage.
- Risk flags on each car in the comparison list: asking price under $8,000 and a reliability score under 75 out of 100.
- Deal check: enter a dealer offer (monthly payment, documentation fee, add-ons, total) and see flags for a documentation fee over $500 or more than two add-ons.
- Price check: record listing prices you have seen (model, price, and optional mileage and year) and get the median, low, high, and count for a model. Each listing also shows risk flags, including mileage over 150,000.
- Buying checklist: purchase tasks with a category, priority (low, medium, high), and deadline that you can mark done, with pending and completed counts.
- Alerts screen and a profile screen for editing preferences.

## Data and limitations

- Car makes, models, and specs are fetched from the public CarQuery and NHTSA vPIC APIs (no key required), cached for 24 hours, and limited to 50 cars. If both requests fail, the app uses the bundled list in `src/data/cars.ts`.
- Prices, MSRP, used-price curves, maintenance costs, reliability, and safety ratings are estimated in code from the make and model, not pulled from a pricing source. Fuel prices, insurance rates, and tax rates are fixed defaults in `src/services/dataService.ts`.
- ZIP-to-state lookup covers only five ZIP codes (`src/data/zipToState.ts`); others default to California rates.
- Reliability scores for risk flags come from a small table covering the Honda Civic, Toyota Camry, Ford Focus, and Chevy Cruze. Other cars use their estimated reliability rating, scaled to 100.
- Deal check, price check, and the buying checklist work only with figures you enter. Listings and tasks are stored on the device; deal checks are not saved.
- Alerts are generated locally from a hardcoded list of price changes and a random maintenance reminder, not from live tracking.
- Sign-in is local only: any email with a password of six or more characters is accepted and stored in AsyncStorage. There is no backend.

## Tech stack

- Mobile: Expo SDK 53, React Native 0.79, React 19, TypeScript
- Navigation: React Navigation (native stack and bottom tabs)
- State: Zustand persisted to AsyncStorage
- Website (`webapp/`): Next.js 14, React 18, TypeScript, Tailwind CSS

## Getting started

Prerequisites: Node 20 (used in CI), npm, and Expo Go on a device or an iOS/Android simulator. No environment variables are needed.

Mobile app:

```bash
npm install
npm start          # expo start; scan the QR code with Expo Go
npm run ios        # expo start --ios
npm run android    # expo start --android
```

Website:

```bash
cd webapp
npm install
npm run dev        # http://localhost:3000
```

There are no tests. CI runs `npx tsc --noEmit` at the root and `npm run build` in `webapp/`.

## How it works

- `App.tsx` sets up navigation: an onboarding and login stack, then a bottom tab bar (Home, TCO Optimizer, Compare, Depreciation, Alerts, Buying) plus Profile, Deal Check, Price Check, and Buying Checklist screens. The Buying tab links to the last three. Screens live in `src/screens/`.
- `src/services/dataService.ts` fetches and caches car data and supplies fuel, insurance, tax, and ZIP lookups.
- `src/utils/calculateTCO.ts` computes the cost breakdown, interpolating used prices and maintenance costs by total ownership miles.
- `src/utils/riskFlags.ts`, `src/utils/auditDeal.ts`, and `src/utils/marketStats.ts` hold the risk, deal, and price rules. Their thresholds and the reliability table are in `src/constants/index.ts`.
- `src/store/authStore.ts` and `src/store/userProfileStore.ts` hold the session and the onboarding profile. `src/store/priceCheckStore.ts` and `src/store/checklistStore.ts` hold price check listings and checklist tasks.
- `src/services/alertsService.ts` builds the alert list. Shared types are in `src/types/index.ts`.

## Project structure

```
App.tsx              navigation root
src/screens/         app screens
src/services/        car data and alerts
src/store/           Zustand stores
src/utils/           TCO calculation and buying checks
src/data/            fallback car list and ZIP lookup
assets/              app icons and splash image
scripts/             icon generation
webapp/              Next.js website (landing, support, privacy)
```

## Contributing

Issues and pull requests are welcome. Before opening a PR, run `npx tsc --noEmit` at the repo root and `npm run build` in `webapp/`.

## License

MIT, see [LICENSE](LICENSE).
