const router = require('express').Router();
const items =  require('./items');

router.use('/api/items', items);

module.exports = router;