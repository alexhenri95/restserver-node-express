import Usuario from "../models/Usuario.js"
import bcryptjs from "bcryptjs"
import generarJWT from "../helpers/generarJWT.js"

const login = async(req, res) => {

    const { email, password } = req.body
    
    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({email})

        if (!usuario) {
            return res.status(400).json({
                msg: 'Las credenciales no coinciden. Verifique su email/constraseña'
            })
        }

        //verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'La cuenta de este usuario se encuentra inactiva.'
            })
        }

        //verificar la contraseña
        const verificarPassword = bcryptjs.compareSync(password, usuario.password)
        if (!verificarPassword) {
            return res.status(400).json({
                msg: 'Las credenciales no coinciden. Verifique su email/constraseña'
            })
        }

        //generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            msg: 'Login OK',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Algo salió mal'})
    }
}

export {
    login
}