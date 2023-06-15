const { Router } = require("express");
const { check } = require("express-validator");
const unidadCtrl = require("../controllers/unidad");

const router = Router();

router.get(
    "/",
    unidadCtrl.getUnidades
);

router.get(
    "/conversion",
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