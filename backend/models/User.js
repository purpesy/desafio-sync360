var db = require("../database/connection.js");

class User { 
    // Encontra todos
    async findAll(){
        try{
            var result = await db.select().from('tbl_usuario');
            return result;
        }catch(error){
            console.error("Erro ao buscar usuários: ", error);
            throw error;
        }
    }
    // Encontra por ID
    async findById(id){
        try{
            var result = await db.select().from('tbl_usuario').where('id_usuario', id);
            if(result.length === 0) {
                return undefined;
            }else {
                return result;
            }
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
    // Atualizar um usuário
    async updateUser(id, nome, foto, idade, rua, bairro, cidade, estado, biografia) {
        var user = await this.findById(id);
        if (user != undefined && user.length > 0) {
            var editUser = {}; 
            if (nome) editUser.nome_usuario = nome;
            if (foto) editUser.foto_usuario = foto;
            if (idade) editUser.idade_usuario = idade;
            if (rua) editUser.rua_usuario = rua;
            if (bairro) editUser.bairro_usuario = bairro;
            if (cidade) editUser.cidade_usuario = cidade;
            if (estado) editUser.estado_usuario = estado;
            if (biografia) editUser.biografia_usuario = biografia;

            try {
                await db.update(editUser).table("tbl_usuario").where({id_usuario: id});
                return {success: "Usuário atualizado com sucesso"};
            } catch (error) {
                console.log(error);
                return {error: "Erro ao atualizar usuário"};
            }
        }else {
            return {error: "Usuário não encontrado"};
        }
    }
    // Deletar um usuário
    async deleteUser(id){
        var user = await this.findById(id);
        if(user != undefined){
            try {
                await db.delete().table("tbl_usuario").where({id_usuario: id});
                return {success: "Usuário deletado com sucesso"};
            } catch (error) {
                console.log(error);
                return {error: "Erro ao deletar usuário"};
            }
        } else {
            return {error: "Usuário não encontrado"}; 
        }
    }

}

module.exports = new User();