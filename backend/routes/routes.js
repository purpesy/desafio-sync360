var express =  require('express');
var HomeController = require('../controllers/HomeController.js');
var UserController = require('../controllers/UserController.js');


var router = express.Router();
router.get("/", HomeController.index);
router.get("/users", UserController.index);
router.get("/users/:id", UserController.userByID);
router.post("/users", UserController.create);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

module.exports = router;