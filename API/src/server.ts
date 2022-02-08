import 'dotenv/config';
import DirectorController from './arts/directorController';
import MovieController from './arts/movieController';

import errorMiddleware from './middlewares/exceptionMiddleware';

const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const bodyParser = require('body-parser'); 
// create application/json parser
const jsonParser = bodyParser.json();

const directorPath = '/director';
app.get(directorPath, DirectorController.getAllDirectors);
app.patch(`${directorPath}/:id`, jsonParser, DirectorController.modifyDirector)
app.delete(`${directorPath}/:id`, DirectorController.deleteDirector)
app.post(directorPath, jsonParser, DirectorController.createDirector);

const moviePath = '/movie';
app.get(moviePath, MovieController.getMovies);
app.get(`${moviePath}/:id`, MovieController.getMovieById);
app.patch(`${moviePath}/:id`, jsonParser, MovieController.modifyMovie)
app.delete(`${moviePath}/:id`, MovieController.deleteMovie)
app.post(moviePath, jsonParser, MovieController.createMovie);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`App listening on the port ${process.env.PORT}`);
});
