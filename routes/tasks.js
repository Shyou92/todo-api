const router = require('express').Router();
const controller = require('../controllers/tasks');

router.post('/', controller.createTask);

module.exports = router;