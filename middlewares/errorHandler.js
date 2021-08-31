const { CelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CelebrateError) {
    return res.status(400).send({ message: err.details.get([...err.details.keys()][0]).details.message,
  });
}

  if(err.code === 11000 && err.name === 'MongoError ') {
    return res.status(409).send({ message: 'Такие данные уже зарегистрированы в базе' });
  }

  if(err.status) {
    return res.status(err.status).send({message: err.message});
  }

  res.status(500).send({ message: 'Internal Server Error'});

  return next();

};

module.exports = errorHandler;