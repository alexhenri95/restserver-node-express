import { Router } from "express"
import { body, check, param, query } from "express-validator"
import { categoriaDelete, categoriaGet, categoriaPost, categoriaPut, categoriasGet } from "../controllers/categorias.js"
import { existeCategoriaPorId, existeNombreCategoria } from "../helpers/validatorsDB.js"


import validarCampos from "../middleware/validacionCampos.js"
import validarJWT from "../middleware/validarJWT.js"
import tieneRole from "../middleware/validarRoles.js"

const router = Router()

//Obtener todas las categorias - publico
router.get('/', [
    query('limite', 'El valor del límite deber ser numérico.').isNumeric().optional(),
    query('desde', 'El valor del rango deber ser numérico.').isNumeric().optional()
],categoriasGet)

//Obtener una categoria por id - publico
router.get('/:id', [
    param('id', 'No es un ID válido.').isMongoId(),
    param('id').custom( existeCategoriaPorId ),
    validarCampos
],categoriaGet)

//crear categoria - privada - cualquier persona con token valido
router.post('/', [
    body('nombre', 'El nombre es requerido').not().isEmpty(),
    body('nombre').custom( existeNombreCategoria ),
    validarJWT,
    validarCampos
] ,categoriaPost)

//Actualizar categoria por id - privado - cualquiera con token valido
router.put('/:id', [
    param('id', 'No es un ID válido.').isMongoId(),
    body('nombre', 'El nombre es requerido').not().isEmpty(),
    param('id').custom( existeCategoriaPorId ),
    validarJWT,
    validarCampos
],categoriaPut)

//eliminar categoria - privado - solo admin - activo o inactivo
router.delete('/:id', [
    param('id', 'No es un ID válido.').isMongoId(),
    param('id').custom( existeCategoriaPorId ),
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    validarCampos
],categoriaDelete)

export default router;