const express = require('express')
morgan = require('morgan')
const port = 3000
const app = express()

app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log('middleware');
    next()
})

app.use((req, res, next) => {
    console.log('middleware kedua');
    next()
})

app.use((req, res, next) => {
  // req.method = 'PUT'
  req.timeRequest = new Date()
  console.log(req.method, req.url);
  next()
})

// Middleware Authentivication
const auth = (req, res, next) => {
  const { password } = req.query
  if (password === 'youradmin') {
    next()
  }
  res.send('Masukkan Password Terlebih dahulu')
}

app.get('/admin', auth, function (req, res) {
  res.send('hello, admin!')
})

app.get('/', function (req, res) {
  console.log(req.timeRequest);
  res.send('hello, world!')
})

app.get('/home', function (req, res) {
    res.send('Homepage!')
  })
  
app.use((req, res) => {
  res.status(404).send("Page Not Found")
})

app.listen(port,() => {
    console.log(`Server is running https://localhost:${port}`);
})