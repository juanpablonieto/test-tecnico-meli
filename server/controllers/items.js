var router = require('express').Router();
var Items = require('../models/items');

router.get('/', async (req, res) => {
    const search = req.query.q;
    const items = await Items.getBySearch(search);
    res.send(items);
})

router.get('/:id', async (req, res) => {
    const item = await Items.getById(req.params.id);
    res.send(item);
})

module.exports = router;