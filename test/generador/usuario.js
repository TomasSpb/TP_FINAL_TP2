import { faker } from "@faker-js/faker/locale/es"
import { ObjectId } from "mongodb"

const get = () => ({
    _id: new ObjectId().toHexString(),
    username: faker.person.firstName(),
    direccion: faker.location.streetAddress(false),
    password: faker.internet.password({
        length: faker.number.int({ min: 8, max: 16 }),
        pattern: /[a-zA-Z0-9]/
    }),
    email: faker.internet.email({ provider: 'test.ApiResto.com' })
})

console.log(get())

export default {
    get
}
