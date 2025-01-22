const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => {
    const scrollTo = req.query.scrollTo || null;
    console.log(scrollTo);
    res.render('index', { scrollTo, page: 'index' });
});

app.get('/works', (req, res) => {
    res.render('works', { page: 'works' });
});

// Fetch Video Data
app.get('/videos', (req, res) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, 'data', 'video_data.csv'))
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        res.json(results); // Send parsed data as json to client
    });

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
