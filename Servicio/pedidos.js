import ModelMongoDB from '../Model/DAOs/PedidosMongoDB.js'
import Nodemailer from '../Model/mailer.js'

class Servicio {
    constructor() {
        this.model = new ModelMongoDB()
        this.modelMailer = new Nodemailer()
    }

    obtenerPedidos = async id => {
        const pedidos = await this.model.obtenerPedidos(id)
        return pedidos
    }   

    guardarPedidos = async (productos, usuario) => {
        try {
            const precioTotal = this.calcularPrecioTotal(productos);
        
            const nuevoPedido = {
                idUsuario: usuario._id,
                nombreUsuario: usuario.username,
                direccion: usuario.direccion,
                productos: productos.map(producto => producto.id),
                precioTotal: precioTotal
            }
        
            const pedidoGuardado = await this.model.guardarPedido(nuevoPedido)
            this.modelMailer.sendMail(usuario.email)
            return pedidoGuardado;
            
          } catch (error) {
            throw new Error('Error al guardar el pedido: ' + error.message);
          }
    }

    calcularPrecioTotal = productos => {
        let precioTotal = 0;
        
        productos.forEach(producto => {
            precioTotal += (producto.precio * producto.cantidad);
        });
        return precioTotal;
    }
      
}

export default Servicio