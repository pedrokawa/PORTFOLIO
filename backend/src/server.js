const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const { Resend } = require('resend');

const app = express();
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

// config email

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend OK!');
});

app.post('/api/contato', async(req, res) => {
    const { nome, telefone, email, mensagem } = req.body;

    if(!nome || !telefone || !email || !mensagem){
       return res.status(400).json({ 
        error: "Todos os campos (nome, email, mensagem) são obrigatórios." 
    }); 
    }

    try{
        const novoLead = await prisma.lead.create({
            data: {
                nome,
                telefone, 
                email,
                mensagem
            }
        });

        const data = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'tecnologia@asfaltopav.com.br',
                replyTo: email,
                subject: `Novo contato de ${nome}, via portfólio.`,
                html: `<p>Novo contato de <strong>${nome}<strong>!</p>
                <p>${mensagem}</p>
                <p>Dados para contato.</p>
                <p>Telefone: ${telefone}</p>
                <p>Email: ${email}</p>`
        })

        res.status(201).json(novoLead);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "erro ao processar"});
    }
});

if (process.env.NODE_ENV !== 'production'){
    app.listen(3000, () => console.log('Servidor rodando  na porta 3000'));
}

module.exports = app;

// regrista novo abastecimento
app.post('/api/abastecimento', async (req, res) => {
    const { placa, marca, modelo, km, operador, litros, preco, total, posto, foto} = req.body;

     if (!placa || !km || !operador || !litros || !preco || !posto) {
    return res.status(400).json({
      error: 'Campos obrigatórios: placa, km, operador, litros, preco, posto.'
    });
  }

  try {
    const novoAbastecimento = await prisma.abastecimento.create({
        data: {
            placa, 
            marca: marca || null,
            modelo: modelo || null,
            km, 
            operador,
            litros: parseFloat(litros),
            preco: parseFloat(preco),
            total: parseFloat(total),
            posto,
            foto: foto || null,
        }
    });
    res.status(201).json(novoAbastecimento);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao regristrar abastecimento.'});
  }
});

//lista abastecimentos

app.get('/api/abastecimento', async (req, res) => {
    try {
        const abastecimentos = await prisma.abastecimento.findMany({
            orderBY: { createdAt: 'desc'}
        });
        res.json(abastecimentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar abastecimentos.'});
    }
})