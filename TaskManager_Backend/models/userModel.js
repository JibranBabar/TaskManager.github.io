const mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

const Schema = mongoose.Schema;
const userSchema = new Schema({
    userId: String,
    name: String,
    email: String,
    pic: String,
});

userSchema.plugin(findOrCreate);
const Users = mongoose.model("user" , userSchema);
export default userModel;
