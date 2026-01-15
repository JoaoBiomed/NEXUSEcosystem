// ============================================================================
// NEXUS ECOSYSTEM - VALIDATOR AGENT
// Verificação de determinismo via hash
// ============================================================================

import { BaseAgent } from './BaseAgent';
import { generateHash, validateHash, validateProtocolDeterminism } from '@/lib/determinism';
import { Protocol } from '@/types';

interface ValidatorInput {
  type: 'protocol' | 'data';
  data: any;
  expectedHash?: string;
}

interface ValidatorOutput {
  valid: boolean;
  currentHash: string;
  expectedHash?: string;
  issues: string[];
}

/**
 * ValidatorAgent - Determinism Validation
 * Ensures data integrity through cryptographic hashing
 */
export class ValidatorAgent extends BaseAgent {
  constructor() {
    super('ValidatorAgent', {
      priority: 9,
      timeout: 15000,
      enabled: true,
    });
  }

  protected validate(input: ValidatorInput): boolean {
    return (
      input &&
      typeof input === 'object' &&
      'type' in input &&
      'data' in input &&
      input.data !== null
    );
  }

  async execute(input: ValidatorInput): Promise<ValidatorOutput> {
    const { type, data, expectedHash } = input;
    const issues: string[] = [];

    if (type === 'protocol') {
      return this.validateProtocol(data as Protocol);
    }

    // General data validation
    const currentHash = generateHash(data);
    let valid = true;

    if (expectedHash) {
      valid = validateHash(data, expectedHash);
      if (!valid) {
        issues.push('Hash mismatch - data integrity compromised');
      }
    }

    // Check for required fields
    if (!data || typeof data !== 'object') {
      issues.push('Invalid data structure');
      valid = false;
    }

    return {
      valid: valid && issues.length === 0,
      currentHash,
      expectedHash,
      issues,
    };
  }

  /**
   * Validate protocol determinism
   */
  private async validateProtocol(protocol: Protocol): Promise<ValidatorOutput> {
    const issues: string[] = [];

    // Validate protocol structure
    if (!protocol.id) issues.push('Missing protocol ID');
    if (!protocol.patientId) issues.push('Missing patient ID');
    if (!protocol.title) issues.push('Missing protocol title');
    if (!protocol.module) issues.push('Missing module specification');
    if (!protocol.rationale) issues.push('Missing clinical rationale');

    // Validate content structure
    if (!protocol.content) {
      issues.push('Missing protocol content');
    } else {
      if (!protocol.content.sections || protocol.content.sections.length === 0) {
        issues.push('Protocol content has no sections');
      }
    }

    // Validate CORTEX insights
    if (!protocol.cortexInsights) {
      issues.push('Missing CORTEX AI insights');
    } else {
      if (!protocol.cortexInsights.summary) {
        issues.push('CORTEX insights missing summary');
      }
      if (protocol.cortexInsights.confidence < 0 || protocol.cortexInsights.confidence > 100) {
        issues.push('Invalid CORTEX confidence score');
      }
    }

    // Validate deterministic hash
    const { valid, currentHash, expectedHash } = validateProtocolDeterminism(protocol);

    if (!valid && expectedHash) {
      issues.push('Protocol hash validation failed - data may have been tampered with');
    }

    return {
      valid: valid && issues.length === 0,
      currentHash,
      expectedHash,
      issues,
    };
  }

  /**
   * Generate hash for data
   */
  async generateDataHash(data: any): Promise<string> {
    return generateHash(data);
  }

  /**
   * Validate hash against data
   */
  async validateDataHash(data: any, hash: string): Promise<boolean> {
    return validateHash(data, hash);
  }
}

export const validatorAgent = new ValidatorAgent();
