export class InternalServerError extends Error {
  constructor(props) {
    super(props.message || "Internal Server Error", {
      cause: props.cause,
    });

    this.name = "InternalServerError";
    this.action =
      "Try again in a few seconds and then contact the suport team if needed";
    this.statusCode = props.statusCode || 500;
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
