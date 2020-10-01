const router = require('express').Router();
const ctrl = require('../controllers');

router.get('/', ctrl.messages.index);
router.post('/', ctrl.messages.create);

module.exports = router;