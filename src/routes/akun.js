let AkunModel = require('../models/akun.models')

let express = require('express')

let router = express.Router()


//create a new akun
router.post('/akun',(req,res)=>{
    if(!req.body){
        return res.status(400).send('Request Body is missing!')
    }

    // let user = {
    //     name : 'firstname lastname',
    //     email : 'email@gmail.com'
    // }


    let model = new AkunModel(req.body)
    model.save()
    .then(doc =>{
        if(!doc || doc.length === 0){
            return res.status(500).send()
        }
        res.status(201).send(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })

    
})

//get all user
router.get('/akunList', (req, res) =>{
    AkunModel.find({}, (err, users) => {
      var userMap = {};
  
      users.forEach( (user) =>{
        userMap[user._id] = user;
      });
  
      res.send(userMap);  
    });
  });

//get user
router.get('/akun/:email',(req,res) => {
    if(!req.params.email){
        return res.status(400).send('Missing parameter : email!')
    }
    AkunModel.findOne({
        email : req.params.email
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.status(500).json(err)
    })
})

// CHeck login
router.post('/akun/login', (req,res) => {
    var post = req.body
    // res.json(req.body)
    if(!post){
        return res.status(400).send('Request Body is missing!')
    }

    AkunModel.findOne({
        email : post.email,
        password: post.password
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.status(500).json(err)
    })

})

//update
router.put('/akun',(req,res) => {
    if(!req.query.email){
        return res.status(400).send('Missing parameter : email!')
    }
    AkunModel.findOneAndUpdate({
        email : req.query.email
    },req.body,{
        new : true
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.status(500).json(err)
    })

})

//delete
router.delete('/akun',(req,res) => {
    if(!req.query.email){
        return res.status(400).send('Missing parameter : email!')
    }
    AkunModel.findOneAndRemove({
        email : req.query.email
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.status(500).json(err)
    })

})

module.exports = router