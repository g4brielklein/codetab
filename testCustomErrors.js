class ValidationError extends Error {
  constructor(message, options = {}) {
    const { statusCode = 400 } = options;

    super(message);
    this.status_code = statusCode;
  }
}

function saveUser(input) {
  const user = {};

  if (!input) {
    throw new ReferenceError("Input argument is required");
  }

  if (!input.name) {
    throw new ValidationError("Name is required");
  }

  user.save(input);
}

function processUser() {
  try {
    saveUser({
      name: "John",
      lastname: "Doe",
    });
  } catch (err) {
    if (err instanceof ReferenceError) {
      return console.log(err);
    }

    if (err instanceof ValidationError) {
      return console.log(err);
    }

    console.log(err);
  }
}

processUser();
