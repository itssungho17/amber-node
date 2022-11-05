const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(morgan(process.env.NODE_ENV))
app.use(cors())

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// graphql
app.use('/v1/graphql', graphqlHTTP({
  schema: schema,
  graphiql: process.env.NODE_ENV === 'dev',
}))

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
