const BookController = require('../controllers/Book')

const router = require('express').Router()

router.post('/', BookController.postBook)
router.get('/', BookController.getAllBook)
router.get('/:bookId', BookController.getDetailBook)
router.put('/:bookId', BookController.updatedBook)
router.delete('/:bookId', BookController.deleteBook)

module.exports = router