const express = require('express');
const methodOverride = require('method-override');
let layouts = require('express-ejs-layouts')
const db = require('./models')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));
app.use(layouts)

// WRITE YOUR ROUTES HERE /////////////////////

app.get('/', (req, res) => {
    db.widget.findAll()
      .then(widgets => {
        
        res.render('home', { widgets })
        
      })
      .catch(err => {
        console.log(err)
        res.send('Error')
      })
})


app.post('/', (req, res) => {
    db.widget.create({
        description: req.body.description,
        quantity: req.body.quantity
    })
    .then(() => {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})


app.delete('/', (req, res) => {
    db.widget.destroy({
        where: { id: req.body.id }
    })
    .then(() => {
        res.redirect('/')
    })
    .catch(err => {
        console.log('Error in delete route', err)
        res.send('Error')
    })
})


// Create a wildcard (catch-all)
app.get('*', (req, res) => {
    res.render('error')
})

// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
