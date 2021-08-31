const router = require('express').Router();
const controller = require('../controllers/tasks');
const createTaskValidation = require('../middlewares/validators/createTask');

router.post('/', createTaskValidation, controller.createTask);
router.get('/', controller.getTasks);
router.delete('/:taskId', controller.deleteTask);
router.patch('/:taskId', controller.editTask);

module.exports = router;