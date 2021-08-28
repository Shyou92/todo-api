const router = require('express').Router();
const controller = require('../controllers/users');

router.get('me', controller.getCurrentUserInfo);

router.patch('me');

module.exports = router;