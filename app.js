"use strict;"

// First we'll declare our modules that we're using
var http = require('http'),
path = require('path'),
fs = require('fs');

// Next, we save our credentials to authorize server interactions
var credentials = require('./.app_credentials')
var app_secrets = credentials.secret;
var app_ids = credentials.id;

// This is a helper file to make api calls easier
var api_ops = require('./api_ops')(app_ids, app_secrets);

//This is where we begin serving the urls
var server = http.createServer(function (req, res) {
  var url = req.url.split('?')[0];
  var filePath = './public' + url;
  //Url aliasing to get to our apps main html page 
  //(LockerDome opens this page as the iframe)
  if (filePath === './public/app_ui') filePath = './public/index.html';

  //Post requests usually are performing api calls
  if (req.method == 'POST') {

    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      var reqData = JSON.parse(body);

      //Any time an api call succeeds, pass the confirmation message down
      function good(message){
        console.log(message); 
        res.writeHead(200); 
        res.end(message); 
      }

      //Any time an api call fails, we have our app server log it
      function bad(message){ 
        console.log(message); 
        res.writeHead(200); 
        res.end(message); 
      }

      //Use the api_ops function to make api calls and handle responses
      api_ops[reqData.action](reqData, good, bad);
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
				    res.writeHead(404);
				    res.end('Error 404: File not found');
			    } else {
				    res.writeHead(200, { 'Content-Type': contentType });
				    res.end(content, 'utf-8');
			    }
		    });
	    }
    });
  }
}).listen(80);
