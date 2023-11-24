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

        try {
            const pedidoGuardado = await this.servicio.guardarPedidos(listaProductos, usuario)
            res.status(200).json(pedidoGuardado)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default Controlador