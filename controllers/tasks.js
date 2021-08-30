const Task = require('../models/task');
const { BadRequest, NotFound, Forbidden } = require('../errors');

const createTask = (req, res, next) => {
  const { task, important } = req.body;

  res.setHeader('Content-Type', 'application/json');
  Task.create({ task, important, owner: req.user._id})
    .then((task) => {
      if (!task) {
        throw new BadRequest('Введите корректные данные');
      }

      res.status(200).send(task);
    })
    .catch(err => next(err));
}

const getTasks = (req, res, next) => {
  const { _id } = req.user;

  Task.find({ owner: _id})
    .then((tasks) => {
      if (!tasks) {
        throw new NotFound('Здесь ещё ничего нет');
      }
      res.status(200).send(tasks);
    })
    .catch(err => next(err));
};

const deleteTask = (req, res, next) => {
  const { taskId } = req.params;

  Task.findByIdAndDelete(taskId)
    .then((data) => {
      if (!data) {
        throw new NotFound('Такой информации не существует');
      }

      if(data.owner.toString() !== req.user._id) {
        throw new Forbidden('Нет доступа к этой карточке');
      }

      res.status(200).send(data);
    })
    .catch(err => next(err));
};


const editTask = (req, res, next) => {
  const id = req.user._id;
  const { taskId } = req.params;
  Task.findByIdAndUpdate(
    taskId,
    {
      task: req.body.task,
      important: req.body.important
    },
    {
      new: true,
      runValidators: true,
    },
  )
  .then((task) => {
    if (task.owner !== id) {
      throw new Forbidden('У вас нет прав редактировать эту запись')
    }

    if(!task) {
      throw new BadRequest('Ошибка запроса');
    }
    res.status(200).send(task)
  })
  .catch(err => next(err));
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  editTask,
}