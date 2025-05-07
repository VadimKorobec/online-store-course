exports.getAll = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, price, brandId, typeId, info } = req.body;
    const {img} = req.files
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
