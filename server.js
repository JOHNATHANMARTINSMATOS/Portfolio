require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Middleware para capturar os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do Nodemailer usando suas credenciais
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Usando o Gmail
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Rota para processar o envio do formulário
app.post('/send', (req, res) => {
    const mailOptions = {
        from: req.body.email,  // O e-mail do remetente
        to: process.env.EMAIL_USER,  // Seu e-mail
        subject: `Mensagem de: ${req.body.nome}`,  // Assunto
        text: `Nome: ${req.body.nome}\nE-mail: ${req.body.email}\nMensagem: ${req.body.mensagem}`  // Corpo do e-mail
    };

    // Enviar o e-mail com o Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o e-mail:', error);  // Registrar o erro no console
            return res.status(500).send('Erro ao enviar a mensagem. Verifique o console para mais detalhes.');
        }
        console.log('E-mail enviado:', info.response);  // Registrar a resposta no console
        res.status(200).send('Mensagem enviada com sucesso!');
    });
});

// Servir o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
