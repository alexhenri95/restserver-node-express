import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario.js"

const validarJWT = async(req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición.'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)
        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en la base de datos.'
            })
        }

        //verificar si usuario tiene estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }

        req.usuario = usuario

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no válido'
        })    
    }
}

export default validarJWT