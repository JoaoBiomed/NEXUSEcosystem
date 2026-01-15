// ============================================================================
// NEXUS ECOSYSTEM - TYPE DEFINITIONS v1.3.0
// ============================================================================

import { Timestamp } from 'firebase/firestore';

// ============================================================================
// PATIENT TYPES
// ============================================================================

export interface Patient {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  birthDate: string;
  email?: string;
  phone?: string;
  cpf?: string;
  address?: Address;
  history: MedicalHistory[];
  allergies?: string[];
  currentMedications?: string[];
  status: 'active' | 'inactive' | 'archived';
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  createdBy: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface MedicalHistory {
  date: Date;
  description: string;
  type: 'exam' | 'diagnosis' | 'procedure' | 'note';
  attachments?: string[];
}

// ============================================================================
// PROTOCOL TYPES
// ============================================================================

export interface Protocol {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  module: ModuleType;
  objective: string;
  rationale: string;
  cortexInsights: CortexInsight;
  status: ProtocolStatus;
  confidence: number; // 0-100
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  createdBy: string;
  tags: string[];
  content: ProtocolContent;
  hash?: string; // Deterministic hash for validation
}

export type ModuleType =
  | 'EndoInject'
  | 'LabPro'
  | 'Pharma'
  | 'iMeddis'
  | 'ProtocolosAI'
  | 'BioScan3D'
  | 'Lifestyle';

export type ProtocolStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'archived';

export interface CortexInsight {
  summary: string;
  keyPoints: string[];
  risks: string[];
  recommendations: string[];
  confidence: number;
  reasoning: string;
  generatedAt: Date;
  modelVersion: string;
}

export interface ProtocolContent {
  sections: ProtocolSection[];
  medications?: Medication[];
  exams?: ExamRequest[];
  instructions?: string[];
}

export interface ProtocolSection {
  title: string;
  content: string;
  order: number;
}

// ============================================================================
// MEDICATION & PHARMACY TYPES
// ============================================================================

export interface Medication {
  id: string;
  name: string;
  activeIngredient: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: 'oral' | 'injectable' | 'topical' | 'sublingual' | 'other';
  instructions: string;
  inStock: boolean;
  alternatives?: string[];
}

export interface FormulationRequest {
  id: string;
  patientId: string;
  medications: Medication[];
  status: 'pending' | 'approved' | 'prepared' | 'delivered';
  createdAt: Date;
  approvedBy?: string;
  preparedBy?: string;
}

export interface StockItem {
  id: string;
  name: string;
  activeIngredient: string;
  quantity: number;
  unit: string;
  expirationDate: Date;
  supplier: string;
  batchNumber: string;
  lowStockThreshold: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';
}

// ============================================================================
// LAB & EXAM TYPES
// ============================================================================

export interface ExamRequest {
  id: string;
  patientId: string;
  type: ExamType;
  description: string;
  requestedAt: Date;
  scheduledFor?: Date;
  status: 'requested' | 'scheduled' | 'completed' | 'cancelled';
  results?: ExamResult;
}

export type ExamType =
  | 'blood'
  | 'hormone'
  | 'imaging'
  | 'biopsy'
  | 'genetic'
  | 'other';

export interface ExamResult {
  id: string;
  examId: string;
  date: Date;
  parameters: BioMarker[];
  interpretation: string;
  attachments: string[];
  interpretedBy: string;
}

export interface BioMarker {
  name: string;
  value: number;
  unit: string;
  referenceRange: {
    min: number;
    max: number;
  };
  status: 'normal' | 'low' | 'high' | 'critical';
  interpretation?: string;
}

// ============================================================================
// AGENT TYPES
// ============================================================================

export interface AgentAction {
  id: string;
  agentName: AgentName;
  action: string;
  input: any;
  output: any;
  timestamp: Date;
  status: 'success' | 'error' | 'pending';
  error?: string;
  executionTime?: number; // milliseconds
}

export type AgentName =
  | 'CoreAgent'
  | 'PPEngineAgent'
  | 'PharmaAgent'
  | 'AuditAgent'
  | 'FirestoreAgent'
  | 'ValidatorAgent'
  | 'IntegrationAgent'
  | 'VitalityAgent'
  | 'AndroAgent'
  | 'AestheAgent'
  | 'SlimAgent'
  | 'BioMarkerAgent'
  | 'EndoLabAgent'
  | 'ImmunoAgent'
  | 'FormulationAgent'
  | 'StockAgent'
  | 'MeddisCoreAgent'
  | 'BioScanAgent'
  | 'LifestyleAgent';

export interface AgentConfig {
  name: AgentName;
  enabled: boolean;
  priority: number;
  timeout: number; // milliseconds
  retryAttempts: number;
}

// ============================================================================
// AUDIT & LOGGING TYPES
// ============================================================================

export interface AuditLog {
  id: string;
  agent: AgentName;
  action: string;
  userId: string;
  userName: string;
  timestamp: Timestamp | Date;
  result: 'success' | 'failure' | 'warning';
  details: any;
  ipAddress?: string;
  hash: string; // Immutable hash for audit trail
}

export interface GovernancePolicy {
  lockStatus: 'ENABLED' | 'DISABLED';
  explainMode: 'ACTIVE' | 'PASSIVE';
  auditLogging: boolean;
  determinismCheck: boolean;
}

// ============================================================================
// USER & AUTHENTICATION TYPES
// ============================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  registrationNumber: string; // CRM, CRBM, etc.
  registrationType: 'CRM' | 'CRBM' | 'CRF' | 'OTHER';
  specialty?: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  lastLogin: Date;
}

export type UserRole =
  | 'medico'
  | 'farmaceutico'
  | 'administrador'
  | 'auditor'
  | 'paciente';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'pt-BR' | 'en-US';
  notifications: boolean;
  defaultModule?: ModuleType;
}

// ============================================================================
// APPOINTMENT & SCHEDULING TYPES
// ============================================================================

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: Date;
  duration: number; // minutes
  type: 'consultation' | 'followup' | 'procedure' | 'exam';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'noshow';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// TEMPLATE TYPES
// ============================================================================

export interface ProtocolTemplate {
  id: string;
  module: ModuleType;
  title: string;
  description: string;
  tags: string[];
  baseContent: ProtocolContent;
  createdBy: string;
  createdAt: Date;
  isPublic: boolean;
  usageCount: number;
}

// ============================================================================
// DASHBOARD & METRICS TYPES
// ============================================================================

export interface DashboardMetrics {
  totalPatients: number;
  activeProtocols: number;
  pendingApprovals: number;
  todayAppointments: number;
  lowStockItems: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'protocol' | 'patient' | 'appointment' | 'exam';
  description: string;
  timestamp: Date;
  user: string;
}

// ============================================================================
// CORTEX AI TYPES
// ============================================================================

export interface CortexRequest {
  prompt: string;
  context: any;
  module: ModuleType;
  patientData?: Patient;
  examData?: ExamResult[];
  temperature?: number; // 0-1
  maxTokens?: number;
}

export interface CortexResponse {
  content: string;
  insights: CortexInsight;
  confidence: number;
  tokensUsed: number;
  modelVersion: string;
  timestamp: Date;
}

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================

export type {
  Timestamp,
};
