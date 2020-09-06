const express = require('express');
const app = express();

// This is for the technical test. In a prod environment configuration should be different
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);
app.use(require('./controllers'));

app.listen(8000, () => {
    console.log('Listening on port 8000');
});