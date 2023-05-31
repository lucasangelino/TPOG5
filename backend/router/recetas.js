const { Router } = require("express");
const { validateJWT } = require("../middlewares/tokenValidator");

const router = Router();

const recetasCtrl = require("../controllers/recetas");

/*---------- Public Routes ----------*/
router.get("/", recetasCtrl.getRecetas);

/*---------- Protected Routes ----------*/
router.put("/", validateJWT, recetasCtrl.addReceta);

module.exports = router;
