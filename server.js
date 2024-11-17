const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Configuração do middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Lista para armazenar empresas cadastradas
const empresas = [];

// Rota para exibir o formulário
app.get("/", (req, res) => {
  res.send(`
        <head>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
                color: #333;
                }

                h1,
                h2 {
                text-align: center;
                color: #444;
                }

                form {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                form label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                }

                form input,
                form button {
                width: 100%;
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid #ccc;
                border-radius: 3px;
                }

                form button {
                background: #4caf50;
                color: white;
                border: none;
                cursor: pointer;
                font-size: 16px;
                }

                form button:hover {
                background: #45a049;
                }

                ul {
                max-width: 600px;
                margin: 20px auto;
                padding: 0;
                list-style: none;
                background: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                ul li {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                }

                ul li:last-child {
                border-bottom: none;
                }

                a {
                color: #007bff;
                text-decoration: none;
                }

                a:hover {
                text-decoration: underline;
                }

                .error {
                color: red;
                font-weight: bold;
                text-align: center;
                margin: 10px;
                }

            </style>
        </head>
        <body>
        <h1>Cadastro de Empresas</h1>
        <form action="/cadastrar" method="POST">
            <label>CNPJ:</label>
            <input type="text" name="cnpj" required><br>
            
            <label>Razão Social:</label>
            <input type="text" name="razaoSocial" required><br>
            
            <label>Nome Fantasia:</label>
            <input type="text" name="nomeFantasia" required><br>
            
            <label>Endereço:</label>
            <input type="text" name="endereco" required><br>
            
            <label>Cidade:</label>
            <input type="text" name="cidade" required><br>
            
            <label>UF:</label>
            <input type="text" name="uf" maxlength="2" required><br>
            
            <label>CEP:</label>
            <input type="text" name="cep" required><br>
            
            <label>Email:</label>
            <input type="email" name="email" required><br>
            
            <label>Telefone:</label>
            <input type="tel" name="telefone" required><br>
            
            <button type="submit">Cadastrar</button>
        </form>
        
        <h2>Empresas Cadastradas</h2>
        <ul>
            ${empresas
              .map(
                (empresa) =>
                  `<li>${empresa.cnpj} - ${empresa.razaoSocial} (${empresa.nomeFantasia}) - ${empresa.email}</li>`
              )
              .join("")}
        </ul>
        </body
    `);
});

// Rota para processar o cadastro
app.post("/cadastrar", (req, res) => {
  const {
    cnpj,
    razaoSocial,
    nomeFantasia,
    endereco,
    cidade,
    uf,
    cep,
    email,
    telefone,
  } = req.body;

  // Validação de campos obrigatórios
  const camposVazios = [];
  if (!cnpj) camposVazios.push("CNPJ");
  if (!razaoSocial) camposVazios.push("Razão Social");
  if (!nomeFantasia) camposVazios.push("Nome Fantasia");
  if (!endereco) camposVazios.push("Endereço");
  if (!cidade) camposVazios.push("Cidade");
  if (!uf) camposVazios.push("UF");
  if (!cep) camposVazios.push("CEP");
  if (!email) camposVazios.push("Email");
  if (!telefone) camposVazios.push("Telefone");

  if (camposVazios.length > 0) {
    return res.send(`
            <h1>Erro ao cadastrar</h1>
            <p>Os seguintes campos estão vazios: ${camposVazios.join(", ")}</p>
            <a href="/">Voltar ao formulário</a>
        `);
  }

  // Adiciona empresa à lista
  empresas.push({
    cnpj,
    razaoSocial,
    nomeFantasia,
    endereco,
    cidade,
    uf,
    cep,
    email,
    telefone,
  });

  res.redirect("/");
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
