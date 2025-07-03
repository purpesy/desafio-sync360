var express =  require('express');
var HomeController = require('../controllers/HomeController.js');


var router = express.Router();
router.get("/", HomeController.index);


module.exports = router;