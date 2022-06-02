import express from "express"
import cors from 'cors'
import fileUpload from 'express-fileupload'
import routerUsuario from "../routes/usuarios.js"
import routerAuth from "../routes/auth.js"
import conexionDB from "../database/config.js"
import routerCategoria from "../routes/categorias.js"
import routerProducto from "../routes/productos.js"
import routerBuscar from "../routes/buscar.js"
import routerUploads from "../routes/uploads.js"

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
        this.uploadsPath = '/api/uploads'
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

        //FileUpload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.usuarioPath, routerUsuario)
        this.app.use(this.authPath, routerAuth)
        this.app.use(this.categoriaPath, routerCategoria)
        this.app.use(this.productoPath, routerProducto)
        this.app.use(this.buscarPath, routerBuscar)
        this.app.use(this.uploadsPath, routerUploads)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`)
        })
    }

}

export default Server