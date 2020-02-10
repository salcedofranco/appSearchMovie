const express = require('express');
const app = express();
const path = require('path');
const request = require('request');

app.set('views' , path.join(__dirname, 'views'));
app.set('view engine' , 'ejs');

app.use(express.static('public'));

app.get('/results', (req,res) =>{

    let query = req.query.search;

    request('https://api.themoviedb.org/3/search/movie?api_key=6e1cfaa7b1468f08c920891a09dd74f3&query='+query, (error, response, body) =>{
        if(error){
            console.log(error);
        }
        let data = JSON.parse(body);
        res.render('movies', {data:data, searchQuery:query});
    });

})

app.get('/' , (req, res) =>{
    res.render('search');
});

app.get('/search' , (req, res) =>{
    res.render('search');
});


// PUERTO LOCALHOST 3000
app.listen(3000, () =>{
    console.log('Server escuchando en puerto 3000.');

});//



//ESTE PUERTO ES PARA HEROKU
//app.listen(process.env.PORT, () => {
   // console.log("Puerto 3000 funcionando!");
//});