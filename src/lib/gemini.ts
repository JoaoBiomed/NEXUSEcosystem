// ============================================================================
// NEXUS ECOSYSTEM - GEMINI AI INTEGRATION
// CORTEX AI powered by Google Gemini
// ============================================================================

import { GoogleGenerativeAI } from '@google/generative-ai';
import { CortexRequest, CortexResponse, CortexInsight } from '@/types';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * CORTEX AI - Main interface for AI-powered protocol generation
 */
export class CortexAI {
  private model: any;
  private modelName: string;

  constructor(modelName: string = 'gemini-pro') {
    this.modelName = modelName;
    this.model = genAI.getGenerativeModel({ model: modelName });
  }

  /**
   * Generate protocol content using CORTEX AI
   */
  async generateProtocol(request: CortexRequest): Promise<CortexResponse> {
    try {
      const prompt = this.buildProtocolPrompt(request);

      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: request.temperature ?? 0.7,
          maxOutputTokens: request.maxTokens ?? 2000,
        },
      });

      const response = await result.response;
      const content = response.text();

      // Parse and structure the response
      const insights = this.parseInsights(content, request);

      return {
        content,
        insights,
        confidence: insights.confidence,
        tokensUsed: this.estimateTokens(content),
        modelVersion: this.modelName,
        timestamp: new Date(),
      };
    } catch (error: any) {
      console.error('CORTEX AI generation error:', error);
      throw new Error(`CORTEX AI failed: ${error.message}`);
    }
  }

  /**
   * Generate clinical rationale
   */
  async generateRationale(
    patientInfo: any,
    module: string,
    objective: string
  ): Promise<string> {
    const prompt = `
Como CORTEX AI, um sistema médico especializado, gere uma justificativa clínica detalhada para:

PACIENTE:
- Idade: ${patientInfo.age} anos
- Gênero: ${patientInfo.gender}
- Objetivo: ${objective}

MÓDULO: ${module}

Gere uma justificativa clínica em português, estruturada, profissional e baseada em evidências.
A justificativa deve ter entre 200-400 palavras e incluir:
1. Contexto clínico
2. Fundamentação científica
3. Considerações específicas do paciente
4. Expectativas de resultado

Responda APENAS com a justificativa, sem títulos ou formatação extra.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Error generating rationale:', error);
      return this.getFallbackRationale(patientInfo, module, objective);
    }
  }

  /**
   * Generate CORTEX insights
   */
  async generateInsights(
    context: any,
    module: string,
    protocolContent: string
  ): Promise<CortexInsight> {
    const prompt = `
Como CORTEX AI, analise o seguinte protocolo clínico e forneça insights estruturados:

MÓDULO: ${module}
CONTEXTO: ${JSON.stringify(context)}
CONTEÚDO DO PROTOCOLO: ${protocolContent}

Forneça uma análise em JSON com a seguinte estrutura:
{
  "summary": "Resumo do protocolo em 1-2 frases",
  "keyPoints": ["ponto 1", "ponto 2", "ponto 3"],
  "risks": ["risco 1", "risco 2"],
  "recommendations": ["recomendação 1", "recomendação 2", "recomendação 3"],
  "reasoning": "Explicação detalhada do raciocínio clínico (100-200 palavras)",
  "confidence": 85
}

Responda APENAS com o JSON, sem markdown ou texto adicional.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Try to parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          ...parsed,
          generatedAt: new Date(),
          modelVersion: this.modelName,
        };
      }

      throw new Error('Failed to parse JSON response');
    } catch (error: any) {
      console.error('Error generating insights:', error);
      return this.getFallbackInsights(module);
    }
  }

  /**
   * Build structured prompt for protocol generation
   */
  private buildProtocolPrompt(request: CortexRequest): string {
    const { context, module, patientData, examData } = request;

    let prompt = `
Você é CORTEX AI, o sistema cognitivo do Ecossistema NEXUS - uma plataforma clínica inteligente.
Sua função é gerar protocolos clínicos personalizados, determinísticos e baseados em evidências.

MÓDULO: ${module}
OBJETIVO: ${request.prompt}

`;

    if (patientData) {
      prompt += `
DADOS DO PACIENTE:
- Nome: ${patientData.name}
- Idade: ${patientData.age} anos
- Gênero: ${patientData.gender}
`;
      if (patientData.history && patientData.history.length > 0) {
        prompt += `- Histórico: ${patientData.history.length} registros\n`;
      }
    }

    if (examData && examData.length > 0) {
      prompt += `\nDADOS LABORATORIAIS: ${examData.length} exames disponíveis\n`;
    }

    if (context) {
      prompt += `\nCONTEXTO ADICIONAL: ${JSON.stringify(context)}\n`;
    }

    prompt += `
INSTRUÇÕES:
1. Gere um protocolo clínico completo e personalizado
2. Use linguagem técnica mas clara
3. Baseie-se em evidências científicas
4. Considere segurança e eficácia
5. Inclua recomendações de monitoramento
6. Forneça raciocínio clínico detalhado

FORMATO ESPERADO:
- Introdução e contexto
- Justificativa clínica
- Protocolo de tratamento detalhado
- Monitoramento e acompanhamento
- Considerações de segurança
- Recomendações finais

Gere o protocolo em português, de forma estruturada e profissional.
`;

    return prompt;
  }

  /**
   * Parse insights from AI response
   */
  private parseInsights(
    content: string,
    request: CortexRequest
  ): CortexInsight {
    // Try to extract structured information from the content
    const summary = content.split('\n')[0].substring(0, 200);

    return {
      summary,
      keyPoints: this.extractKeyPoints(content),
      risks: this.extractRisks(content),
      recommendations: this.extractRecommendations(content),
      confidence: 85,
      reasoning: content.substring(0, 500),
      generatedAt: new Date(),
      modelVersion: this.modelName,
    };
  }

  /**
   * Extract key points from content
   */
  private extractKeyPoints(content: string): string[] {
    const points: string[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      if (
        line.includes('•') ||
        line.includes('-') ||
        line.match(/^\d+\./)
      ) {
        const cleaned = line
          .replace(/^[•\-\d\.\s]+/, '')
          .trim()
          .substring(0, 150);
        if (cleaned.length > 10) {
          points.push(cleaned);
          if (points.length >= 5) break;
        }
      }
    }

    return points.length > 0
      ? points
      : ['Protocolo personalizado gerado com IA'];
  }

  /**
   * Extract risks from content
   */
  private extractRisks(content: string): string[] {
    const risks: string[] = [];
    const lowerContent = content.toLowerCase();

    const riskKeywords = ['risco', 'atenção', 'cuidado', 'contraindicação', 'efeito adverso'];
    for (const keyword of riskKeywords) {
      if (lowerContent.includes(keyword)) {
        risks.push(`Verificar ${keyword}`);
      }
    }

    return risks.slice(0, 3);
  }

  /**
   * Extract recommendations from content
   */
  private extractRecommendations(content: string): string[] {
    return [
      'Acompanhamento médico regular',
      'Monitoramento laboratorial periódico',
      'Documentar evolução do paciente',
    ];
  }

  /**
   * Estimate token count (rough approximation)
   */
  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  /**
   * Fallback rationale when AI fails
   */
  private getFallbackRationale(
    patientInfo: any,
    module: string,
    objective: string
  ): string {
    return `Este protocolo foi desenvolvido para ${patientInfo.age} anos, ${patientInfo.gender === 'male' ? 'paciente masculino' : 'paciente feminino'}, com o objetivo de ${objective}. O protocolo considera os parâmetros clínicos do paciente e segue diretrizes baseadas em evidências científicas. A abordagem proposta visa otimizar os resultados terapêuticos mantendo um perfil de segurança adequado.`;
  }

  /**
   * Fallback insights when AI fails
   */
  private getFallbackInsights(module: string): CortexInsight {
    return {
      summary: `Protocolo ${module} gerado com diretrizes padrão`,
      keyPoints: [
        'Protocolo personalizado para o paciente',
        'Baseado em evidências clínicas',
        'Requer aprovação médica',
      ],
      risks: ['Sempre verificar alergias e contraindicações'],
      recommendations: [
        'Realizar exames laboratoriais',
        'Acompanhamento médico regular',
        'Monitorar resposta terapêutica',
      ],
      confidence: 75,
      reasoning:
        'Protocolo gerado utilizando diretrizes clínicas padrão. Recomenda-se revisão médica detalhada antes da implementação.',
      generatedAt: new Date(),
      modelVersion: 'fallback-v1',
    };
  }
}

// Singleton instance
export const cortexAI = new CortexAI();

// Helper function for quick protocol generation
export async function generateProtocolWithCortex(
  request: CortexRequest
): Promise<CortexResponse> {
  return cortexAI.generateProtocol(request);
}
