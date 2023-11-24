import { readFile } from 'fs/promises'
import path from 'path'
import ModelMongoDB from '../Model/DAOs/UsuariosMongoDB.js'
import Nodemailer from '../Model/mailer.js'


class Servicio {
    constructor() {
        this.model = new ModelMongoDB()
        this.modelMailer = new Nodemailer()
    }

    obtenerUsuarios = async id => {
        const usuarios = await this.model.obtenerUsuarios(id)
        return usuarios
    }   

    guardarUsuario = async usuario => {
        const usuarioGuardado = await this.model.guardarUsuario(usuario)

        const rutaArchivo = path.join(
            'Public', 'emails', 'usuario.html'
            //new URL('../Public/Html', import.meta.url).pathname,
            //'usuario.html'
        )
        const parametros = {
            cliente: usuario.username
        }

        this.modelMailer.sendMail(usuarioGuardado.email, this.leerHtml(rutaArchivo, parametros), "Confirmacion-Cuenta ✔")

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

    leerHtml = async (filePath, params) => {
        try {
            let htmlString = await readFile(filePath, 'utf8')

            Object.keys(params).forEach(key => {
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                htmlString = htmlString.replace(regex, params[key]);
            });
        
            return htmlString
        } catch (error) {
            throw error;
        }
    };
}

export default Servicio