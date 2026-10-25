export interface HeaderProps {
}

export interface FooterProps {
}

export interface FAQItemProps {
  question: string
  answer: string
}

export interface SupportPageProps {
}

export interface PrivacyPageProps {
}

export interface HomePageProps {
}

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
