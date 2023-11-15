import express from 'express'
import ControladorP from '../Controlador/productos.js'
import ControladorU from '../Controlador/usuarios.js'

class Router {
    constructor() {
        this.router = express.Router()
        this.controladorP = new ControladorP()
        this.controladorU = new ControladorU()
    }

    start() {
        this.router.get('/productos/:id?', this.controladorP.obtenerProductos)
        this.router.post('/productos', this.controladorP.guardarProducto)
        this.router.put('/productos/:id', this.controladorP.actualizarProducto)
        this.router.delete('/productos/:id', this.controladorP.borrarProducto)

        this.router.get('/productosP', (req, res) => {
            res.sendFile('guardar.html', { root: 'public' });
        });

        this.router.get('/register', (req, res) => {
            res.sendFile('registrarUsuario.html', { root: 'public' });
        });

        return this.router
    }
}

export default Router

