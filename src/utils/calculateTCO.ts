import { TCOInput, TCOOutput, CarData } from '../types';
import { ALL_CARS } from '../data/cars';
import { ZIP_TO_STATE } from '../data/zipToState';

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

export function calculateTCO(input: TCOInput): TCOOutput | null {
  const car: CarData | undefined = ALL_CARS.find(
    c => c.make === input.make && c.model === input.model && c.year === input.year
  );
  if (!car) return null;

  const state = ZIP_TO_STATE[input.zipCode] || 'CA';
  const ownershipMiles = input.annualMileage * input.ownershipYears;

  // Depreciation
  const depreciation = car.msrp - interpolate(car.usedPrices, ownershipMiles);

  // Fuel
  const fuelPrice = 3.5; // static for MVP
  const fuel = ((input.annualMileage / car.mpg) * fuelPrice * input.ownershipYears);

  // Maintenance
  const maintenance = interpolate(car.maintenanceByMileage, ownershipMiles);

  // Insurance
  const insurancePerYear = car.insuranceByState[state] || 1600;
  const insurance = insurancePerYear * input.ownershipYears;

  // Taxes & Fees
  const taxesAndFees = (input.purchasePrice * car.taxRate) + (input.purchasePrice * 0.01 * input.ownershipYears);

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