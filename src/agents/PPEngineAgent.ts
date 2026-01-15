// ============================================================================
// NEXUS ECOSYSTEM - PP ENGINE AGENT
// Motor de personalização dos protocolos AI
// ============================================================================

import { BaseAgent } from './BaseAgent';
import { Protocol, Patient, CortexInsight, ModuleType } from '@/types';
import { generateHash } from '@/lib/determinism';

interface PPEngineInput {
  patient: Patient;
  module: ModuleType;
  objective: string;
  additionalContext?: string;
}

interface PPEngineOutput {
  protocol: Partial<Protocol>;
  cortexInsight: CortexInsight;
  confidence: number;
}

/**
 * PPEngineAgent - Protocol Personalization Engine
 * Generates personalized clinical protocols using AI
 */
export class PPEngineAgent extends BaseAgent {
  constructor() {
    super('PPEngineAgent', {
      priority: 8,
      timeout: 60000, // AI generation can take longer
      enabled: true,
    });
  }

  protected validate(input: PPEngineInput): boolean {
    return (
      input &&
      typeof input === 'object' &&
      'patient' in input &&
      'module' in input &&
      'objective' in input &&
      input.patient !== null &&
      input.module !== null
    );
  }

  async execute(input: PPEngineInput): Promise<PPEngineOutput> {
    const { patient, module, objective, additionalContext } = input;

    // Generate protocol title
    const title = this.generateProtocolTitle(module, objective);

    // Generate clinical rationale
    const rationale = await this.generateRationale(
      patient,
      module,
      objective,
      additionalContext
    );

    // Generate protocol content
    const content = await this.generateProtocolContent(
      patient,
      module,
      objective,
      rationale
    );

    // Generate CORTEX insights
    const cortexInsight = await this.generateCortexInsight(
      patient,
      module,
      objective,
      content
    );

    // Calculate confidence
    const confidence = this.calculateConfidence(
      patient,
      module,
      content,
      cortexInsight
    );

    // Build protocol object
    const protocol: Partial<Protocol> = {
      patientId: patient.id,
      patientName: patient.name,
      title,
      module,
      objective,
      rationale,
      content,
      cortexInsights: cortexInsight,
      confidence,
      status: 'draft',
      tags: this.generateTags(module, objective),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Generate deterministic hash
    protocol.hash = generateHash(protocol);

    return {
      protocol,
      cortexInsight,
      confidence,
    };
  }

  /**
   * Generate protocol title based on module and objective
   */
  private generateProtocolTitle(
    module: ModuleType,
    objective: string
  ): string {
    const moduleNames: Record<ModuleType, string> = {
      EndoInject: 'Terapia Hormonal',
      LabPro: 'Análise Laboratorial',
      Pharma: 'Protocolo Farmacológico',
      iMeddis: 'Protocolo de Governança',
      ProtocolosAI: 'Protocolo Personalizado',
      BioScan3D: 'Avaliação Biométrica',
      Lifestyle: 'Protocolo de Lifestyle',
    };

    const moduleName = moduleNames[module] || module;
    const shortObjective = objective.substring(0, 50);

    return `${moduleName}: ${shortObjective}`;
  }

  /**
   * Generate clinical rationale for the protocol
   */
  private async generateRationale(
    patient: Patient,
    module: ModuleType,
    objective: string,
    additionalContext?: string
  ): Promise<string> {
    // This would integrate with Gemini API
    // For now, we'll generate a structured rationale

    const age = patient.age;
    const gender = patient.gender;

    let rationale = `Este protocolo foi desenvolvido para ${patient.name}, ${gender === 'male' ? 'paciente masculino' : 'paciente feminino'} de ${age} anos, `;
    rationale += `com o objetivo de ${objective.toLowerCase()}.\n\n`;

    // Module-specific rationale
    if (module === 'EndoInject') {
      rationale += `A terapia hormonal proposta considera os parâmetros fisiológicos do paciente, `;
      rationale += `idade, histórico clínico e resultados laboratoriais recentes. `;
      rationale += `O protocolo foi desenhado para otimizar os níveis hormonais de forma segura e gradual.\n\n`;
    } else if (module === 'LabPro') {
      rationale += `A análise laboratorial proposta visa avaliar marcadores bioquímicos e hormonais relevantes `;
      rationale += `para o perfil clínico do paciente, permitindo decisões terapêuticas baseadas em evidências.\n\n`;
    } else if (module === 'Pharma') {
      rationale += `O protocolo farmacológico foi estruturado considerando interações medicamentosas, `;
      rationale += `biodisponibilidade e perfil farmacocinético adequado ao paciente.\n\n`;
    }

    if (additionalContext) {
      rationale += `Contexto adicional: ${additionalContext}\n\n`;
    }

    rationale += `Este protocolo deve ser revisado e aprovado por médico responsável antes da implementação.`;

    return rationale;
  }

  /**
   * Generate protocol content sections
   */
  private async generateProtocolContent(
    patient: Patient,
    module: ModuleType,
    objective: string,
    rationale: string
  ): Promise<any> {
    const sections = [];

    // Introduction section
    sections.push({
      title: 'Introdução',
      content: `Protocolo personalizado para ${patient.name}, visando ${objective.toLowerCase()}.`,
      order: 1,
    });

    // Rationale section
    sections.push({
      title: 'Justificativa Clínica',
      content: rationale,
      order: 2,
    });

    // Module-specific sections
    if (module === 'EndoInject') {
      sections.push({
        title: 'Protocolo de Administração',
        content:
          'Detalhes sobre dosagem, frequência e via de administração serão determinados após avaliação dos exames laboratoriais.',
        order: 3,
      });

      sections.push({
        title: 'Monitoramento',
        content:
          'Realizar acompanhamento laboratorial a cada 4-6 semanas durante os primeiros 3 meses, depois trimestralmente.',
        order: 4,
      });
    }

    // Safety section
    sections.push({
      title: 'Considerações de Segurança',
      content:
        'Monitorar possíveis efeitos adversos. Paciente deve reportar imediatamente qualquer sintoma incomum.',
      order: sections.length + 1,
    });

    // Follow-up section
    sections.push({
      title: 'Acompanhamento',
      content:
        'Retorno programado conforme necessidade clínica. Ajustes do protocolo serão realizados baseados na resposta terapêutica.',
      order: sections.length + 1,
    });

    return {
      sections,
      medications: [],
      exams: [],
      instructions: [
        'Seguir rigorosamente as orientações médicas',
        'Manter registro de sintomas e efeitos',
        'Comparecer às consultas de acompanhamento',
        'Realizar exames laboratoriais conforme solicitado',
      ],
    };
  }

  /**
   * Generate CORTEX AI insights
   */
  private async generateCortexInsight(
    patient: Patient,
    module: ModuleType,
    objective: string,
    content: any
  ): Promise<CortexInsight> {
    // This would integrate with Gemini API for real AI insights
    // For now, we'll generate structured insights

    const keyPoints = [
      `Protocolo personalizado para ${patient.gender === 'male' ? 'paciente masculino' : 'paciente feminino'} de ${patient.age} anos`,
      `Módulo: ${module}`,
      `Objetivo: ${objective}`,
      'Protocolo determinístico com rastreabilidade completa',
    ];

    const risks = [];
    if (patient.age > 60) {
      risks.push('Idade avançada requer monitoramento mais frequente');
    }
    if (patient.history && patient.history.length > 5) {
      risks.push('Histórico médico extenso - revisar interações');
    }

    const recommendations = [
      'Realizar avaliação laboratorial antes de iniciar o protocolo',
      'Estabelecer linha de base para monitoramento',
      'Documentar consentimento informado do paciente',
      'Agendar consulta de acompanhamento',
    ];

    const reasoning =
      `O CORTEX AI analisou o perfil do paciente considerando idade (${patient.age} anos), ` +
      `gênero (${patient.gender}), histórico clínico e objetivo terapêutico. ` +
      `O protocolo foi estruturado para maximizar eficácia e minimizar riscos, ` +
      `seguindo diretrizes de medicina baseada em evidências e personalização clínica.`;

    return {
      summary: `Protocolo ${module} personalizado com foco em ${objective}`,
      keyPoints,
      risks,
      recommendations,
      confidence: 85,
      reasoning,
      generatedAt: new Date(),
      modelVersion: 'CORTEX-v1.3.0',
    };
  }

  /**
   * Calculate protocol confidence score
   */
  private calculateConfidence(
    patient: Patient,
    module: ModuleType,
    content: any,
    cortexInsight: CortexInsight
  ): number {
    let confidence = 80; // Base confidence

    // Increase confidence with complete patient data
    if (patient.history && patient.history.length > 0) {
      confidence += 5;
    }
    if (patient.currentMedications) {
      confidence += 5;
    }

    // Adjust based on protocol completeness
    if (content.sections && content.sections.length >= 4) {
      confidence += 5;
    }

    // Factor in CORTEX confidence
    confidence = (confidence + cortexInsight.confidence) / 2;

    // Reduce confidence for identified risks
    if (cortexInsight.risks.length > 0) {
      confidence -= cortexInsight.risks.length * 3;
    }

    return Math.max(0, Math.min(100, Math.round(confidence)));
  }

  /**
   * Generate tags for protocol
   */
  private generateTags(module: ModuleType, objective: string): string[] {
    const tags = [module];

    const lowerObjective = objective.toLowerCase();

    if (lowerObjective.includes('hormonal') || lowerObjective.includes('hormone')) {
      tags.push('hormonal');
    }
    if (lowerObjective.includes('testosterona') || lowerObjective.includes('testosterone')) {
      tags.push('testosterone');
    }
    if (lowerObjective.includes('estradiol')) {
      tags.push('estradiol');
    }
    if (lowerObjective.includes('tireoid') || lowerObjective.includes('thyroid')) {
      tags.push('thyroid');
    }
    if (lowerObjective.includes('perda de peso') || lowerObjective.includes('weight loss')) {
      tags.push('weight-management');
    }

    tags.push('ai-generated', 'deterministic');

    return tags;
  }
}

// Singleton instance
export const ppEngineAgent = new PPEngineAgent();
