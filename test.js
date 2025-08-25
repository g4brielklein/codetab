class ValidationError extends Error {
  constructor(message, options = {}) {
    const { statusCode = 400 } = options;

    super(message);
    this.status_code = statusCode;
  }
}

function saveUser(input) {
  if (!input) {
    throw new ReferenceError("Input argument is required");
  }

  if (!input.name) {
    throw new ValidationError("Name is required");
  }

  user.save(input);
}

try {
  saveUser({
    lastname: "Doe",
  });
} catch (err) {
  if (err instanceof ReferenceError) {
    console.log(err);
    return;
  }

  if (err instanceof ValidationError) {
    console.log(err);
    return;
  }

  console.log(err);
}
