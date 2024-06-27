const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Rota para salvar nomes
app.post('/saveNames', (req, res) => {
    const names = req.body;
    fs.writeFileSync(path.join(__dirname, 'public', 'names.json'), JSON.stringify(names, null, 2));
    res.status(200).send('Nomes salvos com sucesso');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
