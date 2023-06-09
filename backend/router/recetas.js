const { check } = require("express-validator");
const { validateField } = require("../middlewares/fieldValidator");
const decodeUserFromToken =  require("../middlewares/auth.js").decodeUserFromToken;

const { Router } = require("express");

const router = Router();

const recetasCtrl = require("../controllers/recetas");

/*---------- Public Routes ----------*/
router.get("/", recetasCtrl.getRecetas);




/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.post("/", 
[
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("descripcion", "La descripcion es obligatorio").not().isEmpty(),
  check("tipo", "El tipo es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.addReceta);

router.get("/step", 
[
  check("idPaso", "El idPaso es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.getRecetaStepById);

router.post("/step", 
[
  check("idReceta", "El idReceta es obligatorio").not().isEmpty(),
  check("nroPaso", "El nroPaso es obligatorio").not().isEmpty(),
  check("texto", "El texto es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.addRecetaStep);

router.put("/step", 
[
  check("idPaso", "El idPaso es obligatorio").not().isEmpty(),
  check("texto", "El texto es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.updateRecetaStep);

router.delete("/step", 
[
  check("idPaso", "El idPaso es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.deleteRecetaStep);

router.post("/step/multimedia", 
[
  check("idPaso", "El idPaso es obligatorio").not().isEmpty(),
  check("tipoContenido", "El tipoContenido es obligatorio").not().isEmpty(),
  check("extension", "El extension es obligatorio").not().isEmpty(),
  check("urlContenido", "El urlContenido es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.addStepMultimedia);

router.delete("/step/multimedia", 
[
  check("idContenido", "El idContenido es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.deleteStepMultimedia);

module.exports = router;
