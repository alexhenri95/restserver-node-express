import Categoria from "../models/Categoria.js"
import Producto from "../models/Producto.js"
import Rol from "../models/Role.js"
import Usuario from "../models/Usuario.js"

const esRolValido = async(rol = '') => {
    const existeRol = await Rol.findOne({ rol })

    if (!existeRol) {
            throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

const emailExiste = async( email ) => {
    const existeUsuario = await Usuario.findOne( { email } )

    if (existeUsuario) {
        throw new Error(`El correo ${email} ya está registrado en la base de datos.`)
    }
}

const existeUsuarioPorId = async( id  ) => {
    const existeUsuario = await Usuario.findById( id )

    if (!existeUsuario) {
        throw new Error(`El usuario con id ${id} no está registrado en la base de datos.`)
    }
}

const existeNombreCategoria = async( nombre ) => {

    const existeNombreCategoria = await Categoria.findOne( { nombre: nombre.toUpperCase() } )

    if (existeNombreCategoria) {
        throw new Error(`La categoría ${nombre} ya está registrada en la base de datos.`)
    }
}

const existeCategoriaPorId = async( id  ) => {
    const existeCategoria = await Categoria.findById( id )

    if (!existeCategoria) {
        throw new Error(`La categoría con id ${id} no está registrada en la base de datos.`)
    }
}

const existeNombreProducto = async( nombre ) => {

    const existeNombreProducto = await Producto.findOne( { nombre: nombre.toUpperCase() } )

    if (existeNombreProducto) {
        throw new Error(`El producto ${nombre} ya está registrada en la base de datos.`)
    }
}

const existeProductoPorId = async( id  ) => {
    const existeProducto = await Producto.findById( id )

    if (!existeProducto) {
        throw new Error(`El producto con id ${id} no está registrada en la base de datos.`)
    }
}

const coleccionesPermitidas = async(coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes( coleccion )

    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida. Coleccion permitidas: ${colecciones}`)
    }

    return true
}

    
export {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeNombreCategoria,
    existeCategoriaPorId,
    existeNombreProducto,
    existeProductoPorId,
    coleccionesPermitidas
}