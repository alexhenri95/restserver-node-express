import path from 'path'
import {fileURLToPath} from 'url'
import { v4 as uuidv4 } from 'uuid'

const subirArchivo = ( files, extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {
    
        const { archivo } = files
        const nombreCortado = archivo.name.split('.')
        const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ]

    
        if (!extensionesValidas.includes(extensionArchivo)) {
            return reject(`La extension ${extensionArchivo} no es permitida. Extensiones permitidas ${extensionesValidas}`)
        }
    
        const nombreTemp = uuidv4() + '.' + extensionArchivo
    
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const uploadPath = path.join( __dirname , '../uploads/', carpeta, nombreTemp)
    
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
            if (err)
                reject(err)
            
            resolve( nombreTemp )

        })
    } )

}

export default subirArchivo