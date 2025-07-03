class HomeController{

    async index(req, res){
        res.send("Desafio sync360 - Lucas Gabriel");
    }

}

module.exports = new HomeController();