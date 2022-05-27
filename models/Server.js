import express from "express"
import cors from 'cors'
import routerUsuario from "../routes/usuarios.js"
import routerAuth from "../routes/auth.js"
import conexionDB from "../database/config.js"
import routerCategoria from "../routes/categorias.js"
import routerProducto from "../routes/productos.js"
import routerBuscar from "../routes/buscar.js"

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        //rutas
        this.usuarioPath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.categoriaPath = '/api/categorias'
        this.productoPath = '/api/productos'
        this.buscarPath = '/api/buscar'
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
        this.app.use(this.authPath, routerAuth)
        this.app.use(this.categoriaPath, routerCategoria)
        this.app.use(this.productoPath, routerProducto)
        this.app.use(this.buscarPath, routerBuscar)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`)
        })
    }

}

export default Server