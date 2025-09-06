import { InternalServerError, MethodNotAllowedError } from "infra/errors";

function onNoMatchHandler(request, response) {
  const { method, url: endpoint } = request;

  const error = new MethodNotAllowedError({
    method,
    endpoint,
  });

  response.status(error.statusCode).json(error);
}

function onErrorHandler(err, request, response) {
  const error = new InternalServerError({
    cause: err,
  });

  response.status(error.statusCode).json(error);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
