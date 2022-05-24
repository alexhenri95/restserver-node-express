import Rol from "../models/Role.js"
import Usuario from "../models/Usuario.js"

const esRolValido = async(rol = '') => {
    const existeRol = await Rol.findOne({ rol })

    if (!existeRol) {
            throw new Error(`El ${rol} no está registrado en la base de datos`)
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
        throw new Error(`El usuario con ${id} no está registrado en la base de datos.`)
    }
}

    
export {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}