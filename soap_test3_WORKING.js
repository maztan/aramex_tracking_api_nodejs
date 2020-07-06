//var http = require('follow-redirects').http;
const http = require('http');
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'ws.aramex.net',
  'path': '/shippingapi/tracking/service_1_0.svc',
  'headers': {
    'Content-Type': 'text/xml; charset=utf-8',
    'SOAPAction': 'http://ws.aramex.net/ShippingAPI/v1/Service_1_0/TrackShipments',
    'Accept-Encoding': 'gzip, deflate',
    //'Expect': '100-continue'
  },
  'maxRedirects': 20
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString('utf-8'));
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData =  "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\"><s:Body><ShipmentTrackingRequest xmlns=\"http://ws.aramex.net/ShippingAPI/v1/\"><ClientInfo xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><UserName>testingapi@aramex.com</UserName><Password>R123456789$r</Password><Version>v1.0</Version><AccountNumber>20016</AccountNumber><AccountPin>331421</AccountPin><AccountEntity>AMM</AccountEntity><AccountCountryCode>JO</AccountCountryCode></ClientInfo><Transaction xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><Reference1>ref1</Reference1><Reference2>ref1</Reference2><Reference3>ref1</Reference3><Reference4>ref1</Reference4><Reference5>ref1</Reference5></Transaction><Shipments xmlns:a=\"http://schemas.microsoft.com/2003/10/Serialization/Arrays\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><a:string>41496248135</a:string></Shipments><GetLastTrackingUpdateOnly>true</GetLastTrackingUpdateOnly></ShipmentTrackingRequest></s:Body></s:Envelope>";

req.write(postData);

req.end();