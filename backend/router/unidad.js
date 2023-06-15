const { Router } = require("express");
const { check, param, query } = require("express-validator");
const unidadCtrl = require("../controllers/unidad");

const { validateField } = require("../middlewares/fieldValidator.js");

const router = Router();

router.get(
    "/",
    unidadCtrl.getUnidades
);

router.get(
    "/conversion",
    [
        query("cantidadOrigen").notEmpty().isFloat({min: 1}).withMessage("La cantidad origen debe ser un numero mayor o igual a 1."),
        validateField,
    ],
    unidadCtrl.convertirUnidad
);

router.get(
    "/:id",
    unidadCtrl.getUnidadById
);

router.get(
    "/:id/convertibles",
    unidadCtrl.getUnidadesConvertibles
);

module.exports = router;