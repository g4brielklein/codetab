function status(request, response) {
  response.status(200).json({ apiResponse: "[v1] Endpoint created!" });
}

export default status;
