import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8676/users");

      const usersWithPhotoUrl = res.data.map(u => ({
        ...u,
        foto_usuario_url: u.foto_usuario
          ? `http://localhost:8676/uploads/${u.foto_usuario}`
          : null,
      }));
      setUsers(usersWithPhotoUrl);
    } catch (err) {
      setError("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8676/users/${id}`);
    fetchUsers();
  } catch (error) {
    alert("Erro ao deletar usuário.");
  }
};


  const handleEdit = (id) => {
    navigate(`/form/${id}`);
  };

  if (loading) return <p className="text-white text-center mt-8">Carregando usuários...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-3xl font-semibold">Usuários</h1>
          <button
            onClick={() => navigate("/form")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition"
          >
            + Adicionar Novo
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {users.map(user => (
            <UserCard
              key={user.id_usuario || user.nome_usuario}
              user={user}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
