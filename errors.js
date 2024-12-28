class ValidationError extends Error {
  constructor(message, props) {
    super(message);

    this.status_code = props.statusCode;
  }
}

function saveUser(user) {
  if (!user) {
    throw new ValidationError("Param user is missing", {
      statusCode: 500
    })
  }
}

try {
  saveUser()
} catch(err) {
  console.error(err)
}
