export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  fuelType: 'Gasoline' | 'Hybrid' | 'Electric' | 'Diesel';
  mpg: {
    city: number;
    highway: number;
    combined: number;
  };
  size: 'Compact' | 'Midsize' | 'Full-size' | 'SUV' | 'Truck' | 'Luxury';
  reliability: number; // 1-10 scale
  safetyRating: number; // 1-5 scale
  features: string[];
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