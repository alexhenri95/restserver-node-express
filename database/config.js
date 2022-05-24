import mongoose from 'mongoose'

const conexionDB = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_CN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado en ${url}`)

    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default conexionDB