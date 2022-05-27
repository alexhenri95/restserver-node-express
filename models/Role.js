import mongoose from "mongoose"

const rolSchema = mongoose.Schema({
    rol: {
        type: String,
        required: [ true, 'El rol es obligatorio.']
    }
})

const Rol = mongoose.model('Role', rolSchema)

export default Rol