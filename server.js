const express = require('express')
const app = express()
const port = 3000

app.get('/', function(req, res) {
	res.send('Welcome to the smart thermostat!');
	//res.sendFile('www/' + req.params.file);
});

app.get('*.png', function(req, res) {
	
	res.sendFile('www/' + req.params.file);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))