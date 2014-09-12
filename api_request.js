var http = require('http');

module.exports = function (op, args, success, failure) {
  var options = {
    hostname: 'api.lockerdome.com',
    path: '/' + op,
    method: 'POST'
  };

  var data = new Buffer(0);

  var req = http.request(options, function(res) {
    res.on('data', function (chunk) {
      data = Buffer.concat([data, chunk]);
    });
    res.on('end', function(){
      try {
        var api_response = JSON.parse(data.toString('utf8'));
      } catch (ex) {
        return failure("JSON parse error: [" + ex +
          "] while parsing: [" + data.toString('utf8') + 
          "]", ex.stack);
      }
        return success(api_response);
    });
  });
  req.on('error', function(e) {
    return failure("Error on request to api: " + e.message);
  });
  req.write(JSON.stringify(args));
  req.end();
};
