// Component Props Interfaces
export interface HeaderProps {
  // Currently no props needed, but can be extended
}

export interface FooterProps {
  // Currently no props needed, but can be extended
}

export interface FAQItemProps {
  question: string
  answer: string
}

export interface SupportPageProps {
  // Currently no props needed, but can be extended
}

export interface PrivacyPageProps {
  // Currently no props needed, but can be extended
}

export interface HomePageProps {
  // Currently no props needed, but can be extended
}

// App-specific types
export interface CarData {
  id: string
  make: string
  model: string
  year: number
  price: number
  tco: number
  reliability: number
  safety: number
}

export interface UserPreferences {
  budget: number
  location: string
  drivingHabits: string
  preferredFeatures: string[]
}

export interface AlertSettings {
  vehicleId: string
  priceThreshold: number
  enabled: boolean
  type: 'price_drop' | 'maintenance' | 'optimal_timing'
}
