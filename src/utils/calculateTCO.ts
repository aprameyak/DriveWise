import { TCOInput, TCOOutput, CarData } from '../types';
import { dataService } from '../services/dataService';

// Helper: interpolate between mileage keys
function interpolate(obj: Record<string, number>, mileage: number): number {
  const keys = Object.keys(obj).map(Number).sort((a, b) => a - b);
  if (mileage <= keys[0]) return obj[keys[0]];
  if (mileage >= keys[keys.length - 1]) return obj[keys[keys.length - 1]];
  for (let i = 0; i < keys.length - 1; i++) {
    if (mileage >= keys[i] && mileage <= keys[i + 1]) {
      const x0 = keys[i], x1 = keys[i + 1];
      const y0 = obj[x0], y1 = obj[x1];
      return y0 + ((y1 - y0) * (mileage - x0)) / (x1 - x0);
    }
  }
  return obj[keys[0]];
}

export async function calculateTCO(input: TCOInput): Promise<TCOOutput | null> {
  try {
    // Fetch all required data
    const [cars, fuelPrices, insuranceRates, taxRates, zipToState] = await Promise.all([
      dataService.getCarData(),
      dataService.getFuelPrices(),
      dataService.getInsuranceRates(),
      dataService.getTaxRates(),
      dataService.getZipToStateMapping(),
    ]);

    const car: CarData | undefined = cars.find(
      c => c.make === input.make && c.model === input.model && c.year === input.year
    );
    
    if (!car) return null;

    const state = zipToState[input.zipCode] || 'CA';
    const ownershipMiles = input.annualMileage * input.ownershipYears;

    // Get state-specific rates
    const insuranceRate = insuranceRates.find(r => r.state === state) || insuranceRates[0];
    const taxRate = taxRates.find(r => r.state === state) || taxRates[0];

    // Depreciation
    const depreciation = car.msrp - interpolate(car.usedPrices, ownershipMiles);

    // Fuel costs - use dynamic fuel prices
    const fuelType = car.model.toLowerCase().includes('hybrid') ? 'electric' : 
                    car.model.toLowerCase().includes('diesel') ? 'diesel' : 'gasoline';
    const fuelPrice = fuelPrices[fuelType];
    const fuel = ((input.annualMileage / car.mpg) * fuelPrice * input.ownershipYears);

    // Maintenance
    const maintenance = interpolate(car.maintenanceByMileage, ownershipMiles);

    // Insurance - use dynamic rates
    const insurancePerYear = insuranceRate.baseRate + 
                            (car.year * insuranceRate.perYearMultiplier) + 
                            (input.annualMileage * insuranceRate.perMileageMultiplier);
    const insurance = insurancePerYear * input.ownershipYears;

    // Taxes & Fees - use dynamic rates
    const salesTax = input.purchasePrice * taxRate.salesTax;
    const annualTax = input.purchasePrice * taxRate.annualTax * input.ownershipYears;
    const registrationFees = taxRate.registrationFee * input.ownershipYears;
    const taxesAndFees = salesTax + annualTax + registrationFees;

    // Resale Value
    const resaleValue = interpolate(car.usedPrices, ownershipMiles);

    // TCO
    const totalCost = depreciation + fuel + maintenance + insurance + taxesAndFees - resaleValue;
    const costPerMile = totalCost / ownershipMiles;
    const costPerYear = totalCost / input.ownershipYears;

    return {
      totalCost,
      costPerMile,
      costPerYear,
      resaleValue,
      breakdown: {
        depreciation,
        fuel,
        insurance,
        maintenance,
        taxesAndFees,
      },
    };
  } catch (error) {
    console.error('Error calculating TCO:', error);
    return null;
  }
}

// Synchronous version for backward compatibility (uses cached/default data)
export function calculateTCOSync(input: TCOInput): TCOOutput | null {
  // This is a fallback that uses default values
  // In production, prefer the async version
  const car = require('../data/cars').ALL_CARS.find(
    (c: CarData) => c.make === input.make && c.model === input.model && c.year === input.year
  );
  
  if (!car) return null;

  const zipToState = require('../data/zipToState').ZIP_TO_STATE;
  const state = zipToState[input.zipCode] || 'CA';
  const ownershipMiles = input.annualMileage * input.ownershipYears;

  // Use default values for sync version
  const fuelPrice = 3.5;
  const insurancePerYear = car.insuranceByState[state] || 1600;
  const taxRate = 0.08;

  // Depreciation
  const depreciation = car.msrp - interpolate(car.usedPrices, ownershipMiles);

  // Fuel
  const fuel = ((input.annualMileage / car.mpg) * fuelPrice * input.ownershipYears);

  // Maintenance
  const maintenance = interpolate(car.maintenanceByMileage, ownershipMiles);

  // Insurance
  const insurance = insurancePerYear * input.ownershipYears;

  // Taxes & Fees
  const taxesAndFees = (input.purchasePrice * taxRate) + (input.purchasePrice * 0.01 * input.ownershipYears);

  // Resale Value
  const resaleValue = interpolate(car.usedPrices, ownershipMiles);

  // TCO
  const totalCost = depreciation + fuel + maintenance + insurance + taxesAndFees - resaleValue;
  const costPerMile = totalCost / ownershipMiles;
  const costPerYear = totalCost / input.ownershipYears;

  return {
    totalCost,
    costPerMile,
    costPerYear,
    resaleValue,
    breakdown: {
      depreciation,
      fuel,
      insurance,
      maintenance,
      taxesAndFees,
    },
  };
} 