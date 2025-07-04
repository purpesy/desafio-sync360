import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  nome: "",
  idade: "",
  rua: "",
  bairro: "",
  cidade: "",
  estado: "",
  biografia: "",
};

const estadosBR = [
  "",
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef();

  // Carregar usuário para edição se tiver ID
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8676/users/${id}`)
        .then((res) => {
          const user = res.data[0];
          setForm({
            nome: user.nome_usuario,
            idade: user.idade_usuario.toString(),
            rua: user.rua_usuario,
            bairro: user.bairro_usuario,
            cidade: user.cidade_usuario,
            estado: user.estado_usuario,
            biografia: user.biografia_usuario,
          });
          if (user.foto_usuario) {
            setPreview(`http://localhost:8676/uploads/${user.foto_usuario}`);
          }
        })
        .catch(() => {
          alert("Erro ao carregar dados do usuário.");
        });
    }
  }, [id]);

  useEffect(() => {
    const newErrors = {};

    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório";
    else if (form.nome.length < 3) newErrors.nome = "Mínimo 3 caracteres";

    if (!form.idade.trim()) newErrors.idade = "Idade é obrigatória";
    else if (isNaN(form.idade) || form.idade < 1 || form.idade > 120)
      newErrors.idade = "Idade entre 1 e 120";

    if (!form.rua.trim()) newErrors.rua = "Rua é obrigatória";
    if (!form.bairro.trim()) newErrors.bairro = "Bairro é obrigatório";
    if (!form.cidade.trim()) newErrors.cidade = "Cidade é obrigatória";
    if (!form.estado.trim()) newErrors.estado = "Estado é obrigatório";

    if (!form.biografia.trim()) newErrors.biografia = "Biografia é obrigatória";
    else if (form.biografia.length < 20)
      newErrors.biografia = "Mínimo 20 caracteres";

    setErrors(newErrors);
  }, [form]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImage(null);
      setPreview(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Arquivo muito grande. Máximo 5MB.");
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setForm(initialState);
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      let fotoBase64 = null;
      if (image && typeof image !== "string") {
        fotoBase64 = await toBase64(image);
      }

      const payload = {
        ...form,
        foto: fotoBase64,
      };

      if (id) {
        await axios.put(`http://localhost:8676/users/${id}`, payload, {
          headers: { "Content-Type": "application/json" },
        });
        setSuccessMessage("Perfil atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8676/users", payload, {
          headers: { "Content-Type": "application/json" },
        });
        setSuccessMessage("Perfil enviado com sucesso!");
        clearForm();
      }

      setTimeout(() => navigate("/users"), 1500);
    } catch (error) {
      alert("Erro ao enviar perfil. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg p-6 text-white">
        <button
          onClick={() => navigate("/users")}
          className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Voltar para a lista de usuários"
        >
          ← Voltar
        </button>
        <h1 className="text-2xl font-semibold mb-4">
          {id ? "Editar Perfil do Usuário" : "Novo Perfil do Usuário"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Foto */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer flex items-center justify-center overflow-hidden hover:border-blue-500"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              aria-label="Selecionar foto de perfil"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Foto (Opcional)</span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              aria-label="Upload de foto"
            />
          </div>

          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block mb-1 font-medium">
              Nome *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className={`w-full p-3 rounded bg-gray-700 border ${
                errors.nome ? "border-red-500" : "border-gray-600"
              } text-white`}
              placeholder="Digite seu nome completo"
            />
            {errors.nome && (
              <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
            )}
          </div>

          {/* Idade */}
          <div>
            <label htmlFor="idade" className="block mb-1 font-medium">
              Idade *
            </label>
            <input
              type="number"
              id="idade"
              name="idade"
              value={form.idade}
              onChange={handleChange}
              min="1"
              max="120"
              className={`w-full p-3 rounded bg-gray-700 border ${
                errors.idade ? "border-red-500" : "border-gray-600"
              } text-white`}
              placeholder="Sua idade"
            />
            {errors.idade && (
              <p className="text-red-500 text-sm mt-1">{errors.idade}</p>
            )}
          </div>

          {/* Endereço */}
          <fieldset className="border-t border-gray-700 pt-4 space-y-4">
            <legend className="font-medium">Endereço *</legend>

            {["rua", "bairro", "cidade"].map((campo) => (
              <div key={campo}>
                <label htmlFor={campo} className="block mb-1 capitalize">
                  {campo}
                </label>
                <input
                  type="text"
                  id={campo}
                  name={campo}
                  value={form[campo]}
                  onChange={handleChange}
                  className={`w-full p-3 rounded bg-gray-700 border ${
                    errors[campo] ? "border-red-500" : "border-gray-600"
                  } text-white`}
                  placeholder={`Digite o ${campo}`}
                />
                {errors[campo] && (
                  <p className="text-red-500 text-sm mt-1">{errors[campo]}</p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="estado" className="block mb-1">
                Estado (UF)
              </label>
              <select
                id="estado"
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className={`w-full p-3 rounded bg-gray-700 border ${
                  errors.estado ? "border-red-500" : "border-gray-600"
                } text-white`}
              >
                {estadosBR.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf || "Selecione"}
                  </option>
                ))}
              </select>
              {errors.estado && (
                <p className="text-red-500 text-sm mt-1">{errors.estado}</p>
              )}
            </div>
          </fieldset>

          {/* Biografia */}
          <div>
            <label htmlFor="biografia" className="block mb-1 font-medium">
              Biografia *
            </label>
            <textarea
              id="biografia"
              name="biografia"
              rows={4}
              value={form.biografia}
              onChange={handleChange}
              className={`w-full p-3 rounded bg-gray-700 border ${
                errors.biografia ? "border-red-500" : "border-gray-600"
              } text-white resize-none`}
              placeholder="Conte um pouco sobre você..."
            />
            {errors.biografia && (
              <p className="text-red-500 text-sm mt-1">{errors.biografia}</p>
            )}
          </div>

          {/* Botão Enviar */}
          <div className="text-right">
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0 || isSubmitting}
              className={`px-6 py-3 rounded font-medium ${
                Object.keys(errors).length === 0 && !isSubmitting
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting
                ? "Enviando..."
                : id
                ? "Atualizar Perfil"
                : "Enviar Perfil"}
            </button>
            {successMessage && (
              <div className="bg-green-600 p-3 rounded mb-4">
                {successMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
