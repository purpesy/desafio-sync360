var express =  require('express');
var HomeController = require('../controllers/HomeController.js');
var UserController = require('../controllers/UserController.js');


var router = express.Router();
router.get("/", HomeController.index);
router.get("/", HomeController.index);
router.get("/users", UserController.index);


module.exports = router;