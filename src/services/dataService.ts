import { CarData } from '../types';

// API endpoints
const NHTSA_BASE_URL = 'https://vpic.nhtsa.dot.gov/api';

export interface FuelPriceData {
  gasoline: number;
  diesel: number;
  electric: number; // per kWh
  lastUpdated: Date;
}

export interface InsuranceRateData {
  state: string;
  baseRate: number;
  perYearMultiplier: number;
  perMileageMultiplier: number;
}

export interface TaxRateData {
  state: string;
  salesTax: number;
  annualTax: number;
  registrationFee: number;
}

interface NHTSAMake {
  Make_ID: number;
  Make_Name: string;
}

interface NHTSAModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

interface NHTSAVehicleType {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

class DataService {
  private fuelPrices: FuelPriceData | null = null;
  private insuranceRates: InsuranceRateData[] = [];
  private taxRates: TaxRateData[] = [];
  private carData: CarData[] = [];
  private lastFetch: Date | null = null;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  async getCarData(): Promise<CarData[]> {
    if (this.shouldUseCache() && this.carData.length > 0) {
      return this.carData;
    }

    try {
      console.log('Fetching car data from NHTSA API...');
      
      // Get popular makes
      const popularMakes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Tesla', 'Hyundai', 'Mazda', 'Subaru'];
      const cars: CarData[] = [];
      
      for (const makeName of popularMakes) {
        try {
          // Get models for this make
          const modelsResponse = await fetch(
            `${NHTSA_BASE_URL}/vehicles/GetModelsForMake/${makeName}?format=json`
          );
          
          if (!modelsResponse.ok) {
            console.warn(`Failed to fetch models for ${makeName}`);
            continue;
          }
          
          const modelsData = await modelsResponse.json();
          
          if (modelsData.Results && modelsData.Results.length > 0) {
            // Take the first few models for each make
            const modelsToProcess = modelsData.Results.slice(0, 3);
            
            for (const model of modelsToProcess) {
              try {
                // Get vehicle types for this make/model
                const vehicleTypesResponse = await fetch(
                  `${NHTSA_BASE_URL}/vehicles/GetVehicleTypesForMakeId/${model.Make_ID}?format=json`
                );
                
                if (vehicleTypesResponse.ok) {
                  const vehicleTypesData = await vehicleTypesResponse.json();
                  
                  // Create car data for different years
                  const years = [2024, 2023, 2022];
                  
                  for (const year of years) {
                    const car: CarData = {
                      id: `${makeName}-${model.Model_Name}-${year}`,
                      make: makeName,
                      model: model.Model_Name,
                      year: year,
                      price: this.estimatePrice(makeName, model.Model_Name, year),
                      msrp: this.estimateMSRP(makeName, model.Model_Name, year),
                      image: this.getCarImage(makeName, model.Model_Name),
                      fuelType: this.determineFuelType(makeName, model.Model_Name),
                      mpg: this.estimateMPG(makeName, model.Model_Name),
                      size: this.determineSize(makeName, model.Model_Name),
                      reliability: this.estimateReliability(makeName),
                      safetyRating: this.estimateSafetyRating(makeName),
                      features: this.getDefaultFeatures(makeName, model.Model_Name),
                      usedPrices: this.generateUsedPrices(makeName, model.Model_Name, year),
                      maintenanceByMileage: this.generateMaintenanceCosts(makeName, model.Model_Name),
                      insuranceByState: this.generateInsuranceRates(makeName, model.Model_Name),
                      taxRate: 0.08,
                      depreciation: this.generateDepreciation(makeName, model.Model_Name, year),
                      tcoData: this.generateTCOData(makeName, model.Model_Name, year),
                    };
                    
                    cars.push(car);
                  }
                }
              } catch (error) {
                console.warn(`Error processing model ${model.Model_Name}:`, error);
              }
            }
          }
          
          // Add delay to respect rate limits
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          console.warn(`Error fetching data for make ${makeName}:`, error);
        }
      }
      
      this.carData = cars;
      this.lastFetch = new Date();
      
      console.log(`Successfully fetched ${cars.length} cars from NHTSA API`);
      return cars;
      
    } catch (error) {
      console.warn('Failed to fetch car data from NHTSA, using fallback:', error);
      // Fallback to mock data
      const { ALL_CARS } = await import('../data/cars');
      return ALL_CARS;
    }
  }

