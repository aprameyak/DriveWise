export interface TCOInput {
  make: string;
  model: string;
  year: number;
  purchasePrice: number;
  ownershipYears: number;
  annualMileage: number;
  zipCode: string;
}

export interface TCOOutput {
  totalCost: number;
  costPerMile: number;
  costPerYear: number;
  resaleValue: number;
  breakdown: {
    depreciation: number;
    fuel: number;
    insurance: number;
    maintenance: number;
    taxesAndFees: number;
  };
}

export interface CarData {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  msrp: number;
  image: string;
  fuelType: 'Gasoline' | 'Hybrid' | 'Electric' | 'Diesel';
  mpg: {
    city: number;
    highway: number;
    combined: number;
  };
  size: 'Compact' | 'Midsize' | 'Full-size' | 'SUV' | 'Truck' | 'Luxury';
  reliability: number;
  safetyRating: number;
  features: string[];
  usedPrices: Record<string, number>;
  maintenanceByMileage: Record<string, number>;
  insuranceByState: Record<string, number>;
  taxRate: number;
  depreciation: DepreciationPoint[];
  tcoData: TCOData;
}

export interface DepreciationPoint {
  year: number;
  value: number;
  percentage: number;
}

export interface TCOData {
  depreciation: number;
  fuelCosts: number;
  insurance: number;
  maintenance: number;
  financing: number;
  total: number;
}

export interface UserProfile {
  id: string;
  email: string;
  annualMileage: number;
  usageType: 'city' | 'highway' | 'mixed';
  ownershipDuration: number;
  maintenanceTolerance: 'low' | 'medium' | 'high';
  budgetRange: {
    min: number;
    max: number;
  };
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CarRecommendation {
  car: CarData;
  tcoCalculation: TCOOutput;
  recommendation: {
    buyAtMileage: number;
    sellAtMileage: number;
    buyPrice: number;
    sellPrice: number;
    confidence: number;
    reasoning: string[];
  };
}

export interface ComparisonResult {
  cars: CarRecommendation[];
  winner: CarRecommendation;
  savings: number;
  analysis: {
    bestValue: CarRecommendation;
    bestReliability: CarRecommendation;
    bestFuelEfficiency: CarRecommendation;
  };
}

export interface Alert {
  id: string;
  type: 'price_change' | 'buy_window' | 'sell_window' | 'maintenance';
  title: string;
  message: string;
  carId?: string;
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
  createdAt: Date;
}

export interface DepreciationData {
  year: number;
  mileage: number;
  value: number;
  confidence: number;
}

export interface NavigationProps {
  Home: undefined;
  Onboarding: undefined;
  TCOOptimizer: { carId?: string };
  CarCompare: { carIds?: string[] };
  DepreciationExplorer: undefined;
  Alerts: undefined;
  Profile: undefined;
}

export type RootStackParamList = NavigationProps;

export interface UserPreferences {
  budget: {
    min: number;
    max: number;
  };
  fuelType: string[];
  size: string[];
  priorityFactors: {
    fuel: number;
    reliability: number;
    safety: number;
    depreciation: number;
  };
} 