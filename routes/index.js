const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'look I have deployed my app!' }});
});

router.get('/test', (req, res, next) => {

	res.send({ success: true, data: { msg: 'test' }});
});


//här lägg sökvägar till
router.use('/user', require('./user'));

module.exports = router;
