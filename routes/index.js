const express = require('express');
const router = express.Router();

/* GET / */

// index http://localhost:3000/
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'look I have deployed my app again!' }});
});

//router.use('/example', require('./example'));
router.get('/test/:exampleId', (req, res, next) => {

	res.send({ success: true, data: { msg: 'du skickade in ' + req.params.exampleId }});
});




//laddar in andra filer men vet inte vilka. För http://localhost3000/users  ?
//router.use('/users', require('./users')); 

module.exports = router;
