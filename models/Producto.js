import mongoose from "mongoose"

const productoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio.'],
        unique: true
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number,
        default: 0,
    },
    disponible: {
        type: Boolean,
        default: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

productoSchema.methods.toJSON = function() {
    const {_id, __v, ...producto} = this.toObject()
    producto.uid = _id
    return producto
}

const Producto = mongoose.model('Producto', productoSchema)

export default Producto