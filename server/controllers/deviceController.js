const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const HttpError = require("../error/HttpError");

exports.getAll = async (req, res, next) => {
  try {
    let { brandId, typeId, limit, page } = req.query;
    (page = page || 1), (limit = limit || 9);
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }

    res.status(200).json({ devices });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    let { name, price, brandId, typeId, info } = req.body;
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

    if (info) {
      info = JSON.parse(info);
      info.forEach((i) =>
        DeviceInfo.create({
          title: i.title,
          description: i.description,
          deviceId: device.id,
        })
      );
    }

    res.status(201).json({ device });
  } catch (error) {
    next(error);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    if (!device) {
      throw HttpError(404, "Device not found");
    }
    res.status(200).json({ device });
  } catch (error) {
    next(error);
  }
};
