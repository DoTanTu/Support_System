var express = require('express');
var InsertControllers = require('../controllers/insertControllers');
var router = express.Router();

const controllerInsert = new InsertControllers();
// Index page route
router.get('/', function(req, res) {
  res.render('home');
});

// About page route
router.post('/insert', async (req, res) => {
   await controllerInsert.insert(req, res);
});

router.post('/delete', async (req, res) => {
    await controllerInsert.delete(req, res);
});

module.exports = router;
