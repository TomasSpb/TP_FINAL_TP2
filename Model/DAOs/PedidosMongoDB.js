import { ObjectId } from "mongodb"
import CnxMongoDB from "../MongoDB.js"

class ModelMongoDB {

    obtenerPedidos = async id => {
        if(!CnxMongoDB.connection) return id? {}:[]
        
        if(id) {
            const pedido = await CnxMongoDB.db.collection('pedidos').findOne({_id: new ObjectId(id)})
            return pedido
        }
        else {
            const pedido = await CnxMongoDB.db.collection('pedidos').find({}).toArray()
            return pedido
        }
        
    }

    guardarPedido = async pedido => {
        if(!CnxMongoDB.connection) return {}
        
        await CnxMongoDB.db.collection('pedidos').insertOne(pedido)
        return pedido
    }
}

export default ModelMongoDB