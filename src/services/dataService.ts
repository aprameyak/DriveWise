import { CarData } from '../types';

// API endpoints (replace with real endpoints in production)
const API_BASE_URL = 'https://api.drivewise.com'; // Replace with your actual API

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

class DataService {
  private fuelPrices: FuelPriceData | null = null;
  private insuranceRates: InsuranceRateData[] = [];
  private taxRates: TaxRateData[] = [];
  private lastFetch: Date | null = null;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  async getFuelPrices(): Promise<FuelPriceData> {
    if (this.shouldUseCache()) {
      return this.fuelPrices || this.getDefaultFuelPrices();
    }

    try {
      // In production, replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/fuel-prices`);
      // this.fuelPrices = await response.json();
      
      // For now, use realistic mock data
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
      // In production, replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/insurance-rates`);
      // this.insuranceRates = await response.json();
      
      // For now, use realistic mock data
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
      // In production, replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/tax-rates`);
      // this.taxRates = await response.json();
      
      // For now, use realistic mock data
      this.taxRates = this.getDefaultTaxRates();
      this.lastFetch = new Date();
      return this.taxRates;
    } catch (error) {
      console.warn('Failed to fetch tax rates, using defaults:', error);
      return this.getDefaultTaxRates();
    }
  }

  async getCarData(): Promise<CarData[]> {
    try {
      // In production, replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/cars`);
      // return await response.json();
      
      // For now, return the existing car data
      const { ALL_CARS } = await import('../data/cars');
      return ALL_CARS;
    } catch (error) {
      console.warn('Failed to fetch car data:', error);
      return [];
    }
  }

  async getZipToStateMapping(): Promise<Record<string, string>> {
    try {
      // In production, replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/zip-to-state`);
      // return await response.json();
      
      // For now, return the existing mapping
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
    this.lastFetch = null;
  }
}

export const dataService = new DataService();
