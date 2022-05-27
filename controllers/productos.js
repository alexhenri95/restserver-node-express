import Producto from "../models/Producto.js"

//paginado, total, populate(mongoose)
const productosGet = async(req, res) => {
    const { limite = 5, desde = 0 } = req.query 

    const [ productos, total ] = await Promise.all([
        Producto.find({estado:true}).populate('usuario', 'nombre')
                                    .populate('categoria', 'nombre')
                                    .skip(desde)
                                    .limit(limite),
        Producto.countDocuments({estado:true})
    ])

    return res.status(200).json({
        total,
        productos
    })
}

// populate , objeto del producto
const productoGet = async(req, res) => {
    const { id } = req.params

    const producto = await Producto.findOne({id}).populate('usuario', 'nombre')
                                        .populate('categoria', 'nombre')

    return res.status(200).json({
        producto,
        id
    })
}


const productoPost = async(req, res) => {
    const { nombre, descripcion, precio, categoria } = req.body

    const data = {
        nombre: nombre.toUpperCase(),
        descripcion,
        precio,
        usuario: req.usuario._id,
        categoria
    }

    const producto = new Producto(data)
    await producto.save()

    return res.status(200).json(producto)
}

//cambiar nombre
const productoPut = async(req, res) => {
    const { id } = req.params
    const { estado, usuario, ...data } = req.body

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase()
    }
    
    data.usuario = req.usuario._id

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    return res.status(200).json(producto)
}

//cambiar estado a false
const productoDelete = async(req, res) => {
    const { id } = req.params

    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true})

    return res.json(producto)
}

export {
    productosGet,
    productoGet,
    productoPost,
    productoPut,
    productoDelete
}