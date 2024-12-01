const http = require('http');
const fs = require('fs');
const url = require('url')

const port = 3000;

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    const fileName = q.pathname.substring(1)

    if (fileName.includes('html')) {
        if (fs.existsSync(fileName)) {
            fs.readFile(fileName, (err, data) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        } 
    } else {
        fs.readFile('error.html', (err, data) => {
            if (err) {
                // Caso a página de erro também não exista
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write('<h1>404 - Página não encontrada</h1>');
                return res.end();
            }
            // Exibe a página de erro personalizada
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
});

server.listen(port, () => {
    console.log('Servidor rodando na porta:', port);
});