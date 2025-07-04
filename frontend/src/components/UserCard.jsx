import React from "react";

const UserCard = ({ user, onDelete, onEdit }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 text-white shadow-md flex flex-col md:flex-row gap-6 items-center md:items-start">
      <img
        src={user.foto_usuario_url}
        alt={user.nome_usuario}
        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">{user.nome_usuario}</h2>
          <span className="text-gray-400">{user.idade_usuario} anos</span>
        </div>
        <p className="text-gray-300">{user.biografia_usuario}</p>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onEdit(user.id_usuario)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded font-medium"
          >
            Atualizar
          </button>
          <button
            onClick={() => {
              if (window.confirm("Deseja realmente deletar este usuário?")) {
                onDelete(user.id_usuario);
              }
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded font-medium"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
