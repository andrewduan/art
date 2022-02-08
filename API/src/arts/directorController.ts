import NotFoundException from '../exceptions/NotFoundException';
import { Request, Response, NextFunction } from 'express';
import directorModel from './directorModel';
import Director from './directorInteface';
import { BaseController } from './baseController';
import { source } from '../constants';

class DirectorController extends BaseController {

  constructor(){
    super();
  }

  public async getAllDirectors(request: Request, response: Response) {
    const directors = await directorModel.find();
    response.send(directors);
  }

  public async getDirectorById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const director = await directorModel.findOne({'id': id});
    if (director) {
      response.send(director);
    } else {
      next(new NotFoundException(id, source.Director));
    }
  }

  public async modifyDirector(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const directorData: Director = request.body;
    const director = await directorModel.findOne({'id': id});
    if (director) {
      await directorModel.updateOne({'id': id}, { $set: {...directorData}});
      response.send(directorData);
    } else {
      next(new NotFoundException(`${id}`, source.Director));
    }
  }

  public async createDirector(request: Request, response: Response) {
    
    console.log('directorData request passed in', request.body);
    const directorData: Director = request.body;
    const savedDirector = await directorModel.create({...directorData});
    response.send(savedDirector);
  }

  public async deleteDirector(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const successResponse = await directorModel.deleteOne({'id': id});
    if (successResponse) {
      const director = await directorModel.find();
      response.send(director);
    } else {
      next(new NotFoundException(`${id}`, source.Director));
    }
  }
}

export default new DirectorController();