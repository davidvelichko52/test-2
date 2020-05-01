const express = require('express');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////

app.get('/', (req, res) => {
      res.render('home');
})

// Create a wildcard (catch-all)
app.get('*', (req, res) => {
    res.render('error')
})

// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
