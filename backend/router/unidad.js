const { Router } = require("express");
const { check } = require("express-validator");
const unidadCtrl = require("../controllers/unidad");

const router = Router();

router.get(
    "/",
    unidadCtrl.getUnidades
);

module.exports = router;