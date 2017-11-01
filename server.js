var express = require('express');
var bodyParser = require('body-parser');
var butter = require('./butter-cms.controller');
var request = require('request');
var PORT = process.env.PORT || 80;
var app = express();

app.use(express.static('public'));

app.get('/cmsdata', butter.getContent);

require('./sendGrid')(app);

app.listen(PORT, (err) =>{
  if (err){
    console.log('Server error:', err);
  } else {
    console.log(`Server up and running on port: ${PORT}`);
  }
});
