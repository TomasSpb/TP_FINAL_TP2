import { readFile } from 'fs/promises'
import path from 'path'
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

            const rutaArchivo = path.join(
                'Public', 'emails', 'pedido.html'
                //new URL('../Public/Html', import.meta.url).pathname,
                //'usuario.html'
            )
            const parametros = {
                cliente: usuario.username,
                direccion: usuario.direccion,
                productos: productos,
                precioTotal: precioTotal
            }
    
            this.modelMailer.sendMail(usuario.email, this.leerHtml(rutaArchivo, parametros), "Confirmacion-Pedido ✔")
            
            return pedidoGuardado
            
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
      
    leerHtml = async (filePath, params) => {
        try {
            let htmlString = await readFile(filePath, 'utf8')

            for (const [clave, valor] of Object.entries(params)) {
                const regex = new RegExp(`{{${clave}}}`, 'g');
                htmlString = htmlString.replace(regex, valor);
            }

            const listaProductos = params.productos.map(producto => {
                return `<li>${producto.nombre} - Precio: ${producto.precio}  <strong>x${producto.cantidad}</strong></li>`;
            }).join('');
            const regexProductos = new RegExp(`{{#productos}}[\\s\\S]*{{/productos}}`, 'g');
            htmlString = htmlString.replace(regexProductos, listaProductos);

            return htmlString
        } catch (error) {
            throw error;
        }
    };
}

export default Servicio