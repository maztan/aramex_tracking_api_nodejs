const request = require('request');
const http = require('http');
const net = require('net');

/*const socket = net.createConnection(80, '127.0.0.1', () => {
    socket.write('GET http://127.0.0.1:8080/ HTTP', () => {
     socket.destroy();
     resolve();
    });
});*/

/*http.get("http://ws.aramex.net/shippingapi/tracking/service_1_0.svc", 
        (res) => {
          console.log(res)  
        })*/

const agent = new http.Agent({ keepAlive: true });
let options = {}
options.agent = agent;
options.host = 'ws.aramex.net'
options.path = '/shippingapi/tracking/service_1_0.svc'

let req = http.request(options, (res) => {
    var str = '';

    //another chunk of data has been received, so append it to `str`
    res.on('data', function (chunk) {
        str += chunk.toString('utf-8');
    });

    res.on('error', function (chunk) {
        str += chunk;
    });

    //the whole response has been received, so we just print it out here
    res.on('end', function () {
        console.log(str);
    });
});

let payload1 = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><ShipmentTrackingRequestxmlns="http://ws.aramex.net/ShippingAPI/v1/"><ClientInfo xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><UserName>testingapi@aramex.com</UserName><Password>R123456789$r</Password><Version>v1.0</Version><AccountNumber>20016</AccountNumber><AccountPin>331421</AccountPin><AccountEntity>AMM</AccountEntity><AccountCountryCode>JO</AccountCountryCode></ClientInfo><Transaction xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><Reference1>ref1</Reference1><Reference2>ref1</Reference2><Reference3>ref1</Reference3><Reference4>ref1</Reference4><Reference5>ref1</Reference5></Transaction><Shipments xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><a:string>41496248135</a:string></Shipments><GetLastTrackingUpdateOnly>true</GetLastTrackingUpdateOnly></ShipmentTrackingRequest></s:Body></s:Envelope>'
req.write(payload1)
req.end()

console.log(request)  