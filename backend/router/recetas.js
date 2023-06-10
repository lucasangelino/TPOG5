const { check } = require("express-validator");
const { validateField } = require("../middlewares/fieldValidator");
const decodeUserFromToken =  require("../middlewares/auth.js").decodeUserFromToken;

const { Router } = require("express");

const router = Router();

const recetasCtrl = require("../controllers/recetas");

/*---------- Public Routes ----------*/

// obtener recetas
router.get("/", recetasCtrl.getRecetas);

// obtener paso
router.get("/step", 
[
  check("idPaso", "El idPaso es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.getRecetaStepById);


// obtener contenido de paso
router.get("/step/multimedia", 
[
  check("idContenido", "El idContenido es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.getStepMultimediaById);




/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);

// agregar receta
router.post("/", 
[
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("descripcion", "La descripcion es obligatorio").not().isEmpty(),
  check("tipo", "El tipo es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.addReceta);




// actualizar receta


// eliminar receta
router.delete("/", 
[
  check("idReceta", "El idReceta es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.deleteReceta);


// agregar paso a receta
router.post("/step", 
[
  check("idReceta", "El idReceta es obligatorio").not().isEmpty(),
  check("nroPaso", "El nroPaso es obligatorio").not().isEmpty(),
  check("texto", "El texto es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.addRecetaStep);


// actualizar paso de receta
router.put("/step", 
[
  check("idPaso", "El idPaso es obligatorio").not().isEmpty(),
  check("texto", "El texto es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.updateRecetaStep);


// borrar (solo logicamente) paso de receta
router.delete("/step", 
[
  check("idPaso", "El idPaso es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.deleteRecetaStep);




// agregar contenido multimedia a paso de receta
router.post("/step/multimedia", 
[
  check("idPaso", "El idPaso es obligatorio").not().isEmpty(),
  check("tipoContenido", "El tipoContenido es obligatorio").not().isEmpty(),
  check("extension", "El extension es obligatorio").not().isEmpty(),
  check("urlContenido", "El urlContenido es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.addStepMultimedia);

// eliminar (solo logicamente) el contenido multimedia del paso de receta
router.delete("/step/multimedia", 
[
  check("idContenido", "El idContenido es obligatorio").not().isEmpty(),
  validateField,
],
recetasCtrl.deleteStepMultimedia);

module.exports = router;
