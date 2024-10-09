const express = require('express');
const app = express();
const { default: mongoose } = require('mongoose');
const Usuario = require("./models/Usuario");
const Genero = require("./models/Genero");
const Filme = require("./models/Filme");

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Primeira nota
app.get('/', (reg, res) => {
    res.json({ message: 'Bem-vindo ao meu servidor' })
})


//Create
app.post('/usuario', async (req, res) => {
    const { nome, idade, dataNascimento, cpf, valorAssinatura, dataAssinatura, email, senha } = req.body

    const usuario = {
        nome,
        idade,
        dataNascimento,
        cpf,
        valorAssinatura,
        dataAssinatura,
        email,
        senha
    }

    try {
        await Usuario.create(usuario)
        res.status(200).json({ message: "Pessoa inserida no sistema" })
    } catch (error) {
        res.status(500).json({ erro: error })
    }

})
app.post('/filme', async (req, res) => {
    const { nomeFilme, anoLancamento, pais } = req.body

    const usuario = {
        nomeFilme,
        anoLancamento,
        pais
    }

    try {
        await Filme.create(fime)
        res.status(200).json({ message: "Pessoa inserida no sistema" })
    } catch (error) {
        res.status(500).json({ erro: error })
    }

})
app.post('/genero', async (req, res) => {
    const { descricao, nomeGenero } = req.body

    const genero = {
        descricao,
        nomeGenero,
    }

    try {
        await Genero.create( genero)
        res.status(200).json({ message: "Pessoa inserida no sistema" })
    } catch (error) {
        res.status(500).json({ erro: error })
    }

})

//Read
app.get("/usuario", async (req, res) => {
    try {
        const assinante = await Usuario.find()
        res.status(200).json({ assinante })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//Read by id
app.get("/usuario/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const assinante = await Usuario.findOne({ _id: id })

        if (!assinante) {
            res.status(422).json({ message: "Usuário não encontrado!" })
            return
        }

        res.status(200).json(assinante)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//Update
app.patch("/usuario/:id", async (req, res) => {
    const id = req.params.id

    const { nome, idade, dataNascimento, cpf, valorAssinatura, dataAssinatura, email, senha  } = req.body

    const person = {
        nome,
        idade,
        dataNascimento,
        cpf,
        valorAssinatura,
        dataAssinatura,
        email,
        senha
    }

    try {
        const updateUsuario = await Usuario.updateOne({ _id: id }, usuario)

        if (updateUsuario.matchedCount === 0) {
            res.status(422).json({ message: "Usuário não encontrado!" })
            return
        }
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//Delete
app.delete("/Usuario/:id", async (req, res) => {
    const id = req.params.id

    const assinante = await Person.findOne({ _id: id })

    if (!assinante) {
        res.status(422).json({ message: "Usuário não encontrado!" })
        return
    }

    try {
        await Usuario.deleteOne({ _id: id })
        res.status(200).json({ message: "Usuário Removido com sucesso !" })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

mongoose.connect('mongodb://localhost:27017').then(() => {
    console.log('uhuul, conctamos')
    app.listen(3000)
}).catch((err) => {
    console.log('Erro ao conectar ao banco de dados: ' + err)
})