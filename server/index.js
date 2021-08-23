const express = require('express')
const connectDb = require('./config/db');
const bodyParser = require('body-parser')
app = express()

// bodyParser json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// connect DB

connectDb()


// define router

app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))
app.use('/api/project', require('./routes/project'))

// main run
app.get('/', (req, res) => res.send('hello world'));

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server run on port ${PORT}`))