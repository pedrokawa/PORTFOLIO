const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const { Resend } = require('resend');
const resend = new Resend('re_BwNg6Q8q_HMBMAVhq1aD3LKRpMfzQsH2z');

const app = express();
const prisma = new PrismaClient();

// config email

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend OK!');
});

app.post('/api/contato', async(req, res) => {
    const { nome, email, mensagem } = req.body;

    try{
        const novoLead = await prisma.lead.create({
            data: {
                nome, 
                email,
                mensagem
            }
        });

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'tecnologia@asfaltopav.com.br',
            replyTo: email,
            subject: `Novo contato via portfólio: ${nome}`,
            html: `<p>Novo contato de <strong>${nome}<strong>!</p>
            <p>${mensagem}</p>
            <p>Contato:${email}</p>`
        })

        console.log("resposta do resend", data);


        console.log("Email enviado com sucesso.");
        res.status(201).json(novoLead);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "erro ao salvar no banco de dados"});
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
})