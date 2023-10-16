const express = require('express')
import { v4 } from 'uiid'

const port = 3000
const app = express()
app.use(express.json())   /* Json tenque vim sempre antes da nossas ('ROATAS') */

//--------------------------//-------------------------------//--------------------------------//-----------------------//                

/*  - Query params => meusite.com/users?nome=jorge&age=28 // FILTROS
    -Route params => /users/2   //BUSCAR DELETAR OU ATUALIZAR ALGO ESPECIFICO
    - Request Body => { "name:"jorge", "age":33}
    -------------------//-----------------------//-------------------------//------------------------//----------------
    -Get    => Buscar informação no 'Back-end'
    -Post   => Criar informação no  'Back-end'
    -Put / Patch  => alterar/Atualizar informação no  'Back-end'
    -DELETE => Deletar informação no  'Back-end'
    -Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da rquisição
*/

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id
    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).jason(user)
})

app.put('/users/:id', checkUserId, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedUser = { id, name, age }
    const users = [index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})







app.listen(port, () => {
    console.log(`🚀Serve stardted on port 3000🎉`);
})