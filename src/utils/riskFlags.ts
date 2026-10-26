import { RiskInput } from '../types';
import { RISK_RULES, MODEL_RELIABILITY, DEFAULT_MODEL_RELIABILITY } from '../constants';

export function modelKey(model: string): string {
  return model.trim().toLowerCase().replace(/\s+/g, '-').replace(/^chevrolet-/, 'chevy-');
}

export function getModelReliability(model: string, fallback?: number): number {
  return MODEL_RELIABILITY[modelKey(model)] ?? fallback ?? DEFAULT_MODEL_RELIABILITY;
}

export function riskFlags(input: RiskInput): string[] {
  const reliability = getModelReliability(input.model, input.reliability);
  const flags: string[] = [];
  if (input.mileage !== undefined && input.mileage > RISK_RULES.highMileage) flags.push('High mileage - expect repairs');
  if (input.askingPrice !== undefined && input.askingPrice < RISK_RULES.lowAskingPrice) flags.push('Below market - possible issues');
  if (reliability < RISK_RULES.minReliability) flags.push('Model has reliability issues');
  return flags;
}
