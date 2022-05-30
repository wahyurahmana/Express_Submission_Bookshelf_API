const router = require('express').Router()
const bookRouter = require('./bookRouter.js')

router.get('/', (req, res, next)=> {
  res.status(200).json('hello')
})

router.use('/books', bookRouter)

module.exports = router