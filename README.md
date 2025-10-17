# 📚 School Dashboard

## 1️⃣ Visão Geral
O **School Dashboard** é uma aplicação web para gerenciamento de alunos, professores e turmas. Possui funcionalidades específicas para diferentes papéis de usuário, começando pelo **Diretor**.

Funcionalidades implementadas até agora:

- Login de usuários com autenticação via JWT.
- Dashboard do Diretor com estatísticas (alunos, professores, turmas).
- Cadastro/matrícula de alunos.
- Validação de cadastro e verificação de duplicidade de alunos.
- Logout seguro.
- Layout responsivo para desktop e mobile.


## 3️⃣ Tecnologias Utilizadas

- **Backend:** Node.js, Express, Prisma ORM
- **Banco de Dados:** SQLite (desenvolvimento)
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Autenticação:** JWT
- **Envio de email:** Nodemailer
- **Outros:** bcryptjs (hash de senha), crypto (tokens aleatórios)

---

## 4️⃣ Configurações do Projeto

### 4.1 Backend

1. Instalar dependências:
```bash
cd backend
npm install
````

2. Criar arquivo `.env`:

```env
PORT=3000
JWT_SECRET=seu_segredo_aqui
SMTP_HOST=smtp.exemplo.com
SMTP_PORT=587
SMTP_USER=usuario@exemplo.com
SMTP_PASS=senha
FRONTEND_URL=http://localhost:5500/frontend
```

3. Rodar o servidor:

```bash
npm run dev
```

---

### 4.2 Frontend

* Abrir diretamente os arquivos HTML no navegador ou servir com **Live Server**:

```bash
cd frontend
# Abrir login/login.html no navegador
```

* Estrutura de pastas:

  * `/login` → Página de login
  * `/dashboard` → Dashboard do diretor
  * `/matricula` → Página de matrícula de alunos
  * `/assets` → Ícones, imagens ou arquivos adicionais

---

## 5️⃣ Funcionalidades

### 5.1 Login

* Autenticação via email e senha.
* Armazena token JWT no `localStorage`.
* Redireciona para dashboard do diretor se login for válido.

### 5.2 Dashboard do Diretor

* Exibe **cards de estatísticas**:

  * Total de alunos
  * Total de professores
  * Turmas ativas
* Exibe tabelas com detalhes de alunos e professores.
* Logout seguro.

### 5.3 Matrícula de Aluno

* Formulário de cadastro de alunos.
* Validação de campos obrigatórios.
* Confirmação se aluno já existe.
* Confirmação de matrícula realizada com sucesso.

---

## 6️⃣ Rotas da API

### 6.1 Autenticação

| Método | Rota                             | Descrição                    |
| ------ | -------------------------------- | ---------------------------- |
| POST   | /api/auth/register               | Registrar usuário            |
| POST   | /api/auth/login                  | Login e retorno de token JWT |
| POST   | /api/auth/request-password-reset | Solicitar reset de senha     |
| POST   | /api/auth/reset-password         | Resetar senha via token      |

### 6.2 Alunos

| Método | Rota          | Descrição                  |
| ------ | ------------- | -------------------------- |
| GET    | /api/students | Listar todos os alunos     |
| POST   | /api/students | Cadastrar/matricular aluno |

### 6.3 Professores

| Método | Rota          | Descrição          |
| ------ | ------------- | ------------------ |
| GET    | /api/teachers | Listar professores |

### 6.4 Turmas

| Método | Rota           | Descrição     |
| ------ | -------------- | ------------- |
| GET    | /api/schedules | Listar turmas |

---

## 7️⃣ Boas Práticas Aplicadas

* Estrutura de pastas modularizada (controllers, routes, frontend separado)
* Validação de campos no frontend e backend
* Uso de JWT para autenticação
* Logout seguro
* CSS modular por página (ex.: `dashboard_director.css`, `matricular_aluno.css`)
* `localStorage` apenas para token, sem armazenar dados sensíveis

---

## 8️⃣ Próximos Passos

* Criar página de gerenciamento de professores
* Adicionar funcionalidade de atualização/exclusão de alunos e professores
* Relatórios de desempenho e frequência
* Implementação de permissões para diferentes papéis (professor, diretor, admin)
* Melhorias no UI/UX (notificações, loaders, filtros nas tabelas)

---

## 9️⃣ Contato

Desenvolvido por Antonio Carlos Pereira.
Email: [antoniocarlospereiraalves12345@gmail.com](mailto:antoniocarlospereiraalves12345@gmail.com)

