# 🛠️ DeskFlow | Sistema de Suporte Técnico de TI

O DeskFlow é uma aplicação web desenvolvida como parte da disciplina de Programação Web, com foco na construção de um sistema completo de suporte técnico de TI. A plataforma permite que usuários registrem chamados, acompanhem atendimentos e que técnicos e administradores gerenciem todo o fluxo de suporte.

---

## ⚛️ Tecnologias Utilizadas

- ⚛️ React 18
- 🛣️ React Router DOM
- 🎨 Bootstrap 5
- 📊 Recharts
- 🔗 Axios
- 🔑 JWT (autenticação)
- 🎯 React Icons

---

## 🎯 Funcionalidades

### 👤 Usuário Comum
- ✅ Cadastro e login
- ✅ Abertura de chamados
- ✅ Visualização dos próprios chamados
- ✅ Comentários nos chamados
- ✅ Visualização do atendimento quando resolvido
- ✅ Dashboard com estatísticas dos próprios chamados

### 🔧 Técnico
- ✅ Visualização dos chamados atribuídos
- ✅ Registro de atendimento
- ✅ Comentários nos chamados
- ✅ Dashboard com estatísticas dos próprios atendimentos

### 👑 Administrador
- ✅ CRUD completo de Usuários
- ✅ CRUD completo de Técnicos
- ✅ CRUD completo de Categorias
- ✅ Gerenciamento de todos os chamados
- ✅ Atribuição de técnicos
- ✅ Dashboard completo com gráficos

---

## 🗂️ Estrutura do Projeto

📦 Prg04RicleyNeiva-FRONTEND
└── 📂 src
├── 📂 components
│ ├── 📄 Navbar.jsx
│ ├── 📄 Footer.jsx
│ ├── 📄 LoginForm.jsx
│ ├── 📄 TabelaChamado.jsx
│ ├── 📄 ModalChamado.jsx
│ ├── 📄 ModalComentarios.jsx
│ ├── 📄 ModalAtendimento.jsx
│ ├── 📄 ModalAtribuirTecnico.jsx
│ ├── 📄 ModalConfirmacao.jsx
│ └── 📄 ToastMensagem.jsx
├── 📂 hooks
│ └── 📄 useAuth.js
├── 📂 pages
│ ├── 📄 Home.js
│ ├── 📄 Login.js
│ ├── 📄 Cadastro.js
│ ├── 📄 Painel.js
│ ├── 📄 Chamados.js
│ ├── 📄 Usuarios.js
│ ├── 📄 Tecnicos.js
│ └── 📄 Categorias.js
└── 📂 services
├── 📄 api.js
├── 📄 usuarioService.js
├── 📄 tecnicoService.js
├── 📄 chamadoService.js
├── 📄 categoriaService.js
├── 📄 comentarioService.js
└── 📄 atendimentoService.js


---

## 🔐 Autenticação e Controle de Acesso

- Autenticação via **JWT**
- Token armazenado no `localStorage`
- Rotas protegidas por perfil (`ADMIN`, `TECNICO`, `USUARIO_COMUM`)
- Hook `useAuth` para leitura do perfil logado
- Interceptor Axios para envio automático do token

---

## 📊 Dashboard

Cada perfil possui um dashboard personalizado:

| Card | ADMIN | TECNICO | USUARIO |
|------|-------|---------|---------|
| Total de Chamados | ✅ | ✅ | ✅ |
| Abertos | ✅ | ✅ | ✅ |
| Em Andamento | ✅ | ✅ | ✅ |
| Resolvidos | ✅ | ✅ | ✅ |
| Técnicos | ✅ | ❌ | ❌ |
| Usuários | ✅ | ❌ | ❌ |
| Gráfico de Rosca | ✅ | ✅ | ✅ |

---

## 🚀 Deploy

- **Frontend:** [Vercel](https://prg04-ricley-neiva-frontend-4urk.vercel.app)
- **Backend:** [Railway](https://prg04ricleyneiva-backend-production.up.railway.app)
- **Banco de Dados:** Supabase (PostgreSQL)

---

## 🔗 Repositório Back-End

🖥️ **Back-End:** https://github.com/RicleyNeiva01/Prg04RicleyNeiva-BACKEND
