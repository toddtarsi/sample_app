"use strict;"

// First we'll declare our modules that we're using
var _ = require('underscore'),
util = require('util'),
http = require('http'),
fs = require('fs');

// Next, we save our credentials to authorize server interactions
var app_secrets = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
var app_ids = '0000000000000';

// This is a helper file to make api calls easier
// To download it, follow the url at the bottom of the page.
var api_ops = require('./api_ops')(app_ids, app_secrets);

//This is where we begin serving the urls
var server = http.createServer(function (request, response) {
  var filePath = './Interface' + request.url;

  //Url aliasing to get to our apps main html page 
  //(LockerDome opens this page as the iframe)
  if (filePath === './Interface/app_ui') 
    filePath = './Interface/index.html';

  //Post requests usually are usually performing api calls
  if (req.method == 'POST') {

    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      var reqData = JSON.parse(body);

      //Any time an api call succeeds, pass the confirmation message down
      function good(message){
        response.writeHead(200); 
        response.end(message); 
      }

      //Any time an api call fails, we have our app server log it
      function bad(message){ 
        response.writeHead(200); 
        response.end(message); 
        console.log(message); 
      }

      //Use the api_ops function to make api calls and handle responses
      api_ops[reqData.action](reqData, goodfetch, bad);
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('post received');
  } else {
    //Routing static html, css, and js for app
    var extname = path.extname(filePath);
    var contentType = {
      '.js':'text/javascript',
      '.css':'text/css',
      '.png':'image/png',
      '.json':'application/json'
    }[extname] || 'text/html';
    fs.exists(filePath, function(exists) {
	    if (exists) {
		    fs.readFile(filePath, function(error, content) {
			    if (error) {
				    response.writeHead(404);
				    response.end('Error 404: File not found');
			    } else {
				    response.writeHead(200, { 'Content-Type': contentType });
				    response.end(content, 'utf-8');
			    }
		    });
	    }
    });
}).listen(2000);
