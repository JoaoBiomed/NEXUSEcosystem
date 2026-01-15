// ============================================================================
// NEXUS ECOSYSTEM - DETERMINISTIC UTILITIES
// ============================================================================

import CryptoJS from 'crypto-js';

/**
 * Generate a deterministic hash for any object
 * Used for audit trails and validation
 */
export function generateHash(data: any): string {
  // Sort object keys to ensure deterministic hashing
  const sortedData = sortObjectKeys(data);
  const jsonString = JSON.stringify(sortedData);
  return CryptoJS.SHA256(jsonString).toString();
}

/**
 * Recursively sort object keys for deterministic serialization
 */
function sortObjectKeys(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }

  const sorted: any = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = sortObjectKeys(obj[key]);
    });

  return sorted;
}

/**
 * Validate hash integrity
 */
export function validateHash(data: any, expectedHash: string): boolean {
  const computedHash = generateHash(data);
  return computedHash === expectedHash;
}

/**
 * Generate a unique deterministic ID based on data
 */
export function generateDeterministicId(prefix: string, data: any): string {
  const hash = generateHash(data);
  const timestamp = Date.now();
  return `${prefix}_${timestamp}_${hash.substring(0, 12)}`;
}

/**
 * Validate protocol determinism
 * Ensures that the protocol content matches its hash
 */
export function validateProtocolDeterminism(protocol: any): {
  valid: boolean;
  currentHash: string;
  expectedHash: string;
} {
  const { hash: expectedHash, ...protocolData } = protocol;
  const currentHash = generateHash(protocolData);

  return {
    valid: currentHash === expectedHash,
    currentHash,
    expectedHash: expectedHash || '',
  };
}

/**
 * Generate audit trail hash
 * Combines action data with previous hash for blockchain-like integrity
 */
export function generateAuditHash(
  actionData: any,
  previousHash: string = '0'
): string {
  const combinedData = {
    ...actionData,
    previousHash,
    timestamp: new Date().toISOString(),
  };
  return generateHash(combinedData);
}

/**
 * Verify audit chain integrity
 */
export function verifyAuditChain(auditLogs: any[]): boolean {
  if (auditLogs.length === 0) return true;

  let previousHash = '0';
  for (const log of auditLogs) {
    const { hash, ...logData } = log;
    const expectedHash = generateAuditHash(logData, previousHash);

    if (hash !== expectedHash) {
      console.error('Audit chain broken at log:', log.id);
      return false;
    }

    previousHash = hash;
  }

  return true;
}
