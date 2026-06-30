/**
 * Base Application Error class.
 * All domain-specific errors should extend this.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, code = "INTERNAL_SERVER_ERROR", isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    
    // Maintain proper stack trace in V8 engine
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Authentication and authorization related errors.
 */
export class AuthError extends AppError {
  constructor(message = "Unauthorized access.", code = "UNAUTHORIZED") {
    super(message, 401, code, true);
  }
}

/**
 * Database access or Prisma query errors wrapper.
 * Hides raw details to prevent leak of PostgreSQL schema.
 */
export class DatabaseError extends AppError {
  constructor(message = "A database error occurred. Please try again later.", code = "DATABASE_ERROR") {
    super(message, 500, code, true);
  }
}

/**
 * Request validation (Zod schema checking) errors.
 */
export class ValidationError extends AppError {
  public readonly details?: unknown;

  constructor(message = "Invalid request payload.", details?: unknown, code = "VALIDATION_ERROR") {
    super(message, 400, code, true);
    this.details = details;
  }
}

/**
 * CMI Payment Gateway integration errors.
 */
export class PaymentError extends AppError {
  constructor(message = "Payment transaction failed or verified incorrectly.", code = "PAYMENT_ERROR") {
    super(message, 400, code, true);
  }
}

/**
 * LLM generation or AI service failure errors.
 */
export class AIError extends AppError {
  constructor(message = "The AI suggestion engine was unable to respond. Please try again.", code = "AI_SERVICE_ERROR") {
    super(message, 502, code, true);
  }
}
