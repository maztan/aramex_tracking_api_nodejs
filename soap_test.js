const soap = require('soap')
const path = require('path')

let args =  [{
        'ClientInfo': {
            'UserName': 'testingapi@aramex.com',
            'Password': 'R123456789$r',
            'Version': 'v1.0',
            'AccountNumber': '20016',
            'AccountPin': '331421',
            'AccountEntity': 'AMM',
            'AccountCountryCode': 'JO'      
        },
        "Transaction": {
            "Reference1": "001",
            "Reference2": "002",
            "Reference3": "003",
            "Reference4": "004",
            "Reference5": "005"
        },
        "Shipments": ['41496248135'],
        //"GetLastTrackingUpdateOnly": false
    }];

let url = path.join( __dirname, './resources/shipments-tracking-api-wsdl.wsdl')

/*var wsdlOptions = {
    "overrideRootElement": {
      "namespace": "myns",
      "xmlnsAttributes": [{
        "name": "xmlns:myns",
        "value": "http://ws.aramex.net/ShippingAPI/v1/"
      }]
    }
  };*/

soap.createClient(url, function(err, client) {
    client.TrackShipments(args, function(err, result, body) {
        console.log(result.body)
    })
});