'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Brain,
  Plus,
  Filter,
  Search,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

export default function ProtocolosAIPage() {
  const [showNewProtocolModal, setShowNewProtocolModal] = useState(false);

  // Mock protocols data
  const protocols = [
    {
      id: 'proto_001',
      title: 'Terapia Hormonal: Otimização de Testosterona',
      patientName: 'João Silva',
      module: 'EndoInject',
      status: 'active',
      confidence: 92,
      createdAt: '2026-01-14',
      cortexInsights: {
        summary: 'Protocolo personalizado para reposição hormonal masculina',
        risks: [],
      },
    },
    {
      id: 'proto_002',
      title: 'Análise Laboratorial: Painel Hormonal Completo',
      patientName: 'Maria Santos',
      module: 'LabPro',
      status: 'pending_approval',
      confidence: 88,
      createdAt: '2026-01-14',
      cortexInsights: {
        summary: 'Avaliação completa de marcadores hormonais',
        risks: ['Verificar histórico de tireoide'],
      },
    },
    {
      id: 'proto_003',
      title: 'Protocolo Farmacológico: Blend Personalizad o',
      patientName: 'Carlos Oliveira',
      module: 'Pharma',
      status: 'draft',
      confidence: 85,
      createdAt: '2026-01-13',
      cortexInsights: {
        summary: 'Formulação customizada para perfil do paciente',
        risks: [],
      },
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { label: string; className: string }
    > = {
      active: { label: 'Ativo', className: 'badge-success' },
      pending_approval: {
        label: 'Pendente',
        className: 'badge-warning',
      },
      draft: { label: 'Rascunho', className: 'badge-info' },
      completed: { label: 'Concluído', className: 'badge-success' },
      cancelled: { label: 'Cancelado', className: 'badge-error' },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return <span className={`badge ${config.className}`}>{config.label}</span>;
  };

  const getModuleBadge = (module: string) => {
    const colors: Record<string, string> = {
      EndoInject: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      LabPro: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      Pharma: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      iMeddis: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          colors[module] || colors.LabPro
        }`}
      >
        {module}
      </span>
    );
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-medical-teal to-medical-teal-700">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-graphite dark:text-ice-gray">
                Protocolos AI
              </h1>
              <p className="text-graphite-400 dark:text-ice-gray/60">
                Geração automatizada de protocolos clínicos via CORTEX AI
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowNewProtocolModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Gerar Novo Protocolo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-medical-teal" />
            <span className="text-sm text-graphite-400 dark:text-ice-gray/60">
              Total
            </span>
          </div>
          <p className="text-2xl font-bold text-graphite dark:text-ice-gray">
            156
          </p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm text-graphite-400 dark:text-ice-gray/60">
              Aprovados
            </span>
          </div>
          <p className="text-2xl font-bold text-graphite dark:text-ice-gray">
            98
          </p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-graphite-400 dark:text-ice-gray/60">
              Pendentes
            </span>
          </div>
          <p className="text-2xl font-bold text-graphite dark:text-ice-gray">
            8
          </p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-medical-teal" />
            <span className="text-sm text-graphite-400 dark:text-ice-gray/60">
              Confiança Média
            </span>
          </div>
          <p className="text-2xl font-bold text-graphite dark:text-ice-gray">
            89%
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-graphite-400 dark:text-ice-gray/40" />
          <input
            type="text"
            placeholder="Buscar protocolos..."
            className="input-field pl-10"
          />
        </div>
        <button className="btn-outline flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtros
        </button>
      </div>

      {/* Protocols List */}
      <div className="space-y-4">
        {protocols.map((protocol) => (
          <div key={protocol.id} className="glass-card p-6 hover:scale-[1.01] transition-transform cursor-pointer">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-graphite dark:text-ice-gray">
                    {protocol.title}
                  </h3>
                  {getStatusBadge(protocol.status)}
                </div>
                <div className="flex items-center gap-3 text-sm text-graphite-400 dark:text-ice-gray/60">
                  <span>Paciente: {protocol.patientName}</span>
                  <span>•</span>
                  {getModuleBadge(protocol.module)}
                  <span>•</span>
                  <span>{protocol.createdAt}</span>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <Brain className="w-4 h-4 text-medical-teal" />
                  <span className="text-sm font-medium text-graphite-400 dark:text-ice-gray/60">
                    Confiança
                  </span>
                </div>
                <p className="text-2xl font-bold text-medical-teal">
                  {protocol.confidence}%
                </p>
              </div>
            </div>

            {/* CORTEX Insights */}
            <div className="p-4 rounded-lg bg-medical-teal/5 dark:bg-medical-teal/10 border border-medical-teal/20">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-medical-teal flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-graphite dark:text-ice-gray mb-2">
                    CORTEX Insight:
                  </p>
                  <p className="text-sm text-graphite-400 dark:text-ice-gray/70">
                    {protocol.cortexInsights.summary}
                  </p>
                  {protocol.cortexInsights.risks.length > 0 && (
                    <div className="mt-3 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-600 dark:text-yellow-400">
                        {protocol.cortexInsights.risks.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-4">
              <button className="text-sm text-medical-teal hover:text-medical-teal-600 font-medium transition-colors">
                Ver Detalhes
              </button>
              <span className="text-graphite-300 dark:text-graphite-600">•</span>
              <button className="text-sm text-medical-teal hover:text-medical-teal-600 font-medium transition-colors">
                Editar
              </button>
              <span className="text-graphite-300 dark:text-graphite-600">•</span>
              <button className="text-sm text-medical-teal hover:text-medical-teal-600 font-medium transition-colors">
                Exportar PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Protocol Modal Placeholder */}
      {showNewProtocolModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-card p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-graphite dark:text-ice-gray mb-4">
              Gerar Novo Protocolo
            </h2>
            <p className="text-graphite-400 dark:text-ice-gray/60 mb-6">
              Funcionalidade em desenvolvimento. O modal completo será implementado em breve.
            </p>
            <button
              onClick={() => setShowNewProtocolModal(false)}
              className="btn-primary"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
