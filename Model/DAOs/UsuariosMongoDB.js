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

    login = async user => {
        if(!CnxMongoDB.connection) return id? {}:[]
        
        if(user) {
            const Usuario = await CnxMongoDB.db.collection('usuarios').findOne({user})
            console.log(Usuario)
            return Usuario
        }
        else {
            console.log("no se pudo iniciar sesion")
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
}

export default ModelMongoDB