import supertest from "supertest"
import { expect } from "chai"

const request = supertest('http://127.0.0.1:8080')

describe('test ApiResto', () => {
    describe('GET', () => {
        it('deberia retornar un status 200', async () => {
        
            const response = await request.get('/api/resto/productos')
            expect(response.status).to.eql(200)

            console.log(response.body)
        })
    })
})