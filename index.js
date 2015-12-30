'use strict'

var jsonapischema = require('./jsonapi-schema.json');
var validate = require('jsonschema').validate;
console.log('all locked and loaded. now pulling data...');

var http = require('http-as-promised');
var get_url = 'https://hapi-harvester-sample-dclucas.c9users.io/products';

function validateSchema(payload, schema) {
    console.log(validate(payload, schema));
}

http(get_url)
    .spread((res, body) => {
        console.log('got answer');
        console.log(body);
        // since there is a schema error in the lib, using a dummy payload to move forward
        //validateSchema(body, jsonapischema);
        var payload = require('./samplepayload.json');
        validateSchema(payload, jsonapischema);
    })
    .catch((err) => {
        console.log(err);
    });
