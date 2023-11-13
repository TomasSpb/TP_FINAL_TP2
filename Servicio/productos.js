import ModelMongoDB from '../Model/DAOs/ProductosMongoDB.js'

class Servicio {
    constructor() {
        this.model = new ModelMongoDB()
    }

    obtenerProductos = async id => {
        const productos = await this.model.obtenerProductos(id)
        return productos
    }   

    guardarProducto = async producto => {
        const productoGuardado = await this.model.guardarProducto(producto)
        return productoGuardado
    }

    actualizarProducto = async (id, producto) => {
        const productoActualizado = await this.model.actualizarProducto(id,producto)
        return productoActualizado
    }

    borrarProducto = async id => {
        const productoBorrado = await this.model.borrarProducto(id)
        return productoBorrado
    }
}

export default Servicio