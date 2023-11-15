import { MongoClient } from "mongodb"
import config from "../config.js"

class CnxMongoDB {
    static client = null
    static connection = false
    static db = null

    static conectar = async () => {

        try {
            CnxMongoDB.client = new MongoClient(config.STRCNX) //config.nombreDeCadenaConexion
            await CnxMongoDB.client.connect() 

            CnxMongoDB.db = CnxMongoDB.client.db(config.BASE) //config.nombreBase
            CnxMongoDB.connection = true
            console.log("base de datos conectada")
        }
        catch (error) {
            console.log(`Error en la conexión de base de datos: ${error.message}`)
        }
    }

    static desconectar = () => {

    }
}

export default CnxMongoDB