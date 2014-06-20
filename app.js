var express = require('express');


var app = express();

// Console logging for server:
app.use(express.logger());
app.use(express.bodyParser());

// Looks for static content under the current directory + /public:
app.use(express.static(__dirname + '/public'));

// This is a fake API call handler used in the client-code example
app.get('/api/data', function(req, resp) {
    var data = {
        firstParameter: 'Hello World',
        anotherParameter: new Date()
    }
    resp.send(200, data);
});

var http = require('request');



app.post('/caller', function(req,res){


    var url= 'https://citrix.sf-api.com/sf/v3/Items?$expand=Children';
    var header=req.param('header');


    http.get({
        url: url,
        headers: header
    },function(err,response,body){
        if(err){
            res.send(500,err);
            return;
        }
        res.send(200,body);
    })


});
app.post('/download', function(req,res){

    var id=req.param('id');
    var header=req.param('header');
    var url= 'https://citrix.sf-api.com/sf/v3/Items('+id+')/Download?redirect=false';

    http.get({
        url: url,
        headers: header
    },function(err,response,body){
        if(err){
            res.send(500,err);
            return;
        }
        res.send(200,body);
    })


});




app.post('/login', function (req, res){
    var username = req.param('username');
    var password = req.param('password');

    var clientid='2jeZKpQDmDn5t8GuPvSR7voDzmmoBF0d';
    var ClientSecret= "g4qRqoGmWRVlYMPtYskEO6MqscJWapVckDbZvz8oQ9Rie7YN";

    var url='https://citrix.sharefile.com/oauth/token?grant_type=password&client_id='+clientid+'&client_secret='+ClientSecret+'&username='+username+'&password='+password;

    http.get(url, function(err, response, body) {
        if (err) {
            res.send(500, err);
            return;
        }

        res.send(200, body);
    })


});



var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('public/server.key'),
    cert: fs.readFileSync('public/server.crt'),
    ca: fs.readFileSync('public/server.crt')
};

https.createServer(options, app).listen(443);
console.log('started at https://sarimz.com');