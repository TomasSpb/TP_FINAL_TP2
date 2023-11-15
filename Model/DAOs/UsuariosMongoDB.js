import { ObjectId } from "mongodb"
import CnxMongoDB from "../MongoDB.js"

class ModelMongoDB {

    obtenerUsuarios = async id => {
        if(!CnxMongoDB.connection) return id? {}:[]
        
        if(id) {
            const Usuario = await CnxMongoDB.db.collection('Usuarios').findOne({_id: new ObjectId(id)})
            return Usuario
        }
        else {
            const Usuarios = await CnxMongoDB.db.collection('Usuarios').find({}).toArray()
            return Usuarios
        }
        
    }

    guardarUsuario = async Usuario => {
        if(!CnxMongoDB.connection) return {}
        
        await CnxMongoDB.db.collection('Usuarios').insertOne(Usuario)

        return Usuario
    }

    actualizarUsuario = async (id, Usuario) => {
        if(!CnxMongoDB.connection) return {}
        
        await CnxMongoDB.db.collection('Usuarios').updateOne(
            { _id: new ObjectId(id) },
            { $set: Usuario }
        )

        return Usuario
    }

    borrarUsuario = async id => {
        if(!CnxMongoDB.connection) return {}
        
        await CnxMongoDB.db.collection('Usuarios').deleteOne( { _id: new ObjectId(id) } )

        return {}
    }
}

export default ModelMongoDB