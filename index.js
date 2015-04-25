var http = require('http');
var fs = require('fs');

var images = [
    'bottom-left.jpg',
    'bottom-right.jpg',
    'bottom-wide.jpg',
    'buttons.jpg',
    'logo.jpg',
    'top-right.jpg'
];


http.createServer(function (req, res) {
    var file;
    
    if (req.url === '/') {
        file = 'index.html'
        res.writeHead(200, {'Content-Type': 'text/html'});

        fs.readFile(file, function(err, data) {
            res.end(data); 
        });
    } else if (req.url.substr(-4,4) === '.jpg') {
        file = req.url.substr(1);
        if (images.indexOf(file) === -1 ) {
            send404(res);
        }

        fs.exists(file, function() {
            res.writeHead(200, {'Content-Type': 'image/jpeg'});

            fs.readFile(file, function(err, data) {
                res.end(data); 
            });
        });
    } else {
        send404(res);
    }

}).listen(1337, '127.0.0.1');

function send404(res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 not found');    
}

console.log('Server running at http://127.0.0.1:1337/');

