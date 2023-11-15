import { ObjectId } from "mongodb"
import CnxMongoDB from "../MongoDB.js"

class ModelMongoDB {

    obtenerProductos = async id => {
        if(!CnxMongoDB.connection) return id? {}:[]
        
        if(id) {
            const producto = await CnxMongoDB.db.collection('productos').findOne({_id: new ObjectId(id)})
            return producto
        }
        else {
            const productos = await CnxMongoDB.db.collection('productos').find({}).toArray()
            return productos
        }
        
    }

    guardarProducto = async producto => {
        if(!CnxMongoDB.connection) return {}
        
        await CnxMongoDB.db.collection('productos').insertOne(producto)

        return producto
    }

    actualizarProducto = async (id, producto) => {
        if(!CnxMongoDB.connection) return {}
        
        await CnxMongoDB.db.collection('productos').updateOne(
            { _id: new ObjectId(id) },
            { $set: producto }
        )

        return producto
    }

    borrarProducto = async id => {
        if(!CnxMongoDB.connection) return {}
        
        await CnxMongoDB.db.collection('productos').deleteOne( { _id: new ObjectId(id) } )

        return {}
    }
}

export default ModelMongoDB