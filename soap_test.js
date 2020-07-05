const soap = require('soap')
const path = require('path')

let url = path.join( __dirname, './resources/shipments-tracking-api-wsdl.wsdl')
soap.createClient(url, function(err, client) {
    client.MyFunction(args, function(err, result) {
        console.log(result);
    });
});