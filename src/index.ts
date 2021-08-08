import http from 'http'
import express from 'express'
import db from './database/models';
import graphqlApp from './graphql';
import { useTransaction } from './server/transaction';
import appConfig from './config'
 

let _server: http.Server
const app = express()

app.use('*', useTransaction)
app.use(graphqlApp)

const startServer = async () =>
db.sequelize.sync().then(async () => {
    const {port} = appConfig
    _server = http.createServer(app)
    _server.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`, {address: _server.address()})
    })
  })

startServer().catch((e) => {
  console.error("Error During Server Startup", e);
})
