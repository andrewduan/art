import NotFoundException from '../exceptions/NotFoundException';
import { Request, Response, NextFunction } from 'express';
import movieModel from './movieModel';
import Movie from './movieInteface';
import { source } from '../constants';
import { BaseController } from './baseController';

class MovieController extends BaseController {

  constructor(){
    super();
  }

  public async getMovies(request: Request, response: Response, next: NextFunction) {
    const id = request.query.directorId;
    let movies;
    if (id){
      movies = await movieModel.find({'directorId': id});
    } else {
      movies = await movieModel.find();
    }
    if (movies) {
      response.send(movies);
    } else {
      next(new NotFoundException(id, source.Movie));
    }
  }

  public async getMovieById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const movie = await movieModel.findOne({'id': id});
    if (movie) {
      response.send(movie);
    } else {
      next(new NotFoundException(`${id}`, source.Movie));
    }
  }

  public async modifyMovie(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const movieData: Movie = request.body;
    const movie = await movieModel.findOne({'id': id});
    if (movie) {
      await movieModel.updateOne({'id': id}, { $set: {...movieData}});
      response.send(movieData);
    } else {
      next(new NotFoundException(`${id}`, source.Movie));
    }
  }

  public async createMovie(request: Request, response: Response) {
    
    console.log('movieData request passed in', request.body);
    const movieData: Movie = request.body;
    const savedMovie = await movieModel.create({...movieData});
    response.send(savedMovie);
  }

  public async deleteMovie(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const successResponse = await movieModel.deleteOne({'id': id});
    if (successResponse) {
      const movie = await movieModel.find();
      response.send(movie);
    } else {
      next(new NotFoundException(`${id}`, source.Movie));
    }
  }
}

export default new MovieController();