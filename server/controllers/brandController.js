const HttpError = require("../error/HttpError");
const { Brand } = require("../models/models");

exports.getAll = async (req, res, next) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).json({ brands });
  } catch (error) {
    next(error);
  }
};

exports.createBrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw HttpError(400, "Missing name in body");
    }
    const brand = await Brand.create({ name });
    res.status(201).json({ brand });
  } catch (error) {
    next(error);
  }
};
