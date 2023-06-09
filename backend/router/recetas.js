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

module.exports = router;
