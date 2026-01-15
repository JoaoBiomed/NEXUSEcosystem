// ============================================================================
// NEXUS ECOSYSTEM - CORE AGENT
// Governança e risco clínico - Supervisiona todas as decisões
// ============================================================================

import { BaseAgent } from './BaseAgent';
import { Protocol, GovernancePolicy } from '@/types';

interface CoreAgentInput {
  protocol: Protocol;
  action: 'validate' | 'approve' | 'reject' | 'review';
  userId: string;
  reason?: string;
}

interface CoreAgentOutput {
  approved: boolean;
  risks: string[];
  recommendations: string[];
  governance: {
    compliant: boolean;
    issues: string[];
  };
  confidence: number;
}

/**
 * CoreAgent - Governance and Clinical Risk Management
 * The central authority that oversees all clinical decisions
 */
export class CoreAgent extends BaseAgent {
  private governancePolicy: GovernancePolicy;

  constructor() {
    super('CoreAgent', {
      priority: 10, // Highest priority
      timeout: 45000,
      enabled: true,
    });

    this.governancePolicy = {
      lockStatus: 'ENABLED',
      explainMode: 'ACTIVE',
      auditLogging: true,
      determinismCheck: true,
    };
  }

  protected validate(input: CoreAgentInput): boolean {
    return (
      input &&
      typeof input === 'object' &&
      'protocol' in input &&
      'action' in input &&
      'userId' in input &&
      input.protocol !== null
    );
  }

  async execute(input: CoreAgentInput): Promise<CoreAgentOutput> {
    const { protocol, action, userId, reason } = input;

    // Perform governance checks
    const governanceResult = await this.checkGovernance(protocol);

    // Assess clinical risks
    const risks = await this.assessRisks(protocol);

    // Generate recommendations
    const recommendations = await this.generateRecommendations(
      protocol,
      risks
    );

    // Calculate confidence score
    const confidence = this.calculateConfidence(protocol, risks);

    // Determine approval based on action
    let approved = false;
    if (action === 'approve') {
      approved = this.shouldApprove(governanceResult, risks, confidence);
    } else if (action === 'validate') {
      approved = governanceResult.compliant && risks.length === 0;
    }

    return {
      approved,
      risks,
      recommendations,
      governance: governanceResult,
      confidence,
    };
  }

  /**
   * Check protocol compliance with governance policies
   */
  private async checkGovernance(
    protocol: Protocol
  ): Promise<{ compliant: boolean; issues: string[] }> {
    const issues: string[] = [];

    // Check if protocol has required fields
    if (!protocol.patientId) {
      issues.push('Missing patient ID');
    }

    if (!protocol.title || protocol.title.trim().length === 0) {
      issues.push('Missing protocol title');
    }

    if (!protocol.rationale || protocol.rationale.trim().length === 0) {
      issues.push('Missing clinical rationale');
    }

    if (!protocol.createdBy) {
      issues.push('Missing creator information');
    }

    // Check determinism if enabled
    if (this.governancePolicy.determinismCheck && !protocol.hash) {
      issues.push('Missing deterministic hash');
    }

    // Check confidence threshold
    if (protocol.confidence < 70) {
      issues.push('Confidence score below acceptable threshold (70%)');
    }

    return {
      compliant: issues.length === 0,
      issues,
    };
  }

  /**
   * Assess clinical risks in the protocol
   */
  private async assessRisks(protocol: Protocol): Promise<string[]> {
    const risks: string[] = [];

    // Check medication interactions (placeholder - would integrate with pharmacy DB)
    if (
      protocol.content.medications &&
      protocol.content.medications.length > 5
    ) {
      risks.push('High number of medications - check for interactions');
    }

    // Check for missing critical information
    if (!protocol.objective || protocol.objective.trim().length === 0) {
      risks.push('Protocol objective not clearly defined');
    }

    // Check module-specific risks
    if (protocol.module === 'EndoInject') {
      if (
        !protocol.content.exams ||
        protocol.content.exams.length === 0
      ) {
        risks.push('Hormonal therapy without recent lab work');
      }
    }

    // Age-related risks (would need patient data)
    // Allergy checks (would need patient data)
    // Drug interaction checks (would need pharmacy integration)

    return risks;
  }

  /**
   * Generate clinical recommendations
   */
  private async generateRecommendations(
    protocol: Protocol,
    risks: string[]
  ): Promise<string[]> {
    const recommendations: string[] = [];

    // Add recommendations based on risks
    if (risks.length > 0) {
      recommendations.push('Review and address identified risks before approval');
    }

    // Module-specific recommendations
    if (protocol.module === 'EndoInject') {
      recommendations.push('Schedule follow-up labs in 4-6 weeks');
      recommendations.push('Monitor for adverse effects during first 2 weeks');
    }

    if (protocol.module === 'Pharma') {
      recommendations.push('Verify medication availability before prescribing');
      recommendations.push('Check for drug interactions');
    }

    // General recommendations
    if (protocol.confidence < 85) {
      recommendations.push('Consider additional clinical review');
    }

    recommendations.push('Document patient consent before implementation');
    recommendations.push('Schedule follow-up appointment');

    return recommendations;
  }

  /**
   * Calculate confidence score for protocol
   */
  private calculateConfidence(protocol: Protocol, risks: string[]): number {
    let confidence = 100;

    // Reduce confidence for each risk
    confidence -= risks.length * 10;

    // Reduce confidence if protocol is incomplete
    if (!protocol.rationale || protocol.rationale.length < 50) {
      confidence -= 15;
    }

    if (!protocol.content.sections || protocol.content.sections.length === 0) {
      confidence -= 20;
    }

    // Factor in CORTEX AI confidence
    if (protocol.cortexInsights) {
      confidence = (confidence + protocol.cortexInsights.confidence) / 2;
    }

    return Math.max(0, Math.min(100, confidence));
  }

  /**
   * Determine if protocol should be approved
   */
  private shouldApprove(
    governance: { compliant: boolean; issues: string[] },
    risks: string[],
    confidence: number
  ): boolean {
    // Must be governance compliant
    if (!governance.compliant) {
      return false;
    }

    // Must have no critical risks
    if (risks.length > 3) {
      return false;
    }

    // Must meet confidence threshold
    if (confidence < 75) {
      return false;
    }

    return true;
  }

  /**
   * Update governance policy
   */
  setGovernancePolicy(policy: Partial<GovernancePolicy>): void {
    this.governancePolicy = {
      ...this.governancePolicy,
      ...policy,
    };
  }

  /**
   * Get current governance policy
   */
  getGovernancePolicy(): GovernancePolicy {
    return { ...this.governancePolicy };
  }
}

// Singleton instance
export const coreAgent = new CoreAgent();
