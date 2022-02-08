const mongoose = require('mongoose');


const { Schema } = mongoose; 
const directorSchema = new Schema({
  id: String,
  name: String,
  age: {type: Number, required: false, default: null},
  isActive: Boolean
});
 
const directorModel = mongoose.model('Directors', directorSchema);
 
export default directorModel;