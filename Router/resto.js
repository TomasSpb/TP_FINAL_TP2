import express from 'express'
import Controlador from '../Controlador/productos.js'


class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.get('/productos/:id?', this.controlador.obtenerProductos)
        this.router.post('/productos', this.controlador.guardarProducto)
        this.router.put('/productos/:id', this.controlador.actualizarProducto)
        this.router.delete('/productos/:id', this.controlador.borrarProducto)

        this.router.get('/productosP', (req, res) => {
            res.sendFile('guardar.html', { root: 'public' });
        });

        return this.router
    }
}

export default Router

