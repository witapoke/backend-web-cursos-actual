const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const CourseModel = require('./schemas/CourseSchema')
const PORT = 3000
const session = require('express-session')
const passport = require('passport')

app.use(express.json())
app.use(cors())
app.use(
  session({
    secret: 'clavesecreta',
    resave: true,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())

const connectDB = () => {
  mongoose
    .connect(
      'mongodb+srv://ignaciomanganaro22:Reformednacho90@expresssession.dkahp5l.mongodb.net/?retryWrites=true&w=majority&appName=ExpressSession'
    )
    .then(() => {
      app.listen(PORT || 4000, () =>
        console.log(
          'App listening to port ' + PORT + ' .DB CONNECTED SUCCESFULLY'
        )
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
