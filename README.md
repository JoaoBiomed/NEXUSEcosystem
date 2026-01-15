# 🧠 ECOSSISTEMA NEXUS

## Plataforma Clínica Inteligente e Modular
**Versão 1.3.0 (Arquitetura PPE-Core+)**

Sistema determinístico multiagente com governança médica, farmacologia autônoma e geração automatizada de protocolos clínicos via IA.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Características Principais](#-características-principais)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Módulos](#-módulos)
- [Sistema de Agentes](#-sistema-de-agentes)
- [CORTEX AI](#-cortex-ai)
- [Desenvolvimento](#-desenvolvimento)
- [Licença](#-licença)

---

## 🎯 Visão Geral

O **NEXUS Ecosystem** é o cérebro clínico determinístico que une IA + Governança + Farmacologia em um único ecossistema. Ele atua como **CORTEX AI** — um sistema cognitivo supervisionado que raciocina, explica e audita, mas nunca decide sozinho.

### Missão

Garantir previsibilidade, auditabilidade e segurança clínica total — cobrindo todo o ciclo:

```
análise laboratorial → decisão farmacológica → prescrição → estoque → auditoria
```

### Princípios

- ✅ **Determinístico**: Todas as ações são rastreáveis e reproduzíveis
- ✅ **Auditável**: Logs imutáveis com hash criptográfico
- ✅ **Explicável**: Cada decisão de IA vem com raciocínio claro
- ✅ **Supervisionado**: Nenhuma decisão de IA sem validação humana

---

## ⚡ Características Principais

- 🧬 **Geração automatizada de protocolos clínicos** personalizados
- ⚖️ **Governança e rastreabilidade** completa de todas as ações
- 💊 **Controle de estoque** e substituições farmacológicas
- 🧠 **CORTEX AI** - Sistema cognitivo baseado em Gemini Pro
- 📊 **Análise laboratorial** inteligente com interpretação de biomarcadores
- 🩺 **Auditoria médica** com logs determinísticos imutáveis
- 🎨 **Design System** NEXUSClinicalTheme v4 com Glassmorphism
- 📱 **PWA** - Progressive Web App responsiva

---

## 🏗️ Arquitetura

### Arquitetura Multiagente PPE-Core+

O NEXUS implementa uma arquitetura de agentes especializados que trabalham em conjunto:

```
┌─────────────────────────────────────────────────────────────┐
│                       CORTEX AI                              │
│            (Maestro de Coordenação)                          │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐
│   CoreAgent    │  │  PPEngineAgent  │  │   PharmaAgent   │
│   (Governança) │  │  (Protocolos)   │  │  (Farmácia)     │
└───────┬────────┘  └────────┬────────┘  └────────┬────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐
│  AuditAgent    │  │ ValidatorAgent  │  │ FirestoreAgent  │
│  (Auditoria)   │  │ (Validação)     │  │ (Persistência)  │
└────────────────┘  └─────────────────┘  └─────────────────┘
```

### Agentes Principais

| Agente | Função | Prioridade |
|--------|--------|------------|
| 🧠 **CoreAgent** | Governança e risco clínico | 10 (máxima) |
| ⚙️ **PPEngineAgent** | Motor de personalização de protocolos | 8 |
| 💊 **PharmaAgent** | Gestão farmacológica e substituições | 7 |
| 🔍 **ValidatorAgent** | Verificação de determinismo via hash | 9 |
| 📜 **AuditAgent** | Registro e rastreabilidade | 8 |
| 💾 **FirestoreAgent** | Persistência de dados | 7 |

### Fluxo Determinístico

```
PPEngineAgent → PharmaAgent → CoreAgent → AuditAgent → FirestoreAgent → ValidatorAgent
```

---

## 🛠️ Tecnologias

### Frontend
- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Lucide Icons** - Ícones modernos

### Backend
- **Node.js** - Runtime JavaScript
- **Firebase Functions** - Serverless functions
- **Firebase Firestore** - Banco de dados NoSQL
- **Firebase Authentication** - Autenticação de usuários

### Inteligência Artificial
- **Google Gemini Pro** - Modelo de IA para geração de protocolos
- **CORTEX AI** - Sistema cognitivo customizado

### DevOps
- **Google Cloud Platform** - Hospedagem e infraestrutura
- **Git** - Controle de versão
- **ESLint** - Linting de código

---

## 📦 Instalação

### Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Conta Firebase
- Chave API do Google Gemini

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/JoaoBiomed/NEXUSEcosystem.git
cd NEXUSEcosystem
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key
```

4. **Execute o projeto em modo desenvolvimento**
```bash
npm run dev
```

5. **Acesse o sistema**
```
http://localhost:3000
```

---

## ⚙️ Configuração

### Firebase Setup

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative o Firestore Database
3. Ative o Authentication (Email/Password)
4. Copie as credenciais para `.env.local`

### Gemini AI Setup

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Gere uma API Key
3. Adicione a chave no `.env.local`

---

## 📁 Estrutura do Projeto

```
NEXUSEcosystem/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Páginas do dashboard
│   │   │   ├── page.tsx        # Visão Geral
│   │   │   ├── protocolos-ai/  # Módulo Protocolos AI
│   │   │   ├── pacientes/      # Gestão de Pacientes
│   │   │   ├── agenda/         # Agendamento
│   │   │   └── ...             # Outros módulos
│   │   ├── layout.tsx          # Layout raiz
│   │   └── page.tsx            # Página inicial
│   │
│   ├── components/             # Componentes React
│   │   ├── layout/             # Componentes de layout
│   │   │   ├── Sidebar.tsx     # Barra lateral
│   │   │   ├── Header.tsx      # Cabeçalho
│   │   │   └── DashboardLayout.tsx
│   │   └── ui/                 # Componentes de UI
│   │
│   ├── agents/                 # Sistema de Agentes PPE-Core+
│   │   ├── BaseAgent.ts        # Classe base de agentes
│   │   ├── CoreAgent.ts        # Agente de governança
│   │   ├── PPEngineAgent.ts    # Agente de protocolos
│   │   ├── PharmaAgent.ts      # Agente farmacológico
│   │   ├── ValidatorAgent.ts   # Agente de validação
│   │   ├── orchestrator.ts     # Orquestrador de agentes
│   │   └── index.ts            # Exports
│   │
│   ├── lib/                    # Bibliotecas e utilidades
│   │   ├── firebase.ts         # Configuração Firebase
│   │   ├── firestore.ts        # Operações Firestore
│   │   ├── gemini.ts           # Integração Gemini AI
│   │   └── determinism.ts      # Utilitários determinísticos
│   │
│   ├── types/                  # Definições TypeScript
│   │   └── index.ts            # Tipos do sistema
│   │
│   └── styles/                 # Estilos globais
│       └── globals.css         # CSS global com Tailwind
│
├── public/                     # Arquivos públicos
├── .env.example                # Exemplo de variáveis de ambiente
├── package.json                # Dependências do projeto
├── tsconfig.json               # Configuração TypeScript
├── tailwind.config.js          # Configuração Tailwind
├── next.config.js              # Configuração Next.js
└── README.md                   # Este arquivo
```

---

## 🧩 Módulos

### 🧬 NEXUS EndoInject
Terapias hormonais e injetáveis personalizadas
- Protocolos de TRT (Testosterona)
- Gestão de ciclos hormonais
- Monitoramento de níveis sanguíneos

### 🧪 NEXUS LabPro
Interpretação laboratorial inteligente
- Análise de biomarcadores
- Interpretação de exames hormonais
- Alertas de valores críticos

### 💊 NEXUS Pharma
Gestão de estoque e farmacologia
- Controle de estoque
- Substituições medicamentosas
- Verificação de interações

### ⚖️ NEXUS iMeddis
Governança médica e compliance
- Auditoria de protocolos
- Conformidade regulatória
- Rastreabilidade completa

### 🧠 NEXUS Protocolos AI
Geração automatizada de protocolos
- Protocolos personalizados
- CORTEX AI insights
- Validação determinística

### 🩻 NEXUS BioScan 3D
Avaliação biométrica e antropométrica
- Escaneamento 3D
- Análise de composição corporal
- Monitoramento de progresso

### 💤 NEXUS Lifestyle
Hábitos e qualidade de vida
- Monitoramento de sono
- Registro de alimentação
- Análise de atividade física

---

## 🤖 Sistema de Agentes

### BaseAgent

Classe base que todos os agentes estendem:

```typescript
export abstract class BaseAgent {
  protected name: AgentName;
  protected config: AgentConfig;

  abstract execute(input: any): Promise<any>;
  protected abstract validate(input: any): boolean;

  async run(input: any, userId: string): Promise<AgentAction>
}
```

### CoreAgent - Governança

```typescript
// Validação de protocolo
const result = await coreAgent.run({
  protocol,
  action: 'validate',
  userId: 'doctor_123'
});

// Resultado inclui:
// - approved: boolean
// - risks: string[]
// - recommendations: string[]
// - confidence: number
```

### PPEngineAgent - Protocolos

```typescript
// Geração de protocolo
const result = await ppEngineAgent.run({
  patient,
  module: 'EndoInject',
  objective: 'Otimização hormonal'
});

// Retorna protocolo completo com CORTEX insights
```

### Orquestração

```typescript
import { orchestrateProtocolGeneration } from '@/agents/orchestrator';

const result = await orchestrateProtocolGeneration({
  patient,
  module: 'EndoInject',
  objective: 'Terapia de reposição testosterona',
  userId: 'doctor_123'
});

// Executa todo o fluxo:
// PPEngine → Pharma → Core → Validator → Firestore
```

---

## 🧠 CORTEX AI

### Características

- **Modelo Base**: Google Gemini Pro
- **Temperatura**: 0.7 (balanço criatividade/precisão)
- **Tokens Máximos**: 2000
- **Modo**: Supervisionado (sempre requer validação humana)

### Uso

```typescript
import { cortexAI } from '@/lib/gemini';

// Gerar protocolo
const response = await cortexAI.generateProtocol({
  prompt: 'Criar protocolo de TRT',
  context: { patient, exams },
  module: 'EndoInject',
  patientData: patient
});

// Resultado inclui:
// - content: string (protocolo completo)
// - insights: CortexInsight
// - confidence: number
// - modelVersion: string
```

### CORTEX Insights

```typescript
interface CortexInsight {
  summary: string;              // Resumo do protocolo
  keyPoints: string[];          // Pontos principais
  risks: string[];              // Riscos identificados
  recommendations: string[];    // Recomendações
  confidence: number;           // Nível de confiança (0-100)
  reasoning: string;            // Raciocínio clínico
  generatedAt: Date;
  modelVersion: string;
}
```

---

## 🎨 Design System

### NEXUSClinicalTheme v4

**Cores Principais:**
- Deep Navy: `#0A0F24`
- Medical Teal: `#00C2CB`
- Graphite: `#3A3F58`
- Ice Gray: `#F6F8FA`
- Success: `#28C76F`
- Alert: `#FF4D4F`

**Tipografia:**
- Família: Inter, Segoe UI
- Pesos: 400 (texto), 600 (títulos), 700 (destaques)

**Estilo:**
- Glassmorphism clínico
- Sombra translúcida teal
- Transições suaves (180-250ms)
- Ícones outline (Lucide)

**Classes Utilitárias:**
```css
.glass-card        /* Card com efeito vidro */
.btn-primary       /* Botão primário teal */
.btn-secondary     /* Botão secundário */
.btn-outline       /* Botão outline */
.input-field       /* Campo de entrada */
.badge-success     /* Badge verde */
.badge-warning     /* Badge amarelo */
.teal-glow         /* Efeito brilho teal */
```

---

## 👨‍💻 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build de produção
npm run start        # Inicia servidor de produção

# Qualidade de código
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

### Convenções de Código

- **Componentes**: PascalCase (`DashboardLayout.tsx`)
- **Utilidades**: camelCase (`firestore.ts`)
- **Tipos**: PascalCase interfaces (`Patient`, `Protocol`)
- **Constantes**: UPPER_SNAKE_CASE (`COLLECTIONS`)

### Estrutura de Componentes

```typescript
'use client'; // Para componentes com estado/hooks

import React from 'react';
import { Icon } from 'lucide-react';

interface ComponentProps {
  title: string;
  // ... props
}

export default function Component({ title }: ComponentProps) {
  // ... lógica

  return (
    // ... JSX
  );
}
```

---

## 🔒 Segurança e Governança

### Políticas de Governança

```typescript
{
  lockStatus: 'ENABLED',      // Sistema bloqueado para segurança
  explainMode: 'ACTIVE',      // Modo explicação ativo
  auditLogging: true,         // Logs de auditoria habilitados
  determinismCheck: true      // Verificação determinística ativa
}
```

### Princípios de Segurança

1. ✅ **Nenhuma decisão sem CoreAgent**
2. ✅ **Todos os protocolos têm hash verificável**
3. ✅ **Logs imutáveis com blockchain-like chain**
4. ✅ **IA não substitui o julgamento humano**
5. ✅ **Explicabilidade obrigatória**

---

## 📊 Status do Projeto

**Versão:** 1.3.0 PPE-Core+

### ✅ Implementado
- [x] Estrutura base Next.js + TypeScript
- [x] Design System NEXUSClinicalTheme v4
- [x] Sistema de Agentes PPE-Core+
- [x] Integração Gemini AI (CORTEX)
- [x] Firebase/Firestore configurado
- [x] Dashboard principal
- [x] Módulo Protocolos AI
- [x] Sistema de governança
- [x] Validação determinística
- [x] UI responsiva com Glassmorphism

### 🚧 Em Desenvolvimento
- [ ] Módulo LabPro completo
- [ ] Módulo EndoInject completo
- [ ] Módulo Pharma com estoque real
- [ ] Sistema de autenticação completo
- [ ] Gestão de pacientes CRUD
- [ ] Agenda médica funcional
- [ ] Exportação de relatórios PDF
- [ ] Testes automatizados

### 🔮 Roadmap v2.0
- [ ] Clusterização via Google Cloud
- [ ] Dashboard de Governança CORTEX completo
- [ ] Interpretação avançada de exames (AI BioMarker)
- [ ] Predictive Protocols (ajuste em tempo real)
- [ ] Multi-idioma + compliance internacional
- [ ] API REST pública
- [ ] Mobile App (React Native)

---

## 📝 Licença

Este projeto é propriedade de **João Victor Silva Ferreira** e está sob licença privada.

Todos os direitos reservados © 2026

---

## 👤 Autor

**João Victor Silva Ferreira**
- Criador do Ecossistema NEXUS
- Email: [contato disponível mediante solicitação]

---

## 🙏 Agradecimentos

- Google Gemini Team pela API de IA
- Firebase Team pela infraestrutura
- Next.js Team pelo framework incrível
- Tailwind CSS pela biblioteca de estilos

---

**NEXUS Ecosystem v1.3.0**
*"O sistema nervoso central da clínica inteligente"*

🧠 Determinístico | ⚖️ Auditável | 🔍 Previsível | 💡 Explicável
