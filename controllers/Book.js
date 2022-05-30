const {Book} = require('../models')

module.exports = class BookController {
  static postBook(req, res, next){
    const data = {
      name: req.body.name,
      year: req.body.year,
      author: req.body.author,
      summary: req.body.summary,
      publisher: req.body.publisher,
      pageCount: req.body.pageCount,
      readPage: req.body.readPage,
      finished: req.body.pageCount === req.body.readPage ? true : false,
      reading: req.body.reading
    }
    Book.create(data)
    .then((result) => {
      res.status(200).json({status : "success", message : "Buku berhasil ditambahkan", data : {bookId : result.id}})
    }).catch((err) => {
      next(err)
    });
  }

  static getAllBook(req, res, next){
    Book.findAll()
    .then((result) => {
      const books = result.map((el)=> {
        return {
          id : el.id,
          name : el.name,
          publisher : el.publisher
        }
      })

      res.status(200).json({
        status : 'success',
        data : {
          books : books
        }
      })
    }).catch((err) => {
      next(err)
    });
  }

  static getDetailBook(req, res, next){
    Book.findByPk(req.params.bookId)
    .then((result) => {
      if(!result){
        throw {name : 'bookNotFound', status : 404, message : "Buku tidak ditemukan" }
      }
      res.status(200).json({
        status: 'success',
        data : {
          book : result
        }
      })
    }).catch((err) => {
      next(err)
    });
  }
  static async updatedBook(req, res, next){
    try {
      const data = {
        name: req.body.name,
        year: req.body.year,
        author: req.body.author,
        summary: req.body.summary,
        publisher: req.body.publisher,
        pageCount: +req.body.pageCount,
        readPage: +req.body.readPage,
        finished: req.body.pageCount === req.body.readPage ? true : false,
        reading: req.body.reading
      }

      if(data.name === null || data.name === undefined || data.name === ""){
        throw { name : 'updatedFail', status : 400, message : "Gagal memperbarui buku. Mohon isi nama buku"  }
      }

      if(data.readPage > data.pageCount ){
        throw { name : 'readPageLarge', status : 400, message : "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"  }
      }
      const updateBook = await Book.update(data, {
        where : {
          id : +req.params.bookId
        }
      })
      if(updateBook[0] === 0){
        throw {name : 'bookNotFound', status : 404, message : "Gagal memperbarui buku. Id tidak ditemukan" }
      }

      res.status(200).json({status : "success", message : "Buku berhasil diperbarui"})

    } catch (error) {
      next(error)
    }
  }

  static deleteBook (req, res, next){
    Book.destroy({
      where : {
        id : +req.params.bookId
      }
    })
      .then((result) => {
        if(result === 0){
          throw {name : 'bookNotFound', status : 404, message : "Buku gagal dihapus. Id tidak ditemukan" }
        }
      res.status(200).json({status : "success", message : "Buku berhasil dihapus"})
      }).catch((err) => {
        next(err)
      });
  }
}