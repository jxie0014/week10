const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();
const path = require('path');

app.use("/", express.static(path.join(__dirname, "dist/week10")));

app.listen(8080);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:id/movies', actors.deleteOneAndMovies);
app.delete('/actors/:actorid/:movieid', actors.deleteMovie);
app.put('/actors', actors.updateActor);


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.post('/moviesaddactor/:actorid/:movieid', movies.addActor);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/:movieid/:actorid', movies.deleteActor);
app.get('/movies/:year2/:year1', movies.getMovieByYear);
app.delete('/moviesbyyear/:year/', movies.deleteMoviesByYear);

// {
// 	"name":"Name",
// 	"bYear":2019,
// 	"movies":[]
// }

// {
// 	"title":"Title",
// 	"year":2019,
// 	"actors":[]
// }

