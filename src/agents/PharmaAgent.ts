// ============================================================================
// NEXUS ECOSYSTEM - PHARMA AGENT
// Gestão farmacológica e substituições
// ============================================================================

import { BaseAgent } from './BaseAgent';
import { Medication, StockItem } from '@/types';

interface PharmaAgentInput {
  medications: Medication[];
  action: 'validate' | 'check_stock' | 'find_alternatives';
}

interface PharmaAgentOutput {
  valid: boolean;
  stockStatus: Record<string, boolean>;
  alternatives: Record<string, string[]>;
  warnings: string[];
  interactions: string[];
}

/**
 * PharmaAgent - Pharmaceutical Management
 * Manages medication stock, substitutions, and interactions
 */
export class PharmaAgent extends BaseAgent {
  constructor() {
    super('PharmaAgent', {
      priority: 7,
      timeout: 30000,
      enabled: true,
    });
  }

  protected validate(input: PharmaAgentInput): boolean {
    return (
      input &&
      typeof input === 'object' &&
      'medications' in input &&
      Array.isArray(input.medications) &&
      'action' in input
    );
  }

  async execute(input: PharmaAgentInput): Promise<PharmaAgentOutput> {
    const { medications, action } = input;

    const stockStatus: Record<string, boolean> = {};
    const alternatives: Record<string, string[]> = {};
    const warnings: string[] = [];
    const interactions: string[] = [];

    // Check stock for each medication
    for (const med of medications) {
      const inStock = await this.checkStock(med);
      stockStatus[med.name] = inStock;

      if (!inStock) {
        warnings.push(`${med.name} está fora de estoque`);
        const alts = await this.findAlternatives(med);
        if (alts.length > 0) {
          alternatives[med.name] = alts;
        }
      }
    }

    // Check for drug interactions
    if (medications.length > 1) {
      const detectedInteractions = await this.checkInteractions(medications);
      interactions.push(...detectedInteractions);
    }

    // Validate dosages
    const dosageWarnings = this.validateDosages(medications);
    warnings.push(...dosageWarnings);

    const valid =
      warnings.length === 0 && interactions.length === 0;

    return {
      valid,
      stockStatus,
      alternatives,
      warnings,
      interactions,
    };
  }

  private async checkStock(medication: Medication): Promise<boolean> {
    // This would query the stock database
    // For now, simulate stock check
    return medication.inStock ?? Math.random() > 0.2;
  }

  private async findAlternatives(medication: Medication): Promise<string[]> {
    // This would query pharmaceutical database for alternatives
    // For now, return mock alternatives
    const alternatives: Record<string, string[]> = {
      'Testosterona Cipionato': ['Testosterona Enantato', 'Testosterona Undecanoato'],
      'Estradiol Valerato': ['Estradiol Benzoato', 'Estradiol Cipionato'],
      'HCG': ['Gonadorelina'],
    };

    return alternatives[medication.name] || [];
  }

  private async checkInteractions(medications: Medication[]): Promise<string[]> {
    const interactions: string[] = [];

    // This would use a drug interaction database
    // For now, implement basic checks
    const names = medications.map((m) => m.activeIngredient.toLowerCase());

    // Example interaction checks
    if (names.includes('warfarin') && names.includes('aspirin')) {
      interactions.push('Warfarin + Aspirina: Risco aumentado de sangramento');
    }

    return interactions;
  }

  private validateDosages(medications: Medication[]): string[] {
    const warnings: string[] = [];

    for (const med of medications) {
      // Check for extremely high dosages (would use proper pharmaceutical ranges)
      if (med.dosage.includes('1000mg') && med.frequency === 'daily') {
        warnings.push(`${med.name}: Dosagem elevada, verificar prescrição`);
      }

      // Check for missing critical information
      if (!med.route) {
        warnings.push(`${med.name}: Via de administração não especificada`);
      }

      if (!med.duration) {
        warnings.push(`${med.name}: Duração do tratamento não especificada`);
      }
    }

    return warnings;
  }
}

export const pharmaAgent = new PharmaAgent();
