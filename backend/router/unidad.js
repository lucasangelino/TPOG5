const { Router } = require("express");
const { check } = require("express-validator");
const unidadCtrl = require("../controllers/unidad");

const router = Router();

router.get(
    "/",
    unidadCtrl.getUnidades
);

router.get(
    "/:id",
    unidadCtrl.getUnidadById
);

router.get(
    "/:id/convertibles",
    unidadCtrl.getUnidadesConvertibles
);

router.get(
    "/conversion",
    unidadCtrl.conversion
);

module.exports = router;