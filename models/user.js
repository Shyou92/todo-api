const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('../errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  surname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]/gi.test(v);
      },
    },
    message: 'Введите корректный e-mail',
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email} ).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new Unauthorized('Неправильные почта или пароль'))
        }

        return user;
      });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);