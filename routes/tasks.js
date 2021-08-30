const router = require('express').Router();
const controller = require('../controllers/tasks');

router.post('/', controller.createTask);
router.get('/', controller.getTasks);
router.delete('/:taskId', controller.deleteTask);
router.patch('/:taskId', controller.editTask);

module.exports = router;