'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Calendar,
  Users,
  FileText,
  Syringe,
  FlaskConical,
  Pill,
  Shield,
  Scan,
  Heart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Brain,
} from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  category?: string;
}

const menuItems: MenuItem[] = [
  // Sistema
  { name: 'Visão Geral', href: '/dashboard', icon: Home, category: 'Sistema' },
  { name: 'Agenda', href: '/dashboard/agenda', icon: Calendar, category: 'Sistema' },
  { name: 'Pacientes', href: '/dashboard/pacientes', icon: Users, category: 'Sistema' },

  // Módulos
  { name: 'Protocolos AI', href: '/dashboard/protocolos-ai', icon: Brain, category: 'Módulos' },
  { name: 'EndoInject', href: '/dashboard/endoinject', icon: Syringe, category: 'Módulos' },
  { name: 'LabPro', href: '/dashboard/labpro', icon: FlaskConical, category: 'Módulos' },
  { name: 'Pharma', href: '/dashboard/pharma', icon: Pill, category: 'Módulos' },
  { name: 'iMeddis', href: '/dashboard/imeddis', icon: Shield, category: 'Módulos' },

  // Mini Módulos
  { name: 'BodyScan 3D', href: '/dashboard/bodyscan', icon: Scan, category: 'Mini Módulos' },
  { name: 'Lifestyle', href: '/dashboard/lifestyle', icon: Heart, category: 'Mini Módulos' },

  // Configurações
  { name: 'Configurações', href: '/dashboard/configuracoes', icon: Settings, category: 'Configurações' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Outros';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-deep-navy border-r border-medical-teal/10
        transition-all duration-250 z-40
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-medical-teal/10">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-medical-teal to-medical-teal-700 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-medical-teal font-bold text-lg">NEXUS</h1>
              <p className="text-ice-gray/60 text-xs">v1.3.0</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-graphite-700 text-medical-teal transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-6">
            {!isCollapsed && (
              <h3 className="text-ice-gray/40 text-xs font-semibold uppercase mb-2 px-3">
                {category}
              </h3>
            )}
            <ul className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-all duration-180 group
                        ${
                          isActive
                            ? 'bg-medical-teal text-white shadow-teal-glow'
                            : 'text-ice-gray hover:bg-graphite-700 hover:text-medical-teal'
                        }
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <Icon
                        className={`
                          w-5 h-5 flex-shrink-0
                          ${isActive ? 'text-white' : 'group-hover:text-medical-teal'}
                        `}
                      />
                      {!isCollapsed && (
                        <span className="font-medium text-sm">{item.name}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-medical-teal/10">
          <div className="glass-card p-3">
            <p className="text-xs text-ice-gray/60 mb-1">CORTEX AI Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-ice-gray font-medium">Online</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
