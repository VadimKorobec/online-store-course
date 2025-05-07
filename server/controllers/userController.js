const HttpError = require("../error/HttpError");

exports.registration = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.check = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      throw HttpError(400, "Missing 'id' in query");
    }
    res.json({id})
  } catch (error) {
    next(error);
  }
};
