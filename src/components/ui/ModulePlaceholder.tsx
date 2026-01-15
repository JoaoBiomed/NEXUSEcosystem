'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LucideIcon } from 'lucide-react';

interface ModulePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export default function ModulePlaceholder({
  title,
  description,
  icon: Icon,
  color,
}: ModulePlaceholderProps) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-2xl">
          <div
            className={`inline-flex p-6 rounded-2xl ${color} mb-6 shadow-lg`}
          >
            <Icon className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-graphite dark:text-ice-gray mb-4">
            {title}
          </h1>
          <p className="text-lg text-graphite-400 dark:text-ice-gray/60 mb-8">
            {description}
          </p>
          <div className="glass-card p-6 text-left">
            <h3 className="text-lg font-semibold text-graphite dark:text-ice-gray mb-3">
              Módulo em Desenvolvimento
            </h3>
            <p className="text-sm text-graphite-400 dark:text-ice-gray/60 mb-4">
              Este módulo está sendo desenvolvido e estará disponível em breve.
              A estrutura base do NEXUS Ecosystem já está implementada com:
            </p>
            <ul className="space-y-2 text-sm text-graphite-400 dark:text-ice-gray/60">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-medical-teal"></div>
                Arquitetura de agentes PPE-Core+
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-medical-teal"></div>
                Integração com CORTEX AI (Gemini)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-medical-teal"></div>
                Sistema de governança determinística
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-medical-teal"></div>
                Firebase/Firestore configurado
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-medical-teal"></div>
                Design System NEXUSClinicalTheme v4
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
