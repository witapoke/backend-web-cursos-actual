const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const CourseModel=require("./schemas/CourseSchema")

app.use(express.json())
app.use(cors())

const connectDB = () => {
  mongoose
    .connect(
      'mongodb+srv://ignaciomanganaro22:Reformednacho90@expresssession.dkahp5l.mongodb.net/?retryWrites=true&w=majority&appName=ExpressSession'
    )
    .then(() => {
      app.listen('3000', () =>
        console.log('App listening to port 3000.DB CONNECTED SUCCESFULLY')
      )
    })
    .catch((e) => console.log(e))
}

app.get('/', (req, res) => {
  res.send('Hola mi gente como andan')
})

//get cursos
app.get('/api/courses', async (req, res) => {
  const courses = await CourseModel.find({})
  res.status(200).json(courses)
})

//create cursos
app.post('/api/courses', async (req, res) => {
  const { body } = req
  const { title, price, description } = body
  const cursoExiste = await CourseModel.findOne({ title })

  try {
    if (cursoExiste || title === '' || price === '' || description === '') {
      return res.status(500).json({ message: 'All fields must be completed' })
    } else {
      const newCourse = new CourseModel({ title, price, description })
      const savedCourse = await newCourse.save()
      res
        .status(201)
        .json({ data: newCourse, message: 'Course created succesfully' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, error })
  }
})

connectDB()

module.exports = app
