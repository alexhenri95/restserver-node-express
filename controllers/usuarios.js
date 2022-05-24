
const usuariosGet = (req, res) => {
    
    res.status(201).json({ 
        msg: '(GET) Obteniendo datos desde el controlador',
    })
}

const usuariosPost =  (req, res) => {
    const { nombre, edad } = req.body

    res.json({ 
        msg: '(POST) Guardando info',
        nombre,
        edad
    })
}

const usuariosPut = (req, res) => {
    const { q, nombre, edad, limit = 5 } = req.query
    const { id } = req.params
    res.json({ 
        msg: '(PUT) Actualizando un registro desde el controlador',
        id,
        q,
        nombre,
        edad,
        limit
    })
}

const usuariosDelete = (req, res) => {
    res.json({ 
        msg: '(DELETE) Eliminando registro desde controlador'
    })
}

const usuariosPatch = (req, res) => {
    res.json({ 
        msg: '(PATCH) Eliminando registro'
    })
}

export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}