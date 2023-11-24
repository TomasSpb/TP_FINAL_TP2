import express from 'express'
import ControladorP from '../Controlador/productos.js'
import ControladorU from '../Controlador/usuarios.js'
import ControladorPe from '../Controlador/pedidos.js'

class Router {
    constructor() {
        this.router = express.Router()
        this.controladorP = new ControladorP()
        this.controladorU = new ControladorU()
        this.controladorPe = new ControladorPe()
    }

    start() {
        this.router.get('/productos/:id?', this.controladorP.obtenerProductos)
        this.router.put('/productos/:id', this.controladorP.actualizarProducto)
        this.router.delete('/productos/:id', this.controladorP.borrarProducto)

        this.router.get('/usuarios/:id?', this.controladorU.obtenerUsuarios)
        this.router.put('/usuarios/:id', this.controladorU.actualizarUsuario)
        this.router.delete('/usuarios/:id', this.controladorU.borrarUsuario)
        
        this.router.post('/login', this.controladorU.login)
        this.router.get('/login', (req, res) => {
            res.sendFile('login.html', { root: 'public' });
        });
        
        this.router.post('/productos', this.controladorP.guardarProducto)
        this.router.get('/guardarProductos', (req, res) => {
            res.sendFile('guardar.html', { root: 'public' });
        });

        this.router.post('/usuarios', this.controladorU.guardarUsuario)
        this.router.get('/register', (req, res) => {
            res.sendFile('registrarUsuario.html', { root: 'public' });
        });

        this.router.post('/validarRegistro', this.controladorU.validarRegistro)
        
        this.router.post('/guardarPedido', this.controladorPe.guardarPedidos)
        this.router.get('/verPedidos/:id?', this.controladorPe.obtenerPedidos)

        return this.router
    }
}

export default Router
