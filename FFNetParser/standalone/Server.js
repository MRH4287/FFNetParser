var sys = require("sys");
var url = require("url");
var http = require("http");
var https = require('https');
http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    sys.puts("Got request: " + path);
    var options = {
        host: 'www.fanfiction.net',
        port: 443,
        path: path,
        method: request.method // 'GET'
    };
    var uri = "https://www.fanfiction.net/" + request.url;
    https.get(uri, function (resp) {
        var data = [];
        resp.on('data', function (chunk) {
            data.push(chunk);
        });
        resp.on('end', function () {
            console.log("Got Response from Server for: ", uri);
            response.writeHeader(200, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            });
            response.write(data.join('').toString());
            response.end();
        });
    }).on("error", function (e) {
        response.writeHeader(500, {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        });
        response.write(e.message);
        sys.puts("Got error: " + e.message);
        response.end();
    });
}).listen(8080);
sys.puts("Server Running on http://localhost:8080");
