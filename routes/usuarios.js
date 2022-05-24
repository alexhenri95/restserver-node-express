import { Router } from "express"
import { check } from "express-validator"

import { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete  } from "../controllers/usuarios.js"
        
import { esRolValido, emailExiste, existeUsuarioPorId } from "../helpers/validatorsDB.js"

import validarCampos from "../middleware/validacionCampos.js"
import validarJWT from "../middleware/validarJWT.js"
import tieneRole from "../middleware/validarRoles.js"

const router = Router()

router.get('/', [
        check('limite', 'El valor del límite deber ser numérico.').isNumeric().optional(),
        check('desde', 'El valor del rango deber ser numérico.').isNumeric().optional()
],usuariosGet)

router.post('/', [ 
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El correo es requerido').not().isEmpty(),
        check('email', 'El correo no es válido').isEmail(),
        check('password', 'La contraseña es requerida con mas de 6 carateres.').isLength({min:6}),
        // check('rol', 'El rol no es válido.').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('email').custom( emailExiste ),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPost)

router.put('/:id', [
        check('id', 'No es un ID válido.').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPut)

router.delete('/:id', [
        validarJWT,
        // esAdminRole,
        tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
        check('id', 'No es un ID válido.').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuariosDelete)


export default router;