const https = require('https');
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;

var options = {
    key: fs.readFileSync('privatekey.pem'),
    cert: fs.readFileSync('certificate.pem')
};

https.createServer(options, (req, res) => {


    const decoder = new StringDecoder('utf-8');
    let payload = '';

    req.on('data', (data) => {
        payload += decoder.write(data);
    });

    req.on('end', () => {
        payload += decoder.end();

        res.writeHead(200, {'Content-Type': 'application/json'})
        let responceData = {}//JSON.parse(payload);
        responceData.responce = "Echo response"
        res.end(JSON.stringify(responceData))
    })
}).listen(8000);