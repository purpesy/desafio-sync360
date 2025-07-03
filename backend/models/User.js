var db = require("../database/connection.js");

class User { 

    async findAll(){
        try{
            var result = await db.select(['nome_usuario', 'foto_usuario', 'idade_usuario', 'rua_usuario', 'bairro_usuario', 'cidade_usuario', 'estado_usuario', 'biografia_usuario']).from('tbl_usuario');
            return result;
        }catch(error){
            console.error("Erro ao buscar usuários: ", error);
            throw error;
        }
    }

}

module.exports = new User();