// ============================================================================
// NEXUS ECOSYSTEM - FIRESTORE UTILITIES
// ============================================================================

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  Timestamp,
  addDoc,
  WhereFilterOp,
} from 'firebase/firestore';
import { db } from './firebase';

// ============================================================================
// COLLECTION NAMES
// ============================================================================

export const COLLECTIONS = {
  PATIENTS: 'patients',
  PROTOCOLS: 'protocols',
  LOGS: 'logs',
  TEMPLATES: 'templates',
  APPOINTMENTS: 'appointments',
  EXAMS: 'exams',
  MEDICATIONS: 'medications',
  STOCK: 'stock',
  USERS: 'users',
} as const;

// ============================================================================
// GENERIC CRUD OPERATIONS
// ============================================================================

/**
 * Create a new document with auto-generated ID
 */
export async function createDocument<T>(
  collectionName: string,
  data: Omit<T, 'id'>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Create or update a document with specific ID
 */
export async function setDocument<T>(
  collectionName: string,
  id: string,
  data: Omit<T, 'id'>,
  merge: boolean = false
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(
      docRef,
      {
        ...data,
        updatedAt: Timestamp.now(),
      },
      { merge }
    );
  } catch (error) {
    console.error(`Error setting document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Get a single document by ID
 */
export async function getDocument<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as T;
    }
    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Update a document
 */
export async function updateDocument<T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Delete a document
 */
export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Query documents with filters
 */
export async function queryDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Get all documents from a collection
 */
export async function getAllDocuments<T>(
  collectionName: string
): Promise<T[]> {
  return queryDocuments<T>(collectionName);
}

// ============================================================================
// SPECIALIZED QUERIES
// ============================================================================

/**
 * Get documents by field value
 */
export async function getDocumentsByField<T>(
  collectionName: string,
  field: string,
  operator: WhereFilterOp,
  value: any
): Promise<T[]> {
  return queryDocuments<T>(collectionName, [where(field, operator, value)]);
}

/**
 * Get recent documents
 */
export async function getRecentDocuments<T>(
  collectionName: string,
  limitCount: number = 10,
  orderByField: string = 'createdAt'
): Promise<T[]> {
  return queryDocuments<T>(collectionName, [
    orderBy(orderByField, 'desc'),
    limit(limitCount),
  ]);
}

// ============================================================================
// PATIENT-SPECIFIC OPERATIONS
// ============================================================================

export async function getPatientById(patientId: string) {
  return getDocument(COLLECTIONS.PATIENTS, patientId);
}

export async function getActivePatients() {
  return getDocumentsByField(COLLECTIONS.PATIENTS, 'status', '==', 'active');
}

// ============================================================================
// PROTOCOL-SPECIFIC OPERATIONS
// ============================================================================

export async function getProtocolsByPatient(patientId: string) {
  return getDocumentsByField(
    COLLECTIONS.PROTOCOLS,
    'patientId',
    '==',
    patientId
  );
}

export async function getProtocolsByStatus(status: string) {
  return getDocumentsByField(COLLECTIONS.PROTOCOLS, 'status', '==', status);
}

// ============================================================================
// AUDIT LOG OPERATIONS
// ============================================================================

export async function createAuditLog(logData: any): Promise<string> {
  return createDocument(COLLECTIONS.LOGS, logData);
}

export async function getRecentAuditLogs(limitCount: number = 50) {
  return getRecentDocuments(COLLECTIONS.LOGS, limitCount, 'timestamp');
}

// ============================================================================
// APPOINTMENT OPERATIONS
// ============================================================================

export async function getAppointmentsByDate(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return queryDocuments(COLLECTIONS.APPOINTMENTS, [
    where('date', '>=', Timestamp.fromDate(startOfDay)),
    where('date', '<=', Timestamp.fromDate(endOfDay)),
    orderBy('date', 'asc'),
  ]);
}

export async function getTodayAppointments() {
  return getAppointmentsByDate(new Date());
}

// ============================================================================
// STOCK OPERATIONS
// ============================================================================

export async function getLowStockItems() {
  return getDocumentsByField(COLLECTIONS.STOCK, 'status', '==', 'low_stock');
}

export async function getOutOfStockItems() {
  return getDocumentsByField(COLLECTIONS.STOCK, 'status', '==', 'out_of_stock');
}
