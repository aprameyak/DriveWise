import { DealInput } from '../types';
import { DEAL_CHECK_RULES } from '../constants';

export function auditDeal(deal: DealInput): string[] {
  const flags: string[] = [];
  if (deal.documentationFee > DEAL_CHECK_RULES.maxDocumentationFee) flags.push('High documentation fee');
  if (deal.addOns.length > DEAL_CHECK_RULES.maxAddOns) flags.push('Multiple add-ons detected');
  return flags;
}
