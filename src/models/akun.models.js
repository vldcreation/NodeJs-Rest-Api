let mongoose = require('mongoose')
let autoIncrement = require('mongoose-auto-increment')
const server = 'localhost'
const database = 'userservice'

mongoose.connect(`${process.env.MONGOSE_URI}/${database}`,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{ console.log('connection to database established') })
.catch(err=>{ console.log(`db error ${err.message}`); process.exit(-1) })
autoIncrement.initialize(mongoose.connection)

let UserSchema = new mongoose.Schema({
    name : String,
    email: {
        type : String,
        require : true,
        unique : true
    },
    username : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
        select: false
    },
    create_At :{
        type : String,
        default : new Date().toString()
    }
})
UserSchema.plugin(autoIncrement.plugin, { model: 'Akun2', field: '_id' })

// name : String,
//     _id :{
//         type : Number,
//         autoIncrement : true
//     },
//     email: {
//         type : String,
//         require : true,
//         unique : true
//     },
//     username : {
//         type : String,
//         require : true,
//         unique : true
//     },
//     password : {
//         type : String,
//         require : true
//     }

module.exports = mongoose.model('Akun2',UserSchema)