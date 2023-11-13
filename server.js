import express from 'express'
import RouterProductos from './Router/resto.js'
import config from "./config.js"

import CnxMongoDB from './Model/MongoDB.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

app.use('/api/Resto', new RouterProductos().start())

if(config.MODO_PERSISTENCIA == 'MONGODB' ) {
    await CnxMongoDB.conectar()
}

const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))

