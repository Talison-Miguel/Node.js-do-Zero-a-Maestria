const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {
    const urlInfor = require('url').parse(req.url, true);
    const name = urlInfor.query.name;

    if (!name) {
        // Leitura do arquivo HTML
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Erro ao carregar a página!');
                return res.end();
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    } else {

        const nameNewLine = name + ',\r\n'
        // Escrita do nome no arquivo
        fs.appendFile("arquivo.txt", nameNewLine, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Erro ao salvar o arquivo!');
                return res.end();
            }
            res.writeHead(302, { Location: '/' });
            res.end();
        });
    }
});

server.listen(port, () => {
    console.log('Servidor rodando na porta:', port);
});