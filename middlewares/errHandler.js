module.exports = function errHandler(err, req, res, next) {
  let statusCode = err.status || 500
  let message = err
  console.log(err);
  if(err.name === 'SequelizeValidationError'){
    statusCode = 400
    message = err.errors[0].message
  }
  if(err.name === 'bookNotFound'){
    statusCode = 400
    message = err.message
  }
  if(err.name === 'updatedFail'){
    statusCode = 400
    message = err.message
  }
  if(err.name === 'readPageLarge'){
    statusCode = 400
    message = err.message
  }
  res.status(statusCode).json({status : 'fail', message})
}