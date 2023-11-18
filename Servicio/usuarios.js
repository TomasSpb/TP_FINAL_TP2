import ModelMongoDB from '../Model/DAOs/UsuariosMongoDB.js'
import Nodemailer from '../Model/mailer.js'

class Servicio {
    constructor() {
        this.model = new ModelMongoDB()
        this.modelNodemailer = new Nodemailer()
    }

    obtenerUsuarios = async id => {
        const usuarios = await this.model.obtenerUsuarios(id)
        return usuarios
    }   

    guardarUsuario = async usuario => {
        const usuarioGuardado = await this.model.guardarUsuario(usuario)
        this.modelNodemailer.sendMail(usuarioGuardado.email)
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

    login = async (email, pass) => {
        try {
            const usuario = await this.model.login(email, pass)
            return usuario._id
            //return usuario
        } catch (error) {
            throw error
        } 
    } 

    validarRegistro = async (email) => {
        try {
            await this.model.verificarRegistro(email)
        } catch (error) {
            throw error
        } 
    } 
}

export default Servicio