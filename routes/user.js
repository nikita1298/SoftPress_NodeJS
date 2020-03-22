const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/model_user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Book=require('../models/model_book');
const Author=require('../models/model_author');
const  Bookcat=require('../models/model_book-category');

router.get('/', (req, res, next) => {
    var a = "NIKITA"
    console.log(a.toLowerCase());
    res.status(200).json({
        message: 'Handling get user request'
    })
});

router.post('/mailcheck', (req, res, next) => {
    User.find({
        email: req.body.email,

    }).exec().then(user_email => {
        var mes;
        if (user_email.length >= 1) {
            mes = 'y'
        }
        else {
            mes = 'n';
        }
        return res.status(200).json({
            message: mes
        });
    })
})


router.post('/mobilecheck', (req, res, next) => {
    User.find({
        mobile: req.body.mobile,

    }).exec().then(user_mob => {
        var mos;
        if (user_mob.length >= 1) {
            mos = 'y'
        }
        else {
            mos = 'n';
        }

        return res.status(200).json({
            message: mos
        });


    })
})


router.post('/signup', (req, res, next) => {

    User.find({
        email: req.body.email,

    }).exec().then(users => {
        if (users.length >= 1) {
            return res.status(409).json({
                message: 'Mail Exist'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                    })
                    console.log('err' + err)

                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name.toLowerCase(),
                        email: req.body.email,
                        mobile: req.body.mobile,
                        password: hash

                    });
                    user.save()
                        .then(result => {
                            console.log(result)
                            res.status(201).json({

                                message: "user Creates",
                                data: result

                            })
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            })

                        });
                }
            });
        }
    }).catch()


});
router.post('/login', function (req, res, next) {
    User.findOne({
        email: req.body.email
    })
        .exec()
        .then(users => {
            console.log(users)
            if (users == null) {
                //  if (users.length < 1) {
                return res.status(404).json({
                    message: 'Auth Failed'
                })
            }//}
            bcrypt.compare(req.body.password, users.password, (err, result) => {
                if (err) {
                    return res.status(404).json({
                        message: 'Auth Faile d '
                    })
                }
                if (result) {
                    const token = jwt.sign({
                            email: users.email,
                            userId: users._id
                        },
                        "Secreate",
                        {
                            expiresIn: "1h"
                        }
                    );
                    req.session.userid = users._id;
                    req.session.email = users.email;
                    req.session.name=users.name;

                    return res.status(200).json({
                        message: 'Auth Sucessfull',
                        email: users.email,
                        data: users,
                        token: token
                    })
                }
                res.status(404).json({
                    message: 'Auth Failed '
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })


});
var ath=require('../models/model_author');
router.post('/add_auth',function (req,res,next) {
    const ar = new ath({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.booka.toLowerCase()
    });
    ar.save().then(resul=>{
        console.log("artisavesd");
        return  res.status(200).json({
            data:resul
        })
       // res.render('clientpages/login');
    })
        .catch(err=>{
        console.log("Arti not Saved");
    })
})

router.get('/all_auth',function (req,res,next){
    ath.find({status:'0'}).populate().exec().then(authors=>{
      return res.status(200).json({
          data:authors
      });
    })
})

var shelf=require('../models/model_shelf');
router.post('/addtoself',function (req,res,next) {
var uid=req.body.uid;
var bid=req.body.bid;
var m=req.body.m;

shelf.find({status:0,book_id:bid,user_id:uid}).exec().then(ff=>{
    if(ff.length>0) {
        return res.status(200).json({
            id:' Alredy in shelf'
        })

    }
else {

var tos=new shelf({
    _id: new mongoose.Types.ObjectId(),
    user_id:uid,
    book_id:bid,
    art_id:bid,
    model_t:m
})
    tos.save().then(r=>{
return res.status(200).json({
    id:' Added To shelf'
})
    })
    }
})
})

var like=require('../models/model_like');
router.post('/addtoli',function (req,res,next) {
    var uid=req.body.uid;
    var bid=req.body.bid;
    var m=req.body.m;

    like.find({status:0,book_id:bid,user_id:uid}).exec().then(ff=>{
        if(ff.length>0) {
            return res.status(200).json({
                id:' Alredy Liked'
            })

        }
        else {

            var tos=new like({
                _id: new mongoose.Types.ObjectId(),
                user_id:uid,
                book_id:bid,
                model:m
            })
            tos.save().then(r=>{
                return res.status(200).json({
                    id:' Liked'
                })
            })
        }
    })
})






module.exports=router;

