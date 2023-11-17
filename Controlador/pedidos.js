import Servicio from '../Servicio/pedidos.js'


class Controlador {
    constructor() {
        this.servicio = new Servicio()
    }

    obtenerPedidos = async (req,res) => {
        const { id } = req.params
        const pedidos = await this.servicio.obtenerPedidos(id)
        res.json(pedidos)
    }

    guardarPedidos = async (req,res) => {
        const { listaProductos, usuario } = req.body
        const pedidoGuardado = await this.servicio.guardarPedidos(listaProductos, usuario)
        res.json(pedidoGuardado)
    }
}

export default Controlador