const mongoose = require('mongoose');


const { Schema } = mongoose; 
const movieSchema = new Schema({
  id: String,
  directorId: String,
  name: String,
  releaseOn: {type: Number, required: true, validate: /^(19|20)\d{2}$/}
});
 
const movieModel = mongoose.model('Movies', movieSchema);
 
export default movieModel;