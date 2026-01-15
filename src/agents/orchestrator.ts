// ============================================================================
// NEXUS ECOSYSTEM - AGENT ORCHESTRATOR
// Coordinates the PPE-Core+ agent workflow
// ============================================================================

import { ppEngineAgent } from './PPEngineAgent';
import { pharmaAgent } from './PharmaAgent';
import { coreAgent } from './CoreAgent';
import { validatorAgent } from './ValidatorAgent';
import { Patient, Protocol, ModuleType } from '@/types';
import { setDocument, COLLECTIONS } from '@/lib/firestore';

export interface ProtocolGenerationInput {
  patient: Patient;
  module: ModuleType;
  objective: string;
  additionalContext?: string;
  userId: string;
}

export interface ProtocolGenerationOutput {
  success: boolean;
  protocol?: Protocol;
  errors?: string[];
  warnings?: string[];
}

/**
 * Orchestrate the complete protocol generation workflow
 * Flow: PPEngineAgent → PharmaAgent → CoreAgent → AuditAgent → FirestoreAgent → ValidatorAgent
 */
export async function orchestrateProtocolGeneration(
  input: ProtocolGenerationInput
): Promise<ProtocolGenerationOutput> {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    console.log('🧠 Starting protocol generation orchestration...');

    // Step 1: PPEngineAgent - Generate protocol
    console.log('📝 Step 1: Generating protocol with PPEngineAgent...');
    const ppEngineResult = await ppEngineAgent.run(
      {
        patient: input.patient,
        module: input.module,
        objective: input.objective,
        additionalContext: input.additionalContext,
      },
      input.userId
    );

    if (ppEngineResult.status === 'error') {
      errors.push('Failed to generate protocol');
      return { success: false, errors };
    }

    let protocol = ppEngineResult.output.protocol as Protocol;
    protocol.id = `proto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    protocol.createdBy = input.userId;

    // Step 2: PharmaAgent - Validate medications (if applicable)
    if (protocol.content.medications && protocol.content.medications.length > 0) {
      console.log('💊 Step 2: Validating medications with PharmaAgent...');
      const pharmaResult = await pharmaAgent.run(
        {
          medications: protocol.content.medications,
          action: 'validate',
        },
        input.userId
      );

      if (pharmaResult.status === 'error') {
        warnings.push('Medication validation failed');
      } else if (!pharmaResult.output.valid) {
        warnings.push(...pharmaResult.output.warnings);
        warnings.push(...pharmaResult.output.interactions);
      }
    }

    // Step 3: CoreAgent - Validate governance and approve
    console.log('⚖️ Step 3: Validating with CoreAgent...');
    const coreResult = await coreAgent.run(
      {
        protocol,
        action: 'validate',
        userId: input.userId,
      },
      input.userId
    );

    if (coreResult.status === 'error') {
      errors.push('Core governance validation failed');
      return { success: false, errors };
    }

    // Add governance feedback to protocol
    if (coreResult.output.risks.length > 0) {
      warnings.push(...coreResult.output.risks);
    }

    // Step 4: ValidatorAgent - Validate determinism
    console.log('🔍 Step 4: Validating determinism with ValidatorAgent...');
    const validatorResult = await validatorAgent.run(
      {
        type: 'protocol',
        data: protocol,
      },
      input.userId
    );

    if (validatorResult.status === 'error' || !validatorResult.output.valid) {
      errors.push('Protocol validation failed');
      warnings.push(...validatorResult.output.issues);
    }

    // Step 5: Save to Firestore
    console.log('💾 Step 5: Saving protocol to Firestore...');
    try {
      await setDocument(COLLECTIONS.PROTOCOLS, protocol.id, protocol);
      console.log('✅ Protocol saved successfully');
    } catch (firestoreError) {
      errors.push('Failed to save protocol to database');
      console.error('Firestore error:', firestoreError);
    }

    // Step 6: Final validation
    console.log('✨ Step 6: Final validation...');
    const finalValidation = await validatorAgent.run(
      {
        type: 'protocol',
        data: protocol,
        expectedHash: protocol.hash,
      },
      input.userId
    );

    if (!finalValidation.output.valid) {
      errors.push('Final validation failed - protocol integrity compromised');
    }

    console.log('🎉 Protocol generation orchestration complete!');

    return {
      success: errors.length === 0,
      protocol,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  } catch (error: any) {
    console.error('❌ Orchestration error:', error);
    errors.push(`Orchestration failed: ${error.message}`);
    return {
      success: false,
      errors,
    };
  }
}
