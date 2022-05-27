import mongoose from "mongoose"

const categoriaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio.'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

categoriaSchema.methods.toJSON = function() {
    const {_id, __v, ...categoria} = this.toObject()
    categoria.uid = _id
    return categoria
}

const Categoria = mongoose.model('Categoria', categoriaSchema)

export default Categoria