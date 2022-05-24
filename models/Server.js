import express from "express"
import cors from 'cors'
import routerUsuario from "../routes/usuarios.js"
import conexionDB from "../database/config.js"

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuarioPath = '/api/usuarios'
        //Conexion DB
        this.conectarDB()
        //Middleware
        this.middleware()
        //Rutas de mi aplicacion
        this.routes()
    }

    async conectarDB(){
        await conexionDB()
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
        this.app.use(this.usuarioPath, routerUsuario)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`)
        })
    }

}

export default Server