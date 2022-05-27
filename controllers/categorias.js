import Categoria from "../models/Categoria.js"

//paginado, total, populate(mongoose)
const categoriasGet = async(req, res) => {
    const { limite = 5, desde = 0} = req.query

    const [ categorias, total ] = await Promise.all([
        Categoria.find({estado: true}).populate('usuario', 'nombre').skip(desde).limit(limite),
        Categoria.countDocuments({estado:true})
    ])

    return res.status(200).json({
        total, 
        categorias
    })
}

//populate , objeto de la categoria
const categoriaGet = async(req, res) => {
    const { id } = req.params

    const categoria = await Categoria.findOne({id}).populate('usuario', 'nombre')

    return res.json(categoria)
}

const categoriaPost = async(req, res) => {
    const { nombre } = req.body

    const data = {
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)
    await categoria.save()

    return res.status(200).json(categoria)
}

//cambiar nombre
const categoriaPut = async(req, res) => {
    const { id } = req.params
    const { estado, ...data } = req.body

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true })

    return res.status(200).json(categoria)
}

//cambiar estado a false
const categoriaDelete = async(req, res) => {
    const { id } = req.params

    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true})

    return res.status(200).json(categoria)
}

export {
    categoriasGet,
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}