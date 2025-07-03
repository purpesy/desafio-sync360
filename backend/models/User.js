var db = require("../database/connection.js");

class User { 
    // Encontra todos
    async findAll(){
        try{
            var result = await db.select(['nome_usuario', 'foto_usuario', 'idade_usuario', 'rua_usuario', 'bairro_usuario', 'cidade_usuario', 'estado_usuario', 'biografia_usuario']).from('tbl_usuario');
            return result;
        }catch(error){
            console.error("Erro ao buscar usuários: ", error);
            throw error;
        }
    }
    // Encontra por ID
    async findById(id){
        try{
            var result = await db.select(['nome_usuario', 'foto_usuario', 'idade_usuario', 'rua_usuario', 'bairro_usuario', 'cidade_usuario', 'estado_usuario', 'biografia_usuario']).from('tbl_usuario').where('id_usuario', id);
            return result;
        }catch(error){
            console.error("Erro ao buscar usuário: ", error);
            throw error;
        }
    }
    // Criar um novo
    async newUser(nome, foto, idade, rua, bairro, cidade, estado, biografia) {
        try {
            await db('tbl_usuario').insert({
                nome_usuario: nome,
                foto_usuario: foto,
                idade_usuario: idade,
                rua_usuario: rua,
                bairro_usuario: bairro,
                cidade_usuario: cidade,
                estado_usuario: estado,
                biografia_usuario: biografia
            });
            return { message: "Usuário criado com sucesso!" };
        } catch (error) {
            console.error("Erro ao criar usuário: ", error);
            throw error;
        }
    }

}

module.exports = new User();