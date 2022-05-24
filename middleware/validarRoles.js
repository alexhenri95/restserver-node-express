// const esAdminRole = (req, res, next) => {
//     if (!req.usuario) {
//         return res.status(500).json({
//             msg: 'Se quiere verificar el rol sin validar el token.'
//         })
//     }

//     const { rol, nombre} = req.usuario

//     if (rol !== 'AMDIN_ROLE') {
//         return res.status(401).json({
//             msg: `${nombre} no es ADMINISTRADOR - No puede hacer esto`
//         })
//     }

//     next()
// }

const tieneRole = ( ...roles ) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token.'
            })
        }

        if( !roles.includes(req.usuario.rol) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }
        next()
    }
}

export default tieneRole