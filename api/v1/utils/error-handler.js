/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  constructor(message, statusCode = 500, details = {}) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }

  toJSON() {
    return {
      error: true,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
      timestamp: this.timestamp
    };
  }
}

/**
 * Validation error
 */
export class ValidationError extends APIError {
  constructor(message, fields = {}) {
    super(message, 400, { fields });
  }
}

/**
 * Not found error
 */
export class NotFoundError extends APIError {
  constructor(message) {
    super(message, 404);
  }
}

/**
 * Authentication error
 */
export class AuthenticationError extends APIError {
  constructor(message) {
    super(message, 401);
  }
}

/**
 * Authorization error
 */
export class AuthorizationError extends APIError {
  constructor(message) {
    super(message, 403);
  }
}

/**
 * Rate limit error
 */
export class RateLimitError extends APIError {
  constructor(message, retryAfter = 60) {
    super(message, 429, { retryAfter });
  }
}

/**
 * External service error (3rd party API)
 */
export class ExternalServiceError extends APIError {
  constructor(service, message, originalError = null) {
    super(`${service} error: ${message}`, 502, {
      service,
      originalError: originalError?.message
    });
  }
}

/**
 * Process error handler
 */
export function handleError(error, context = {}) {
  console.error(`[${context.operation || 'Unknown'}] Error:`, error);

  if (error instanceof APIError) {
    return error.toJSON();
  }

  // Map common error types
  if (error.code === 'ENOENT') {
    return new NotFoundError('Resource not found').toJSON();
  }

  if (error.code === 'ECONNREFUSED') {
    return new ExternalServiceError(
      context.service || 'External Service',
      'Connection refused',
      error
    ).toJSON();
  }

  if (error.code === 'TIMEOUT') {
    return new ExternalServiceError(
      context.service || 'External Service',
      'Request timeout',
      error
    ).toJSON();
  }

  if (error.response?.status === 401) {
    return new AuthenticationError('Invalid credentials').toJSON();
  }

  if (error.response?.status === 403) {
    return new AuthorizationError('Access denied').toJSON();
  }

  if (error.response?.status === 429) {
    return new RateLimitError('Too many requests', 60).toJSON();
  }

  // Generic error response
  return {
    error: true,
    message: error.message || 'Internal server error',
    statusCode: 500,
    timestamp: new Date().toISOString()
  };
}

/**
 * Async handler wrapper
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Validation helper
 */
export function validateRequest(schema) {
  return (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body);

      if (error) {
        const fields = {};
        error.details.forEach(detail => {
          fields[detail.path.join('.')] = detail.message;
        });

        throw new ValidationError('Validation failed', fields);
      }

      req.validated = value;
      next();
    } catch (err) {
      const response = handleError(err, { operation: 'Validation' });
      res.status(response.statusCode || 400).json(response);
    }
  };
}

export default {
  APIError,
  ValidationError,
  NotFoundError,
  AuthenticationError,
  AuthorizationError,
  RateLimitError,
  ExternalServiceError,
  handleError,
  asyncHandler,
  validateRequest
};
