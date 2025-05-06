const express = require("express");

const router = express.Router();

const ctrl = require("../controllers/deviceController");

router.get("/", ctrl.getAll);

router.post("/", ctrl.createDevice);

router.get("/:id", ctrl.findById);

module.exports = router;
