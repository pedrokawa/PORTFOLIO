const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

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

        console.log("Novo lead", novoLead);
        res.status(201).json(novoLead);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "erro ao salvar no banco de dados"});
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
})