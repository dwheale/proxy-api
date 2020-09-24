const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// API
const images = require('./api/images')
app.use('/api/images', images)

app.use(express.static(path.join(__dirname, '../build')))
app.get('/', (req, res) => {
  console.log('GET received at \'/\': ', req.body)
  res.send('Personal use api')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})