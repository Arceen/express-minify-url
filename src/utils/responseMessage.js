function standardErrorMessage(res, code, msg) {
  res.status(code).json({ status: code, message: msg });
}

function standardSuccessMessage(res, code, msg, data) {
  res.status(code).json({ status: code, message: msg, data: data });
}

module.exports = {
  standardErrorMessage,
  standardSuccessMessage,
};
