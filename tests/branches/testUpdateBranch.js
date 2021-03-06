const authenticatiion = require('../../auth/authenticate.js');

const async = require('async');

var testUpdateBranch = function () {
    async.waterfall([

        // authetication
        function (callback) {
            authenticatiion.authenticateClient(function (err, client) {
                callback(err, client)
            })
        },
        // GET one record
        function (client, callback) {
            var extBranchId = 'EXT002311';
            client
                .invokeApi(null, `/branches/${extBranchId}`, 'GET')
                .then(function (result) {
                    if (result.data) {
                        callback(null, client, result.data);
                    } else {
                        callback('NO records')
                    }

                })
                .catch(function (error) {
                    let err = {
                        status: error.response.status,
                        statusText: error.response.statusText,
                        data: error.response.data
                    }
                    callback(err, null, null);
                })

        },

        // UPDATE one record
        function (client, getData, callback) {
            getData.communicationAddress.cityOrVillage = "Bavdhan"
            client
                .invokeApi(null, `/branches/${getData.extBranchId}`, 'PUT', {}, getData)
                .then(function (result) {
                    if (result.data) {
                        callback(null, result.data);
                    } else {
                        callback('NO records')
                    }

                })
                .catch(function (error) {
                    let err = {
                        status: error.response.status,
                        statusText: error.response.statusText,
                        data: error.response.data
                    }
                    callback(err, null);
                })
        }
    ], function (err, result) {
        if (err) {
            console.log('err:', err)

        } else {
            console.log('', result);
        }
    });
}

testUpdateBranch();