  async getFuelPrices(): Promise<FuelPriceData> {
    if (this.shouldUseCache()) {
      return this.fuelPrices || this.getDefaultFuelPrices();
    }

    try {
      // For now, use realistic mock data
      // TODO: Integrate with EIA API when you get the API key
      this.fuelPrices = {
        gasoline: 3.85,
        diesel: 4.25,
        electric: 0.14,
        lastUpdated: new Date(),
      };
      this.lastFetch = new Date();
      return this.fuelPrices;
    } catch (error) {
      console.warn('Failed to fetch fuel prices, using defaults:', error);
      return this.getDefaultFuelPrices();
    }
  }

  async getInsuranceRates(): Promise<InsuranceRateData[]> {
    if (this.shouldUseCache()) {
      return this.insuranceRates.length > 0 ? this.insuranceRates : this.getDefaultInsuranceRates();
    }

    try {
      // For now, use realistic mock data
      // TODO: Integrate with insurance APIs
      this.insuranceRates = this.getDefaultInsuranceRates();
      this.lastFetch = new Date();
      return this.insuranceRates;
    } catch (error) {
      console.warn('Failed to fetch insurance rates, using defaults:', error);
      return this.getDefaultInsuranceRates();
    }
  }

  async getTaxRates(): Promise<TaxRateData[]> {
    if (this.shouldUseCache()) {
      return this.taxRates.length > 0 ? this.taxRates : this.getDefaultTaxRates();
    }

    try {
      // For now, use realistic mock data
      // TODO: Integrate with tax APIs
      this.taxRates = this.getDefaultTaxRates();
      this.lastFetch = new Date();
      return this.taxRates;
    } catch (error) {
      console.warn('Failed to fetch tax rates, using defaults:', error);
      return this.getDefaultTaxRates();
    }
  }

  async getZipToStateMapping(): Promise<Record<string, string>> {
    try {
      // For now, return the existing mapping
      // TODO: Integrate with ZIP code API
      const { ZIP_TO_STATE } = await import('../data/zipToState');
      return ZIP_TO_STATE;
    } catch (error) {
      console.warn('Failed to fetch ZIP to state mapping:', error);
      return {};
    }
  }

  private shouldUseCache(): boolean {
    if (!this.lastFetch) return false;
    return Date.now() - this.lastFetch.getTime() < this.CACHE_DURATION;
  }

  // Helper methods for generating realistic data
  private estimatePrice(make: string, model: string, year: number): number {
    const basePrices: Record<string, number> = {
      'Toyota': 28000,
      'Honda': 32000,
      'Ford': 35000,
      'BMW': 45000,
      'Tesla': 40000,
      'Hyundai': 25000,
      'Mazda': 27000,
      'Subaru': 30000,
    };
    
    const basePrice = basePrices[make] || 30000;
    const yearMultiplier = 1 - (2024 - year) * 0.1;
    return Math.round(basePrice * yearMultiplier);
  }

  private estimateMSRP(make: string, model: string, year: number): number {
    return this.estimatePrice(make, model, year) * 1.2;
  }

  private getCarImage(make: string, model: string): string {
    // Use Unsplash images based on make/model
    const imageMap: Record<string, string> = {
      'Toyota': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
      'Honda': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500',
      'Ford': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500',
      'BMW': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
      'Tesla': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500',
      'Hyundai': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500',
      'Mazda': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
      'Subaru': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500',
    };
    
    return imageMap[make] || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500';
  }

