import { Router } from "express"
import { check } from "express-validator"
import { login } from "../controllers/auth.js"
import validarCampos from "../middleware/validacionCampos.js"

const router = Router()

router.post('/login', [
    check('email', 'El correo es requerido').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es requerida.').not().isEmpty(),
    validarCampos
],login)

export default router
