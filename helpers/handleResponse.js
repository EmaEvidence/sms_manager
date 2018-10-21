const handleResponse = (res, statusCode, message, data = {}) => {
  return res.json({
    message,
    data
  }).status(statusCode);
}

export default handleResponse;
