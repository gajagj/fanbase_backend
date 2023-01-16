const sendSuccessResponse = (res, data = [], msg) => {
  return res.status(200).json({
    message: msg || "Success",
    result: true,
    data,
  });
};
const sendErrorResponse = (res, stat, msg) => {
  return res.status(stat).json({
    message: msg || "Error",
    result: false,
    data: [],
  });
};

module.exports = { sendSuccessResponse, sendErrorResponse };
