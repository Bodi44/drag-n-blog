const express = require('express')
const graphqlHttp = require('express-graphql')
const schema = require('./schema')
const mongoose = require('mongoose')
const cors = require('cors')

const port = 'http://localhost:4000/graphql'

const app = express()

app.use(cors())

mongoose.connect(
  `mongodb+srv://new_user1:W0EQw6v7mM524bpN@cluster0-kglrt.mongodb.net/drag-n-blog?retryWrites=true&w=majority`
)

mongoose.connection.once('open', () => {
  console.log('connected to db!')
})

app.use('/graphql', graphqlHttp({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Now listening for requests on port', port)
})