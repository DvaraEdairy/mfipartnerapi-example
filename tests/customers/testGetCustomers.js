const authenticatiion = require('../../auth/authenticate.js');

var testGetCustomers = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(JSON.stringify(body));
                }
            }
            getCustomers(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

var getCustomers = function (client, callback) {
    client
        .invokeApi(null, '/customers', 'GET')
        .then(function (result) {
            console.log(result.data)
        })
        .catch(function (result) {
            if (result.response) {
                console.dir({
                    status: result.response.status,
                    statusText: result.response.statusText,
                    data: result.response.data
                });
            } else {
                console.log(result.message);
            }
        });
}

testGetCustomers();