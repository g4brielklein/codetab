export class InternalServerError extends Error {
  constructor({ cause }) {
    super("An internal error ocurred", {
      cause,
    });

    this.name = "InternalServerError";
    this.message = "An internal error ocurred";
    this.action = "Contact the support team";
    this.statusCode = 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor({ method, endpoint, allowedMethods }) {
    super(`Method ${method} not allowed on endpoint ${endpoint}`);

    this.name = "MethodNotAllowedError";
    this.action = `Use one of the allowed methods for this endpoint: [${allowedMethods}]`;
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
