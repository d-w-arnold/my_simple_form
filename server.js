const fs = require('fs');
const http = require('http');
const qs = require('querystring');

const server = http.createServer(function (request, response) {
    if (request.method === 'POST') {
        let body = '';
        request.on('data', function (data) {
            body += data;
            // Too much POST data will kill the connection.
            if (body.length > 1e6) { // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                request.connection.destroy();
            }
        });
        request.on('end', function () {
            const post = qs.parse(body);
            console.log(post['oneField']);
        });
    }
    fs.readFile('myForm.html', function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        return response.end();
    });
});

server.listen(8080);
