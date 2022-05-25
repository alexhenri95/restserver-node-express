import Usuario from "../models/Usuario.js"
import bcryptjs from "bcryptjs"
import generarJWT from "../helpers/generarJWT.js"
import googleVerify from "../helpers/googleVerify.js"

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

const googleSignIn = async(req, res) => {
    const { id_token } = req.body

    try {
        const {nombre, img, email} = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ email })

        if (!usuario) {
            //tengo que crearlo
            const data = {
                nombre,
                email,
                password: ':P',
                imagen: img,
                rol: "USER_ROLE",
                google: true
            }

            usuario = new Usuario(data)
            await usuario.save()
        }

        //si el usuario en DB 
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'El token no se pudo verificar',
            ok: false
        })
    }
    
}

export {
    login,
    googleSignIn
}