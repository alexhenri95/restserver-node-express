import mongoose from "mongoose"

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio."],
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio."],
    },
    imagen: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.methods.toJSON = function() {
    const {_id,  __v, password, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

//registrarlo como modelo
const Usuario = mongoose.model('Usuario', usuarioSchema) 

export default Usuario