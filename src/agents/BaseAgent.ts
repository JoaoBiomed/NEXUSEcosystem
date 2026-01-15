// ============================================================================
// NEXUS ECOSYSTEM - BASE AGENT CLASS
// ============================================================================

import { AgentName, AgentAction, AgentConfig } from '@/types';
import { generateHash, generateAuditHash } from '@/lib/determinism';
import { createAuditLog } from '@/lib/firestore';

/**
 * Base Agent Class
 * All agents in the PPE-Core+ system extend from this base class
 */
export abstract class BaseAgent {
  protected name: AgentName;
  protected config: AgentConfig;
  protected isEnabled: boolean;

  constructor(name: AgentName, config: Partial<AgentConfig> = {}) {
    this.name = name;
    this.config = {
      name,
      enabled: config.enabled ?? true,
      priority: config.priority ?? 5,
      timeout: config.timeout ?? 30000,
      retryAttempts: config.retryAttempts ?? 3,
    };
    this.isEnabled = this.config.enabled;
  }

  /**
   * Abstract method that must be implemented by all agents
   */
  abstract execute(input: any): Promise<any>;

  /**
   * Validate input before execution
   */
  protected abstract validate(input: any): boolean;

  /**
   * Run the agent with full lifecycle management
   */
  async run(input: any, userId: string = 'system'): Promise<AgentAction> {
    const startTime = Date.now();
    const actionId = `${this.name}_${Date.now()}`;

    // Validate input
    if (!this.validate(input)) {
      const error = 'Invalid input for agent execution';
      await this.logAction(actionId, input, null, 'error', error, userId);
      throw new Error(error);
    }

    // Check if agent is enabled
    if (!this.isEnabled) {
      const error = `Agent ${this.name} is disabled`;
      await this.logAction(actionId, input, null, 'error', error, userId);
      throw new Error(error);
    }

    try {
      // Execute with timeout
      const output = await this.executeWithTimeout(input);
      const executionTime = Date.now() - startTime;

      // Log successful action
      const action = await this.logAction(
        actionId,
        input,
        output,
        'success',
        undefined,
        userId,
        executionTime
      );

      return action;
    } catch (error: any) {
      const executionTime = Date.now() - startTime;

      // Log failed action
      const action = await this.logAction(
        actionId,
        input,
        null,
        'error',
        error.message,
        userId,
        executionTime
      );

      throw error;
    }
  }

  /**
   * Execute with timeout protection
   */
  private async executeWithTimeout(input: any): Promise<any> {
    return Promise.race([
      this.execute(input),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error(`Agent ${this.name} execution timeout`)),
          this.config.timeout
        )
      ),
    ]);
  }

  /**
   * Log agent action to audit trail
   */
  private async logAction(
    id: string,
    input: any,
    output: any,
    status: 'success' | 'error' | 'pending',
    error?: string,
    userId: string = 'system',
    executionTime?: number
  ): Promise<AgentAction> {
    const action: AgentAction = {
      id,
      agentName: this.name,
      action: `${this.name} execution`,
      input,
      output,
      timestamp: new Date(),
      status,
      error,
      executionTime,
    };

    // Create audit log in Firestore
    try {
      await createAuditLog({
        agent: this.name,
        action: action.action,
        userId,
        userName: userId,
        timestamp: action.timestamp,
        result: status,
        details: {
          input,
          output,
          error,
          executionTime,
        },
        hash: generateHash(action),
      });
    } catch (logError) {
      console.error('Failed to create audit log:', logError);
    }

    return action;
  }

  /**
   * Enable or disable the agent
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    this.config.enabled = enabled;
  }

  /**
   * Get agent configuration
   */
  getConfig(): AgentConfig {
    return { ...this.config };
  }

  /**
   * Get agent name
   */
  getName(): AgentName {
    return this.name;
  }

  /**
   * Check if agent is enabled
   */
  isAgentEnabled(): boolean {
    return this.isEnabled;
  }
}
