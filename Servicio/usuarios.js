import ModelMongoDB from '../Model/DAOs/UsuariosMongoDB.js'

class Servicio {
    constructor() {
        this.model = new ModelMongoDB()
    }

    obtenerUsuarios = async id => {
        const usuarios = await this.model.obtenerUsuarios(id)
        return usuarios
    }   

    guardarUsuario = async usuario => {
        const usuarioGuardado = await this.model.guardarUsuario(usuario)
        return usuarioGuardado
    }

    actualizarUsuario = async (id, usuario) => {
        const usuarioActualizado = await this.model.actualizarUsuario(id,usuario)
        return usuarioActualizado
    }

    borrarUsuario = async id => {
        const usuarioBorrado = await this.model.borrarUsuario(id)
        return usuarioBorrado
    }
}

export default Servicio