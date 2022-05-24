import jwt from "jsonwebtoken"

const generarJWT = ( uid ) => {
    return new Promise((res, rej) => {

        const payload = { uid }

        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: "30d"
        }, (err, token) => {
            if (err) {
                console.log(err)
                rej('No se pudo generar el token')
            }else{
                res(token)
            }
        } )
    })
}

export default generarJWT