import HttpException from "./httpException";
 
class NotFoundException extends HttpException {
  constructor(id: string, source: string) {
    super(404, `${source} with id ${id} not found`);
  }
}
 
export default NotFoundException;