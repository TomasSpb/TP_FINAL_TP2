import { ObjectId } from "mongodb"
import CnxMongoDB from "../MongoDB.js"

class ModelMongoDB {

    obtenerUsuarios = async id => {
        if(!CnxMongoDB.connection) return id? {}:[]
        
        if(id) {
            const Usuario = await CnxMongoDB.db.collection('usuarios').findOne({_id: new ObjectId(id)})
            return Usuario
        }
        else {
            const Usuarios = await CnxMongoDB.db.collection('usuarios').find({}).toArray()
            return Usuarios
        }
        
    }

    guardarUsuario = async Usuario => {
        if(!CnxMongoDB.connection) return {}
        
        await CnxMongoDB.db.collection('usuarios').insertOne(Usuario)

        return Usuario
    }

    actualizarUsuario = async (id, Usuario) => {
        if(!CnxMongoDB.connection) return {}
        
        await CnxMongoDB.db.collection('usuarios').updateOne(
            { _id: new ObjectId(id) },
            { $set: Usuario }
        )

        return Usuario
    }

    borrarUsuario = async id => {
        if(!CnxMongoDB.connection) return {}
        
        await CnxMongoDB.db.collection('usuarios').deleteOne( { _id: new ObjectId(id) } )

        return {}
    }

    login = async (email, pass) => {
        if(!CnxMongoDB.connection) return {}
        
        const Usuario = await CnxMongoDB.db.collection('usuarios').findOne({
            email: { $regex: new RegExp(email, 'i') },
            password: pass})
        if(Usuario) {
            return Usuario
        }
        else {
            throw new Error('no se pudo iniciar sesion')
        }
    }

    verificarRegistro = async email => {
        if(!CnxMongoDB.connection) return {}

        const usuario = await CnxMongoDB.db.collection('usuarios').findOne({ email: { $regex: new RegExp(email, 'i') } })
        if(usuario) {
            throw new Error('El usuario ya existe')
        }
    }
}

export default ModelMongoDB