import { Router } from "express"
import { body, param, query } from "express-validator";
import { productoDelete, productoGet, productoPost, productoPut, productosGet } from "../controllers/productos.js";
import { existeNombreProducto, existeProductoPorId } from "../helpers/validatorsDB.js";
import validarCampos from "../middleware/validacionCampos.js";
import validarJWT from "../middleware/validarJWT.js";
import tieneRole from "../middleware/validarRoles.js";

const router = Router()

router.get('/', [
    query('limite', 'El valor del límite deber ser numérico.').isNumeric().optional(),
    query('desde', 'El valor del rango deber ser numérico.').isNumeric().optional()
], productosGet)

router.get('/:id', [
    param('id', 'No es un ID válido.').isMongoId(),
    param('id').custom( existeProductoPorId ),
    validarCampos
], productoGet)

router.post('/', [
    body('nombre', 'El nombre es requerido.').not().isEmpty(),
    body('nombre').custom( existeNombreProducto ),
    validarJWT,
    validarCampos
], productoPost)

router.put('/:id', [
    param('id', 'No es un ID válido.').isMongoId(),
    body('nombre', 'El nombre es requerido').not().isEmpty(),
    param('id').custom( existeProductoPorId ),
    validarJWT,
    validarCampos  
],productoPut)

router.delete('/:id', [
    param('id', 'No es un ID válido.').isMongoId(),
    param('id').custom( existeProductoPorId ),
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    validarCampos
], productoDelete)

export default router;