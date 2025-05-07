const uuid = require("uuid");
const path = require("path");
const { Device } = require("../models/models");
const HttpError = require("../error/HttpError");

exports.getAll = async (req, res, next) => {
  try {
    const { brandId, typeId } = req.query;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAll();
    }
    if (brandId && !typeId) {
      devices = await Device.findAll({ where: { brandId } });
    }
    if (!brandId && typeId) {
      devices = await Device.findAll({ where: { typeId } });
    }
    if (brandId && typeId) {
      devices = await Device.findAll({ where: { brandId, typeId } });
    }

    res.status(200).json({ devices });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, price, brandId, typeId, info } = req.body;
    const requiredFields = { name, price, brandId, typeId };
    const { img } = req.files;

    const missingFields = Object.keys(requiredFields)
      .filter((key) => !requiredFields[key])
      .join(", ");

    if (missingFields) {
      throw HttpError(400, `Missing required fields: ${missingFields}`);
    }

    if (!img) {
      throw HttpError(400, "image file is required");
    }

    let fileName = uuid.v4() + ".jpg";
    await img.mv(path.resolve(__dirname, "..", "static", fileName));

    const device = await Device.create({
      name,
      price,
      brandId,
      typeId,
      info,
      img: fileName,
    });
    res.status(201).json({ device });
  } catch (error) {
    next(error);
  }
};

exports.findById = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
