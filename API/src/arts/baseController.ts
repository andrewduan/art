import { connectToTheDatabase } from '../utils';

export class BaseController {

  constructor(){
    connectToTheDatabase();
  }
}