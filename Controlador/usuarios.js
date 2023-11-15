import Servicio from '../Servicio/usuarios.js'


class Controlador {
    constructor() {
        this.servicio = new Servicio()
    }

    obtenerUsuarios = async (req,res) => {
        const { id } = req.params
        const usuarios = await this.servicio.obtenerUsuarios(id)
        res.json(usuarios)
    }

    login = async (req,res) => {
        const { user } = req.params
        const usuario = await this.servicio.login(user)
        res.json(usuario)
    }

    guardarUsuario = async (req,res) => {
        const usuario = req.body
        const usuarioGuardado = await this.servicio.guardarUsuario(usuario)
        res.json(usuarioGuardado)
    }

    actualizarUsuario = async (req,res) => {
        const { id } = req.params
        const usuario = req.body
        const usuarioActualizado = await this.servicio.actualizarUsuario(id, usuario)
        res.json(usuarioActualizado)
    }

    borrarUsuario = async (req,res) => {
        const { id } = req.params
        const usuarioBorrado = await this.servicio.borrarUsuario(id)
        res.json(usuarioBorrado)
    }
}

export default Controlador