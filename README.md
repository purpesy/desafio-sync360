# Projeto Desafio Técnico Sync360.io – Perfil de Usuário

## Deploy

- Link do projeto frontend hospedado no vercel: [https://frotend-sync.vercel.app/](https://frotend-sync.vercel.app/)
- Link do backend (API) hospedado no Railway: `https://backend-sync-deploy.up.railway.app`

### Observações

- O frontend está configurado para consumir a API do backend através do link acima.
- Para testar localmente, configure as variáveis de ambiente e rode os dois projetos (frontend e backend) conforme instruções abaixo.
- O deploy garante que a aplicação esteja disponível online, com integração entre frontend e backend funcionando corretamente.

## Descrição
Aplicação web para gerenciamento de perfis de usuário com CRUD completo. Interface responsiva e minimalista usando React/Tailwind CSS no frontend e API RESTful Node.js no backend com MySQL.

## Funcionalidades
- **Listagem**: Visualização de usuários com foto, nome, idade e biografia
- **Formulário**: Criação e edição de usuários com validação
- **Upload**: Foto de perfil com limite de 5MB
- **Exclusão**: Remoção com confirmação
- **Navegação**: Interface intuitiva e responsiva

## Stack Tecnológica

### Frontend
- React.js
- React Router Dom
- Axios
- Tailwind CSS

### Backend
- Node.js + Express
- MySQL
- Multer (upload de arquivos)

## Estrutura do Projeto

```
/backend
├── controllers/
├── models/
├── routes/
├── uploads/       
└── index.js      

/frontend
├── src/
  ├── components/
  ├── pages/
  ├── App.jsx
  └── main.jsx
```

## Como Executar

### Pré-requisitos
- Node.js (v16+)
- MySQL
- Git

### Configuração

1. **Clone o repositório**
```bash
git clone https://github.com/purpesy/desafio-sync360.git
cd desafio-sync360
```

2. **Configure o MySQL**
```sql
CREATE DATABASE db_desafio_sync;
USE db_desafio_sync;
CREATE TABLE tbl_usuario(
	id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL, 
    foto_usuario VARCHAR(250) DEFAULT NULL,
    idade_usuario TINYINT UNSIGNED NOT NULL,
    rua_usuario VARCHAR(120) NOT NULL,
    bairro_usuario VARCHAR(80) NOT NULL,
    cidade_usuario VARCHAR(80) NOT NULL,
    estado_usuario VARCHAR(2) NOT NULL,
    biografia_usuario TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
- Configure credenciais no backend

3. **Backend**
```bash
cd backend
npm install
nodemon index.js
```
*Servidor: http://localhost:8676*

4. **Frontend**
```bash
cd frontend
npm install
npm run dev
```
*Aplicação: http://localhost:5173*

## API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/users` | Lista todos os usuários |
| GET | `/users/:id` | Retorna usuário específico |
| POST | `/users` | Cria novo usuário |
| PUT | `/users/:id` | Atualiza usuário |
| DELETE | `/users/:id` | Exclui usuário |

## Características Técnicas
- Upload opcional de fotos até 5MB
- Validações de formulário com mensagens claras
- Interface responsiva (mobile/desktop)
- Código organizado em componentes
- Arquitetura escalável

## Contato
**Lucas Gabriel dos Santos**
- Email: lucasgabdsantos@gmail.com
- Linkedin: https://www.linkedin.com/in/lucas-dev-gabriel

*Obrigado pela oportunidade!*
