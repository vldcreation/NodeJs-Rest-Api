require('dotenv').config()
let express = require('express')

let app = express()

let personRoute = require('./routes/person')
let akunRoute = require('./routes/akun')
let path = require('path')

let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use((req,res,next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`,req.body)
    next()
})
app.use(personRoute)
app.use(akunRoute)
app.use(express.static('public'))

// 404 Handling 
app.use((req,res,next)=>{
    res.status(404).send(`We Think you are lost!`)
})

// 500 internal server error handling
app.use((err,req,res,next)=>{
    console.error(err.stack)

    res.sendFile(path.join(__dirname,'../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.info(`Server has started on ${PORT}`))
