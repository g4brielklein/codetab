function status(request, response) {
  response.status(200).json({ apiResponse: "Endpoint created!" });
}

export default status;
