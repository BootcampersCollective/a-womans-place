const express = require('express');
const bodyParser = require('body-parser');
const butter = require('./butter-cms.controller');
const request = require('request');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static('public'));

app.get('/cmsdata', butter.getContent);

require('./sendGrid')(app);

app.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}`);
}).on('error', (err) => {
    if(err.errno === 'EADDRINUSE') {
        console.log(`port ${PORT} busy`);
    } else {
        console.log('Server error:', err);
    }
});
