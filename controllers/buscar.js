import mongoose from "mongoose"
import Categoria from "../models/Categoria.js"
import Producto from "../models/Producto.js"
import Usuario from "../models/Usuario.js"

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'productos-categoria'
]

const buscarUsuarios = async(termino, res) => {
    const esMongoId = mongoose.isValidObjectId(termino) //true

    if (esMongoId) {
        const usuario = await Usuario.findById(termino, {estado:true})
        return res.status(200).json({
            results: usuario ? [ usuario ] : []
        })
    }

    const regExp = new RegExp( termino, 'i' )
    const usuarios = await Usuario.find({
        $or: [ {nombre: regExp}, {email: regExp} ],
        $and: [ {estado: true} ]
    })
    return res.status(200).json({
        results: usuarios ? [ usuarios ] : []
    })
    
}

const buscarCategorias = async(termino, res) => {
    const esMongoId = mongoose.isValidObjectId(termino) //true

    if (esMongoId) {
        const categoria = await Categoria.findById(termino, {estado: true})
        return res.status(200).json({
            results: categoria ? [ categoria ] : []
        })
    }

    const regExp = new RegExp( termino, 'i' )
    const categorias = await Categoria.find({
        $or: [ {nombre: regExp} ],
        $and: [ {estado: true} ]
    })
    return res.status(200).json({
        results: categorias ? [ categorias ] : []
    })
    
}

const buscarProductos = async(termino, res) => {
    const esMongoId = mongoose.isValidObjectId(termino) //true

    if (esMongoId) {
        const producto = await Producto.findById(termino, {estado: true}).populate('categoria', 'nombre')
        return res.status(200).json({
            results: producto ? [ producto ] : []
        })
    }

    const regExp = new RegExp( termino, 'i' )
    const productos = await Producto.find({
        $or: [ {nombre: regExp} ],
        $and: [ {estado: true} ]
    }).populate('categoria', 'nombre')

    return res.status(200).json({
        results: productos ? [ productos ] : []
    })
    
}

const buscarProductosPorCategoria = async(termino, res) => {
    const esMongoId = mongoose.isValidObjectId(termino) //true

    if (esMongoId) {
        const productos = await Producto.find({
            categoria: termino,
            estado: true
        })
        .select('nombre descripcion precio disponible')
        .populate('categoria', 'nombre')

        return res.status(200).json({
            results: productos ? [ productos ] : []
        })
    }

    const regExp = new RegExp( termino, 'i' )

    const categorias = await Categoria.find({nombre: regExp, estado: true})

    if (!categorias.length) {
        return res.status(400).json({
            msg: `No hay resultado con el término ${termino}`
        })
    }

    const productos = await Producto.find({
        $or: [ ...categorias.map( c => { return {categoria: c._id} } ) ],
        $and: [ {estado: true} ]
    })
    .select('nombre descripcion precio disponible')
    .populate('categoria', 'nombre')

    return res.status(200).json({
        results: productos ? [ productos ] : []
    })
}

const buscar = (req, res) => {
    const { coleccion, termino } = req.params

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'categorias':
            buscarCategorias(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;
        case 'productos-categoria':
            buscarProductosPorCategoria(termino, res)
            break;
        default:
            res.status(500).json({
                msg: 'Aun no hay controles de búsqueda para esta colección'
            })
            break;
    }

}

export {
    buscar
}