import { Router } from "express"
import { check } from "express-validator"
import { googleSignIn, login } from "../controllers/auth.js"
import validarCampos from "../middleware/validacionCampos.js"

const router = Router()

router.post('/login', [
    check('email', 'El correo es requerido').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es requerida.').not().isEmpty(),
    validarCampos
],login)

router.post('/google', [
    check('id_token', 'El id_token de google es necesario').not().isEmpty(),
    validarCampos
],googleSignIn)

export default router
