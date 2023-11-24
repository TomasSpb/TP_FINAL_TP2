import supertest from "supertest"
import generadorP from './generador/producto.js'
import generadorU from './generador/usuario.js'
import { expect } from "chai"

const request = supertest('http://127.0.0.1:8080')

describe('test ApiResto', () => {
    describe('POST', () => {
        it('deberia retornar un status 200', async () => {
            const producto1 = generadorP.get()
            const producto2 = generadorP.get()
            const usuario = generadorU.get()

            const data = {
                listaProductos: [producto1, producto2],
                usuario: usuario
            }

            const response = await request.post('/api/resto/guardarPedido').send(data)
            expect(response.status).to.eql(200)

            const pedido = response.body
            expect(pedido).to.include.keys('direccion', 'idUsuario', 'nombreUsuario', 'precioTotal', 'productos')
            
            console.log(pedido)
            
        })
    })
})