  private determineFuelType(make: string, model: string): 'Gasoline' | 'Hybrid' | 'Electric' | 'Diesel' {
    const modelLower = model.toLowerCase();
    if (make === 'Tesla') return 'Electric';
    if (modelLower.includes('hybrid')) return 'Hybrid';
    if (modelLower.includes('diesel')) return 'Diesel';
    return 'Gasoline';
  }

  private estimateMPG(make: string, model: string): { city: number; highway: number; combined: number } {
    const baseMPG: Record<string, number> = {
      'Toyota': 32,
      'Honda': 31,
      'Ford': 25,
      'BMW': 30,
      'Tesla': 136, // MPGe
      'Hyundai': 33,
      'Mazda': 30,
      'Subaru': 28,
    };
    
    const combined = baseMPG[make] || 30;
    return {
      city: Math.round(combined * 0.9),
      highway: Math.round(combined * 1.1),
      combined: combined,
    };
  }

  private determineSize(make: string, model: string): 'Compact' | 'Midsize' | 'Full-size' | 'SUV' | 'Truck' | 'Luxury' {
    if (make === 'BMW') return 'Luxury';
    if (make === 'Ford' && model.toLowerCase().includes('f-')) return 'Truck';
    if (model.toLowerCase().includes('suv') || model.toLowerCase().includes('cr-v')) return 'SUV';
    return 'Midsize';
  }

  private estimateReliability(make: string): number {
    const reliabilityScores: Record<string, number> = {
      'Toyota': 9,
      'Honda': 8,
      'Ford': 7,
      'BMW': 6,
      'Tesla': 7,
      'Hyundai': 8,
      'Mazda': 8,
      'Subaru': 8,
    };
    
    return reliabilityScores[make] || 7;
  }

  private estimateSafetyRating(make: string): number {
    const safetyScores: Record<string, number> = {
      'Toyota': 5,
      'Honda': 5,
      'Ford': 5,
      'BMW': 5,
      'Tesla': 5,
      'Hyundai': 4,
      'Mazda': 4,
      'Subaru': 5,
    };
    
    return safetyScores[make] || 4;
  }

  private getDefaultFeatures(make: string, model: string): string[] {
    const baseFeatures = ['Backup Camera', 'Bluetooth'];
    
    if (make === 'BMW' || make === 'Tesla') {
      return [...baseFeatures, 'Navigation', 'Premium Audio', 'Leather Seats'];
    }
    
    if (make === 'Toyota' || make === 'Honda') {
      return [...baseFeatures, 'Apple CarPlay', 'Android Auto', 'Safety Suite'];
    }
    
    return baseFeatures;
  }

  private generateUsedPrices(make: string, model: string, year: number): Record<string, number> {
    const basePrice = this.estimatePrice(make, model, year);
    return {
      "20000": Math.round(basePrice * 0.8),
      "40000": Math.round(basePrice * 0.7),
      "60000": Math.round(basePrice * 0.6),
      "80000": Math.round(basePrice * 0.5),
    };
  }

  private generateMaintenanceCosts(make: string, model: string): Record<string, number> {
    const baseCost = make === 'BMW' ? 1200 : make === 'Tesla' ? 300 : 600;
    return {
      "20000": baseCost,
      "40000": baseCost * 2,
      "60000": baseCost * 3.5,
      "80000": baseCost * 5,
    };
  }

  private generateInsuranceRates(make: string, model: string): Record<string, number> {
    const baseRate = make === 'BMW' ? 2500 : make === 'Tesla' ? 2000 : 1600;
    return {
      "CA": baseRate,
      "TX": baseRate * 0.9,
      "NY": baseRate * 1.1,
    };
  }

