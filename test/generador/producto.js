import { faker } from "@faker-js/faker/locale/es"
import { ObjectId } from "mongodb"

const get = () => ({
    id: new ObjectId().toHexString(),
    nombre: faker.commerce.product(),
    precio: faker.number.float({min: 2500, max: 6000, precision:0.01}),
    cantidad: faker.number.int({min: 1, max: 4 })
})

console.log(get())

export default {
    get
}