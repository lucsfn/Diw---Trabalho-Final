## Trabalho Final de DIW

Projeto apresentado à disciplina de Desenvolvimento de Interfaces Web do 1º semestre da PUC Minas. A aplicação utiliza a API do GitHub e o JSON Server como persistência de dados.

### Acesso à Aplicação

Acesse a aplicação através do seguinte link: [Trabalho no Vercel](https://diw-trabalho-final.vercel.app/)

### Pré-requisitos

Para utilizar este projeto, você precisará de um token da API do GitHub. Siga os passos abaixo para configurar:

1. **Obtenha um Token da API do GitHub:**
   - Acesse o [GitHub Developer Settings](https://github.com/settings/tokens) para criar um novo token.
   - Selecione as permissões necessárias para o projeto: repo, admin:org, user.
   - Após isto, o GitHub irá gerá um token que deve ser colado no prompt da minha aplicação.

### Executando o Projeto

Se a aplicação não estiver funcionando corretamente mesmo após configurar o token, siga estes passos para iniciar o projeto localmente:

1. **Abra o Projeto no Visual Studio Code:**
   - Abra o seu terminal dentro do Visual Studio Code.

2. **Instale as Dependências na raiz do projeto:**
   - Execute o comando abaixo para instalar as dependências do projeto:
     ```bash
     npm install
     ```

3. **Inicie o Servidor JSON Local:**
   - Utilize o `json-server` para iniciar o servidor local com base no arquivo `db.json`. Execute o seguinte comando:
     ```bash
     npx json-server ./db/db.json
     ```

4. **Inicie a Aplicação:**
   - Execute o seguinte comando para iniciar a aplicação:
     ```bash
     npm start
     ```

5. **Acesse a Aplicação Localmente:**
   - Abra o navegador e acesse `http://localhost:3000` para visualizar a aplicação em execução localmente.

6. **Substitua a variável urlPattern no app.js para receber http://localhost:3000**
para chegar ao caminho do app.js basta acessar ./public/assets/scripts/
