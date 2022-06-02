import express from "express"
import { check } from "express-validator"
import { actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from "../controllers/uploads.js"
import { coleccionesPermitidas } from "../helpers/validatorsDB.js"
import validarCampos from "../middleware/validacionCampos.js"
import validarArchivoSubir from "../middleware/validarArchivo.js"

const router = express.Router()

router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'No es un ID válido.').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ] ) ),
    validarCampos  
], actualizarImagenCloudinary)

router.get('/:coleccion/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ] ) ),
    validarCampos  
], mostrarImagen)

export default router