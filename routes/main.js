const express = require("express");
const router = express.Router()
const { getInfo } = require('../services/customer.dal')

router.get("/", async (req, res) => {
    let info = await getInfo();
    res.render('main', { info })
});

module.exports = router