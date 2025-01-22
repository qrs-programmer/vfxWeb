const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => {
    const scrollTo = req.query.scrollTo || null;
    res.render('index', { scrollTo, page: 'index' });
});

app.get('/works', (req, res) => {
    res.render('works', { page: 'works' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
