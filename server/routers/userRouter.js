const express = require("express");

const router = express.Router();

const ctrl = require("../controllers/userController");

router.post("/regestration", ctrl.registration);

router.post("/login", ctrl.login);

router.get("/auth", ctrl.check);

module.exports = router;
