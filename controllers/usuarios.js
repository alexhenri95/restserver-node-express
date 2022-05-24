import bcryptjs from "bcryptjs"
import Usuario from "../models/Usuario.js"

const usuariosGet = async(req, res) => {
    const { limite = 5, desde = 0 } = req.query

    const [usuarios, total] = await Promise.all([
        Usuario.find({estado: true}).skip(desde).limit(limite), 
        Usuario.countDocuments({estado: true})
    ])
    
    res.status(201).json({
        total,
        usuarios
    })
}

const usuariosPost =  async(req, res) => {

    const { nombre, email, password, rol } = req.body
    const usuario = new Usuario( { nombre, email, password, rol } ) 

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync( password, salt)

    //guardar
    await usuario.save()

    res.json(usuario)
}

const usuariosPut = async(req, res) => {
    const { id } = req.params
    const { _id, password, google, email, ...info } = req.body

    //validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync()
        info.password = bcryptjs.hashSync( password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, info, {new: true})

    res.json(usuario)
}

const usuariosDelete = async(req, res) => {
    const { id } = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true})
    const usuarioAutenticado = req.usuario

    res.json({ 
        msg: '(DELETE) Eliminando registro desde controlador',
        usuario,
        usuarioAutenticado
    })
}
export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}