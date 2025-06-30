const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  pictureUrl: String,
  email: String,
  googleId: String
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
