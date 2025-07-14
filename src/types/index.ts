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
  make: string;
  model: string;
  year: number;
  msrp: number;
  usedPrices: Record<string, number>; // mileage -> price
  mpg: number;
  maintenanceByMileage: Record<string, number>; // mileage -> maintenance cost
  insuranceByState: Record<string, number>; // state -> annual insurance
  taxRate: number;
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