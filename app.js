const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const errHandler = require('./middlewares/errHandler')
const router = require('./routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use(router)

app.use(errHandler)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})