  private generateDepreciation(make: string, model: string, year: number): Array<{ year: number; value: number; percentage: number }> {
    const basePrice = this.estimatePrice(make, model, year);
    const depreciationRate = make === 'BMW' ? 0.24 : make === 'Tesla' ? 0.20 : 0.15;
    
    return [
      { year: 0, value: basePrice, percentage: 0 },
      { year: 1, value: Math.round(basePrice * (1 - depreciationRate)), percentage: Math.round(depreciationRate * 100) },
      { year: 2, value: Math.round(basePrice * (1 - depreciationRate * 1.5)), percentage: Math.round(depreciationRate * 1.5 * 100) },
      { year: 3, value: Math.round(basePrice * (1 - depreciationRate * 2)), percentage: Math.round(depreciationRate * 2 * 100) },
      { year: 4, value: Math.round(basePrice * (1 - depreciationRate * 2.4)), percentage: Math.round(depreciationRate * 2.4 * 100) },
      { year: 5, value: Math.round(basePrice * (1 - depreciationRate * 2.7)), percentage: Math.round(depreciationRate * 2.7 * 100) },
    ];
  }

  private generateTCOData(make: string, model: string, year: number): { depreciation: number; fuelCosts: number; insurance: number; maintenance: number; financing: number; total: number } {
    const basePrice = this.estimatePrice(make, model, year);
    const depreciation = basePrice * 0.4;
    const fuelCosts = make === 'Tesla' ? 3200 : 8500;
    const insurance = make === 'BMW' ? 8500 : make === 'Tesla' ? 7200 : 6000;
    const maintenance = make === 'BMW' ? 7500 : make === 'Tesla' ? 2800 : 4200;
    const financing = basePrice * 0.08;
    const total = depreciation + fuelCosts + insurance + maintenance + financing;
    
    return {
      depreciation: Math.round(depreciation),
      fuelCosts: Math.round(fuelCosts),
      insurance: Math.round(insurance),
      maintenance: Math.round(maintenance),
      financing: Math.round(financing),
      total: Math.round(total),
    };
  }

  private getDefaultFuelPrices(): FuelPriceData {
    return {
      gasoline: 3.50,
      diesel: 4.20,
      electric: 0.12,
      lastUpdated: new Date(),
    };
  }

  private getDefaultInsuranceRates(): InsuranceRateData[] {
    return [
      { state: 'CA', baseRate: 1200, perYearMultiplier: 50, perMileageMultiplier: 0.02 },
      { state: 'TX', baseRate: 1100, perYearMultiplier: 45, perMileageMultiplier: 0.018 },
      { state: 'NY', baseRate: 1400, perYearMultiplier: 60, perMileageMultiplier: 0.025 },
      { state: 'FL', baseRate: 1300, perYearMultiplier: 55, perMileageMultiplier: 0.022 },
      { state: 'IL', baseRate: 1150, perYearMultiplier: 48, perMileageMultiplier: 0.019 },
      { state: 'GA', baseRate: 1050, perYearMultiplier: 42, perMileageMultiplier: 0.017 },
    ];
  }

  private getDefaultTaxRates(): TaxRateData[] {
    return [
      { state: 'CA', salesTax: 0.085, annualTax: 0.02, registrationFee: 60 },
      { state: 'TX', salesTax: 0.0625, annualTax: 0.015, registrationFee: 50 },
      { state: 'NY', salesTax: 0.08, annualTax: 0.025, registrationFee: 70 },
      { state: 'FL', salesTax: 0.06, annualTax: 0.01, registrationFee: 45 },
      { state: 'IL', salesTax: 0.0625, annualTax: 0.018, registrationFee: 55 },
      { state: 'GA', salesTax: 0.04, annualTax: 0.012, registrationFee: 40 },
    ];
  }

  // Clear cache for testing or when data becomes stale
  clearCache(): void {
    this.fuelPrices = null;
    this.insuranceRates = [];
    this.taxRates = [];
    this.carData = [];
    this.lastFetch = null;
  }
}

export const dataService = new DataService();
