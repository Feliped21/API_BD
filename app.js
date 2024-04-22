// Importando os módulos necessários
const express = require('express');
const fs = require('fs');

// Inicializando o aplicativo Express
const app = express();
const PORT = 3000; // Porta em que o servidor irá escutar

// Middleware para interpretar o corpo das solicitações como JSON
app.use(express.json());

// Middleware para permitir solicitações CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Rota para obter os dados dos alunos
app.get('/alunos', (req, res) => {
    // Lendo o arquivo JSON de alunos
    fs.readFile('alunos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }

        // Convertendo os dados para JSON
        const alunos = JSON.parse(data);

        // Enviando os dados como resposta
        res.json(alunos);
    });
});

// Rota para inserir um novo aluno
app.post('/alunos', (req, res) => {
    // Obtendo os dados do novo aluno do corpo da solicitação
    const novoAluno = req.body;

    // Lendo o arquivo JSON de alunos
    fs.readFile('alunos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }

        // Convertendo os dados para JSON
        const alunos = JSON.parse(data);

        // Adicionando o novo aluno aos dados existentes
        alunos.push(novoAluno);

        // Escrevendo os dados atualizados de volta no arquivo JSON
        fs.writeFile('alunos.json', JSON.stringify(alunos), (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo JSON:', err);
                res.status(500).send('Erro interno do servidor');
                return;
            }

            // Respondendo ao cliente com uma mensagem de sucesso
            res.status(201).send('Aluno adicionado com sucesso');
        });
    });
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});