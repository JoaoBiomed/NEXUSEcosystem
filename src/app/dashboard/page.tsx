'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Users,
  FileText,
  AlertCircle,
  Calendar,
  Package,
  TrendingUp,
  Activity,
  Brain,
} from 'lucide-react';

export default function DashboardPage() {
  // Mock data - would come from Firebase
  const metrics = {
    totalPatients: 247,
    activeProtocols: 56,
    pendingApprovals: 8,
    todayAppointments: 12,
    lowStockItems: 3,
    cortexConfidence: 94,
  };

  const recentActivity = [
    {
      id: 1,
      type: 'protocol',
      description: 'Novo protocolo EndoInject criado',
      user: 'Dr. João Victor',
      time: '10 min atrás',
    },
    {
      id: 2,
      type: 'patient',
      description: 'Paciente Maria Silva cadastrada',
      user: 'Dr. João Victor',
      time: '25 min atrás',
    },
    {
      id: 3,
      type: 'exam',
      description: 'Resultados laboratoriais disponíveis',
      user: 'Lab Central',
      time: '1h atrás',
    },
    {
      id: 4,
      type: 'approval',
      description: 'Protocolo #2341 aprovado',
      user: 'Dr. João Victor',
      time: '2h atrás',
    },
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-graphite dark:text-ice-gray mb-2">
          Visão Geral
        </h1>
        <p className="text-graphite-400 dark:text-ice-gray/60">
          Bem-vindo ao NEXUS Ecosystem - Plataforma Clínica Inteligente
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {/* Total Patients */}
        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              +12%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-graphite dark:text-ice-gray mb-1">
            {metrics.totalPatients}
          </h3>
          <p className="text-sm text-graphite-400 dark:text-ice-gray/60">
            Total de Pacientes
          </p>
        </div>

        {/* Active Protocols */}
        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-medical-teal/10">
              <FileText className="w-6 h-6 text-medical-teal" />
            </div>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              +8%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-graphite dark:text-ice-gray mb-1">
            {metrics.activeProtocols}
          </h3>
          <p className="text-sm text-graphite-400 dark:text-ice-gray/60">
            Protocolos Ativos
          </p>
        </div>

        {/* Pending Approvals */}
        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-yellow-500/10">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
              Atenção
            </span>
          </div>
          <h3 className="text-2xl font-bold text-graphite dark:text-ice-gray mb-1">
            {metrics.pendingApprovals}
          </h3>
          <p className="text-sm text-graphite-400 dark:text-ice-gray/60">
            Pendentes de Aprovação
          </p>
        </div>

        {/* Today's Appointments */}
        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-500/10">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-sm text-graphite-400 dark:text-ice-gray/60">
              Hoje
            </span>
          </div>
          <h3 className="text-2xl font-bold text-graphite dark:text-ice-gray mb-1">
            {metrics.todayAppointments}
          </h3>
          <p className="text-sm text-graphite-400 dark:text-ice-gray/60">
            Consultas Agendadas
          </p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* CORTEX AI Status */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-medical-teal to-medical-teal-700">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-graphite dark:text-ice-gray">
                CORTEX AI Status
              </h3>
              <p className="text-sm text-graphite-400 dark:text-ice-gray/60">
                Sistema cognitivo supervisionado
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-graphite-400 dark:text-ice-gray/60">
                  Confiança Média
                </span>
                <span className="text-sm font-semibold text-graphite dark:text-ice-gray">
                  {metrics.cortexConfidence}%
                </span>
              </div>
              <div className="w-full h-2 bg-graphite-200 dark:bg-graphite-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-medical-teal to-green-500 rounded-full shadow-teal-glow"
                  style={{ width: `${metrics.cortexConfidence}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-graphite/20 dark:border-medical-teal/10">
              <div>
                <p className="text-xs text-graphite-400 dark:text-ice-gray/60 mb-1">
                  Protocolos
                </p>
                <p className="text-lg font-semibold text-graphite dark:text-ice-gray">
                  156
                </p>
              </div>
              <div>
                <p className="text-xs text-graphite-400 dark:text-ice-gray/60 mb-1">
                  Análises
                </p>
                <p className="text-lg font-semibold text-graphite dark:text-ice-gray">
                  1.2k
                </p>
              </div>
              <div>
                <p className="text-xs text-graphite-400 dark:text-ice-gray/60 mb-1">
                  Uptime
                </p>
                <p className="text-lg font-semibold text-medical-teal">
                  99.9%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Alert */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-orange-500/10">
              <Package className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-graphite dark:text-ice-gray">
                Alertas de Estoque
              </h3>
              <p className="text-sm text-graphite-400 dark:text-ice-gray/60">
                Itens que requerem atenção
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30">
              <div>
                <p className="text-sm font-medium text-graphite dark:text-ice-gray">
                  Testosterona Cipionato
                </p>
                <p className="text-xs text-graphite-400 dark:text-ice-gray/60">
                  Estoque baixo
                </p>
              </div>
              <span className="badge badge-warning">3 und</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30">
              <div>
                <p className="text-sm font-medium text-graphite dark:text-ice-gray">
                  HCG 5000 UI
                </p>
                <p className="text-xs text-graphite-400 dark:text-ice-gray/60">
                  Fora de estoque
                </p>
              </div>
              <span className="badge badge-error">0 und</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30">
              <div>
                <p className="text-sm font-medium text-graphite dark:text-ice-gray">
                  Anastrozol 1mg
                </p>
                <p className="text-xs text-graphite-400 dark:text-ice-gray/60">
                  Próximo ao vencimento
                </p>
              </div>
              <span className="badge badge-warning">15 dias</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-medical-teal/10">
              <Activity className="w-6 h-6 text-medical-teal" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-graphite dark:text-ice-gray">
                Atividade Recente
              </h3>
              <p className="text-sm text-graphite-400 dark:text-ice-gray/60">
                Últimas ações no sistema
              </p>
            </div>
          </div>
          <button className="text-sm text-medical-teal hover:text-medical-teal-600 font-medium transition-colors">
            Ver Todas
          </button>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-graphite-50 dark:hover:bg-graphite-700/30 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-medical-teal mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-graphite dark:text-ice-gray mb-1">
                  {activity.description}
                </p>
                <p className="text-xs text-graphite-400 dark:text-ice-gray/60">
                  {activity.user} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
