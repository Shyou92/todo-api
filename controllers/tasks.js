const Task = require('../models/task');
const randomId = require('../utils/idGenerator');
const { BadRequest } = require('../errors');

const createTask = (req, res, next) => {
  const { task, important } = req.body;
  res.setHeader('Content-Type', 'application/json');
  Task.create({ task, important, owner: req.user._id, taskId: randomId()})
    .then((task) => {
      if (!task) {
        throw new BadRequest('Введите корректные данные');
      }

      res.status(200).send(task);
    })
    .catch(err => next(err));
}

module.exports = {
  createTask,
}