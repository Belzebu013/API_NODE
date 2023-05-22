let app = require('./server.js');
const fs = require('fs');

let produtos = JSON.parse(fs.readFileSync('./data/produtos.json', 'utf8'));

app.get('/produtos', (request, response)=>{
    response.json(produtos);
});

app.get('/produtos/:id', (request, response)=>{
    let id = parseInt(response.params.id);
    let produto = produtos.find(p=>p.id === id);
    !produto ? response.status(404).json({ mensagem: 'Produto não encontrado' }) :  response.json(produto);
});

app.post('/produtos', (request, response)=>{
    let novoProduto = request.body;
    novoProduto.id = produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
    produtos.push(novoProduto);
    fs.writeFileSync('./data/produtos.json', JSON.stringify(produtos, null, 2));
    response.status(201).json(novoProduto);
});

app.listen(3000, ()=>{
    console.log('Servidor iniciado');
})