const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
const db = require('./models')
const userRouter = require('./routes/user.router.js')
const fileRouter = require('./routes/file.router.js')

global.__storagedir = __dirname.replace('server', 'public') + '/storage/'

dotenv.config()

const app = express()

app.use(morgan(process.env.NODE_ENV))
app.use(cors())

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// routes : REST API
app.use('/v1/api/user', userRouter)
app.use('/v1/api/file', fileRouter)

// graphql
app.use('/v1/gql', graphqlHTTP({
  schema: schema,
  graphiql: process.env.NODE_ENV === 'dev',
}))

// connect DB and listen
db.sequelize.sync({ force: false })
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Listening on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.error(err)
  })
