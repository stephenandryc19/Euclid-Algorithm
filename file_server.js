var express = require('express');
var fs = require('fs');
var app = express();
app.use(express.static('public'));
var port = process.env.PORT || 8000;
//setting up server parameters

app.listen(port, function(){
  console.log('Easy server listening for requests on port'+ port+'!');
});
//establishing server

app.get('/', function(request, response){
  response.writeHead(200, {'Content-Type': 'text/html'})
  var file = fs.readFileSync("index.html");
  response.write(file);
  response.send();
});
//links to the home page

app.get('/about', function(request, response){
  response.writeHead(200, {'Content-Type': 'text/html'})
  var file = fs.readFileSync("about.html");
  response.write(file);
  response.send();
});
//links to a page giving history and information about Euclid's algorithm

app.get('/animation', function(request, response){
  response.writeHead(200, {'Content-Type': 'text/html'})
  var file = fs.readFileSync("animation.html");
  response.write(file);
  response.send();
});
//links to the page animating the algorithm in a visual manner