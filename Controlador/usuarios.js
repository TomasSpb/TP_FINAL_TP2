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

    guardarUsuario = async (req,res) => {
        const usuario = req.body
        const usuarioGuardado = await this.servicio.guardarUsuario(usuario)
        if(usuarioGuardado) {
            res.redirect('login')
        }
        //res.json(usuarioGuardado)
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

    login = async (req,res) => {
        const { email, password } = req.body

        try {
            const token = await this.servicio.login(email, password)
            if(token) {
                res.json(token)
            }
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    validarRegistro = async (req,res) => {
        const { email } = req.body

        try {
            await this.servicio.validarRegistro(email)
            res.status(200).json({mensaje: 'OK'})
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

export default Controlador