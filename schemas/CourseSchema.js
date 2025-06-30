const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  thumbnail: String,
  videos: [
    {
      videoTitle: String,
      videoThumbnail: String,
      videoUrl: String
    }
  ]
})

const CourseModel = mongoose.model('Course', courseSchema)

module.exports = CourseModel
