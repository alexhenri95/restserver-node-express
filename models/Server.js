import express from "express"
import cors from 'cors'
import router from "../routes/usuarios.js"

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuarioPath = '/api/usuarios'
        //Middleware
        this.middleware()
        //Rutas de mi aplicacion
        this.routes()
    }

    middleware() {
        //cors
        this.app.use( cors() )

        //lectura y parseo del body
        this.app.use( express.json() )

        //Directorio publico
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use(this.usuarioPath, router)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`)
        })
    }

}

export default Server