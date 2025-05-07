const HttpError = require("../error/HttpError");
const { Type } = require("../models/models");

exports.getAll = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.createType = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw HttpError(400, "Missing name in body");
    }
    const type = await Type.create({ name });
    res.status(201).json({ type });
  } catch (error) {
    next(error);
  }
};
