import { CarData } from '../types';

export const APP_CONFIG = {
  name: 'DriveWise',
  version: '1.0.0',
  description: 'Used Car TCO Optimizer',
};

export const USAGE_TYPES = [
  { label: 'City Driving', value: 'city' },
  { label: 'Highway Driving', value: 'highway' },
  { label: 'Mixed Driving', value: 'mixed' },
] as const;

export const MAINTENANCE_TOLERANCE = [
  { label: 'Low (DIY maintenance)', value: 'low' },
  { label: 'Medium (Some DIY)', value: 'medium' },
  { label: 'High (Professional only)', value: 'high' },
] as const;

export const FUEL_TYPES = [
  { label: 'Gasoline', value: 'gasoline' },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'Electric', value: 'electric' },
  { label: 'Diesel', value: 'diesel' },
] as const;

export const YEARS = Array.from({ length: 25 }, (_, i) => 2024 - i);

export const FUEL_PRICES = {
  gasoline: 3.50,
  diesel: 4.20,
  electric: 0.12, // per kWh
};

export const INSURANCE_RATES = {
  base: 1200,
  perYear: 50,
  perMileage: 0.02,
};

export const TAX_RATES = {
  sales: 0.08,
  annual: 0.02,
};

export const MAINTENANCE_MULTIPLIERS = {
  low: 0.7,
  medium: 1.0,
  high: 1.4,
};

export const DEPRECIATION_CURVES = {
  luxury: 0.25,
  standard: 0.18,
  economy: 0.22,
  hybrid: 0.20,
  electric: 0.30,
};

export const COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#1e293b',
  textSecondary: '#64748b',
  border: '#e2e8f0',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
}; 