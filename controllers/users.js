const User = require('../models/user');
const { NotFound } = require('../errors');

const getCurrentUserInfo = (req, res, next) => {
  const _id = req.user;
  User.find({_id})
    .then((user) => {
      if(!user) {
        throw new NotFound('Нет пользователя с таким id');
      }

      return res.status(200).send(user);
    })
    .catch(err => next(err));
};

module.exports = {
  getCurrentUserInfo,
}