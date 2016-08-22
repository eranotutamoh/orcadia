var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/main');


/* GET layout template */
router.get('/', ctrlIndex.orcadia_template);


module.exports = router;
