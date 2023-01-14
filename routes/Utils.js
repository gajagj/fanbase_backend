const sendSuccessResponse = (res, data = [], msg) => {
  return res.status(200).json({
    message: msg || "Success",
    result: true,
    data,
  });
};
const sendErrorResponse = (res, data = [], msg) => {
  return res.status(400).json({
    message: msg || "Error",
    result: false,
    data,
  });
};

module.exports = { sendSuccessResponse, sendErrorResponse };
