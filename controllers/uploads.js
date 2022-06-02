import fs from 'fs'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import {fileURLToPath} from 'url'
import subirArchivo from "../helpers/subirArchivo.js";
import Usuario from "../models/Usuario.js"
import Producto from "../models/Producto.js";


const cargarArchivo = async(req, res) => {


	// const extensionesImagenes = ['png','jpg','jpeg','gif']
	// const extensionesDocs = [ 'txt', 'md', 'pdf' ]
	
	try {
		// const nombreArchivo = await subirArchivo(req.files, extensionesDocs, 'txt')
		const nombreArchivo = await subirArchivo(req.files, undefined, 'img')

		res.json({
			nombreArchivo
		})

	} catch (msg) {
		res.status(400).json({
			msg
		})
	}

	
}

const actualizarImagenCloudinary = async(req, res) => {
	
	const { id, coleccion } = req.params

	let modelo

	switch (coleccion) {
		case 'usuarios':
			modelo = await Usuario.findById(id)
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe usuario con el id ${id}`
				})
			}
			break;
		case 'productos':
			modelo = await Producto.findById(id)
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe producto con el id ${id}`
				})
			}
			break;
	
		default:
			return res.status(500).json({ msg: 'No se ha validado esa colección.' })
	}

	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	if (modelo.imagen) {
		const nombreArr = modelo.imagen.split('/')
		const nombre = nombreArr[nombreArr.length - 1]
		const [ public_id] = nombre.split('.')

		await cloudinary.uploader.destroy(`RestServer NodeJs/${coleccion}/${public_id}`)
	}

	const { tempFilePath } = req.files.archivo
	const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: `RestServer NodeJs/${coleccion}` } );
	
	modelo.imagen = secure_url
	await modelo.save()

	res.json(modelo)
}


const actualizarImagen = async(req, res) => {
	
	const { id, coleccion } = req.params

	let modelo

	switch (coleccion) {
		case 'usuarios':
			modelo = await Usuario.findById(id)
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe usuario con el id ${id}`
				})
			}
			break;
		case 'productos':
			modelo = await Producto.findById(id)
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe producto con el id ${id}`
				})
			}
			break;
	
		default:
			return res.status(500).json({ msg: 'No se ha validado esa colección.' })
	}

	//limpiar imagen previa
	if (modelo.imagen) {
		//borrar imagen del sevidor
		const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
		const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen)

		if (fs.existsSync(pathImagen) ) {
			fs.unlinkSync(pathImagen)
		}

	}

	const nombreArchivo = await subirArchivo(req.files, undefined, coleccion)
	modelo.imagen = nombreArchivo
	await modelo.save()

	res.json(modelo)
}


const mostrarImagen = async(req, res) => {

	const {id, coleccion} = req.params

	let modelo

	switch (coleccion) {
		case 'usuarios':
			modelo = await Usuario.findById(id)
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe usuario con el id ${id}`
				})
			}
			break;
		case 'productos':
			modelo = await Producto.findById(id)
			if (!modelo) {
				return res.status(400).json({
					msg: `No existe producto con el id ${id}`
				})
			}
			break;
	
		default:
			return res.status(500).json({ msg: 'No se ha validado esa colección.' })
	}
	

	const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

	//limpiar imagen previa
	if (modelo.imagen) {
		//borrar imagen del sevidor
		const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen)

		if (fs.existsSync(pathImagen) ) {
			return res.sendFile( pathImagen )
		}
	}

	const pathImagen = path.join( __dirname, '../assets/no-image.jpg')
	res.sendFile( pathImagen )

}

export {
	cargarArchivo,
	mostrarImagen,
	actualizarImagenCloudinary
}