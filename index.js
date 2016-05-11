'use strict'
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let main = require('./main');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(main.handleInvalidJson);
app.disable('x-powered-by');

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.post('/', (request, response) => {
    main.processRequest(request.body)
        .then((result) => response.json(result))
        .catch((error) => {
        	response.status(400);
        	response.json(error);
        });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
