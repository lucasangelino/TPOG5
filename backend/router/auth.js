const { Router } = require("express");
const { check } = require("express-validator");
const { login, renew, signup, completeSignUp  } = require("../controllers/auth");
const { validateField } = require("../middlewares/fieldValidator");

const decodeUserFromToken =
  require("../middlewares/auth.js").decodeUserFromToken;

const router = Router();

router.post(
    "/signup", [
        check("nickname", "El nickname es obligatorio").not().isEmpty(),
        check("mail", "El mail es obligatorio").not().isEmpty(),
        check("tipo_usuario", "tipo_usuario es obligatorio").not().isEmpty(),
        check("password", "password es obligatorio").not().isEmpty(),
        check("repeatPassword", "El repetir contraseña es obligatorio").not().isEmpty(),
        validateField,
    ],
    signup
);

router.get(
  "/complete",
  completeSignUp
);

router.post(
    "/login", [
        check("mail", "El mail es obligatorio").isEmail(),
        check("password", "La password es obligatoria").not().isEmpty(),
        validateField,
    ],
    login
);

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.get(
  "/renew",
  renew
);

router.post(
    "/sendOTP", [
        check("mail", "El mail es obligatorio").isEmail(),
        validateField,
    ],
    login
);

//validar con lucas
router.post(
    "/validateOTP", [
        check("recoverCode", "El codigo es obligatorio").isEmail(),
        validateField,
    ],
    login
);

router.post(
    "/resetPassword", [
        check("password", "La password es obligatoria").not().isEmpty(),
        validateField,
    ],
    login
);

module.exports = router;