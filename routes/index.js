const router = require('express').Router();
const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const tasksRoutes = require('./tasks');
const { NotFound } = require('../errors');

router.post('/signup', createUser);
router.post('/signin', loginUser);

router.use('/users', auth, usersRoutes);
router.use('/tasks', auth, tasksRoutes);

router.use('*', auth, () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;