const express = require('express');
const router = express.Router();
mongoose = require('mongoose')
const Bookcate = require('../models/model_book-category');
const Artcate = require('../models/model_artical_category');
const User = require('../models/model_user');
const Author = require('../models/model_author');
const Art = require('../models/model_article');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');


router.get('/adhome',function (req,res,next) {
res.render('adminpages/dashboard',{condi:true});
});
router.post('/add_new_cat', function (req, res, next) {
    Bookcate.find({
        name: req.body.bookcat,
        status:'0'
    }).exec().then(cats => {
        if (cats.length >= 1) {
            return res.status(409).json({
                message: "Category is already in list"
            })
        }
        else {
            const cates = new Bookcate({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.bookcat.toLowerCase(),
            });
            cates.save().then(result => {
                console.log(result)
                res.status(201).json({

                    message: "cate Created",
                    data: result

                })
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
        }

    })
});
router.get('/book_cat', function (req, res, next) {
    Bookcate.find({status: '0'}).populate('book').exec().then(cats => {
        console.log("cats" + cats);
        res.render('adminpages/book_category', {condi: true, cats: cats});

    })
})


router.get('/book_cat_on_ajx', function (req, res, next) {
    var cat = 0;
    Bookcate.find({status: '0'}).populate('book').exec().then(cats => {
        //      console.log("cats" + cats);
        book.find({status: '0'}).then(es => {

            for (var i = 0; i < cats.length; i++) {
        //        console.log("cts" + es)
                for(var j=0;j<es.length;j++){
                    if(es[j].category_id==cats[i]._id){
                        cat++;
                        console.log("In count"+cat);

                    }
                }
                cats[i].status=cat;

                cat=0;

                // cats[i].tco=es;
            }
            return res.status(200).json({
                data: cats
            })
            })




    })
});
function getcount(catid){


}
router.get('/article_cat', function (req, res, next) {
    Artcate.find({status: '0'}).populate('book').exec().then(cats => {
        console.log("cats" + cats);
        res.render('adminpages/article_category', {condi: true, cats: cats});

    })
})


router.get('/art_cat_on_ajx', function (req, res, next) {
    Artcate.find({status: '0'}).exec().then(ac => {
        console.log("cataaas" + ac);
        return res.status(200).json({
            data: ac
        })
    })
})
router.post('/add_new_art_cat', function (req, res, next) {
    Artcate.find({
        name: req.body.artcat
    }).exec().then(cats => {
        if (cats.length >= 1) {
            return res.status(409).json({
                message: "Category is already in list"
            })
        }
        else {
            const nart = new Artcate({
                _id: new mongoose.Types.ObjectId(),
                article_type: req.body.artcat.toLowerCase(),
            });
            nart.save().then(result => {
                console.log(result)
                res.status(201).json({

                    message: "cate Created",
                    data: result

                })
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
        }

    })
});


router.get('/book_cats', function (req, res, next) {
    Bookcate.find({status: '0'}).populate('book').exec().then(cats => {
        return res.status(200).json({
            data: cats
        });
    })
})


router.get('/art_cats', function (req, res, next) {
    Artcate.find({status: '0'}).exec().then(ac => {
        return res.status(200).json({
            data: ac
        });
    })
})
router.get('/rept_user', function (req, res, next) {
    User.find({status: '0', user_type: '0'}).exec().then(use => {
        res.render('adminpages/rept_user', {condi: true, cats: use});

    })
});


router.get('/new_book', function (req, res, next) {
    res.render('adminpages/new_book', {condi: true});


});

var book = require('../models/model_book')
router.get('/mubook', function (req, res, next) {
    var newb = [], app = [], rej = [];
    var log = {
        email: req.session.email,
        id: req.session.userid,
        name: req.session.name

    }
    book.find({status: 0, approve_status: 1}).exec().then(newbook => {

        book.find({status: 0, approve_status: 0}).exec().then(appbook => {
            app = appbook;
            book.find({status: 0, approve_status: 2}).exec().then(rejbook => {
                rej = rejbook;
                var allau = [];

                Bookcate.find({status: 0}).populate('book').exec().then(cat => {
                    for (var i = 0; i < newbook.length; i++) {
                        for (var j = 0; j < cat.length; j++) {
                            // console.log('in 2 looop'+newbook[i].category_id+' id  '+cat[j]._id);

                            if (newbook[i].category_id == cat[j]._id) {
                                //     console.log("id"+newbook[i].category_id+'MEEEE'+cat[j]._id);
                                newbook[i].category_id = cat[j].name
                                // newbook[i].namecat=cat[j].name;
                                //   newbook[i].user=cat[j].name;
                                // console.log("uuuuuuuuuuuuuuuuuuu"+newbook[i].user);

                            }
                        }
                    }

                    //rej book
                    for (var i = 0; i < rejbook.length; i++) {
                        for (var j = 0; j < cat.length; j++) {
                            // console.log('in 2 looop'+newbook[i].category_id+' id  '+cat[j]._id);

                            if (rejbook[i].category_id == cat[j]._id) {
                                //     console.log("id"+newbook[i].category_id+'MEEEE'+cat[j]._id);
                                rejbook[i].category_id = cat[j].name
                                // newbook[i].namecat=cat[j].name;
                                //   newbook[i].user=cat[j].name;
                                // console.log("uuuuuuuuuuuuuuuuuuu"+newbook[i].user);

                            }
                        }
                    }
                    User.find({user_type: 0}).populate('book').exec().then(ur => {
                        var usr = [];
                        usr = ur;

                        for (var i = 0; i < newbook.length; i++) {
                            for (var j = 0; j < usr.length; j++) {
                                if (usr[j]._id == (newbook[i].user_id).toString()) {
                                    console.log("yess");
                                    newbook[i].user = ur[j].name;
                                    newbook[i].email = ur[j].email;
                                    newbook[i].contact = ur[j].mobile
                                }

                            }
                        } //rejbook
                        for (var i = 0; i < rejbook.length; i++) {
                            for (var j = 0; j < usr.length; j++) {
                                if (usr[j]._id == (rejbook[i].user_id).toString()) {
                                    console.log("yess");
                                    rejbook[i].user = ur[j].name;
                                    rejbook[i].email = ur[j].email;
                                    rejbook[i].contact = ur[j].mobile
                                }

                            }
                        }
                    });
                });


                //   Author.find({status:0}).exec()

                console.log("new Book" + newbook);
                res.render('adminpages/new_book', {
                    condi: true,
                    newb: newbook,
                    appb: appbook,
                    rejb: rejbook,
                    log: log
                });
            });
        })

    });


});
var cat = [];
router.get('/newart', function (req, res, next) {
    Art.find({status: 0, a_status: 1}).exec().then(newbook => {

        Art.find({status: 0, a_status: 0}).exec().then(appbook => {
            app = appbook;
            Art.find({status: 0, a_status: 2}).exec().then(rejbook => {
                rej = rejbook;
                var allau = [];
                /*Author.find({status: 0}).populate('book').exec().then(doc => {/*
                    allau = doc;

                    for (var i = 0; i < newbook.length; i++) {
                        for (var j = 0; j < allau.length; j++) {
                            //  console.log('in 2 looop'+newbook[i].author_id+' id  '+allau[j]._id);

                            if (newbook[i].author_id == allau[j]._id) {
                                newbook[i]['author_id'] = allau[j].name
                            }
                        }
                    }


                    //rej book
                    for (var i = 0; i < rejbook.length; i++) {
                        for (var j = 0; j < allau.length; j++) {
                            //  console.log('in 2 looop'+newbook[i].author_id+' id  '+allau[j]._id);

                            if (rejbook[i].author_id == allau[j]._id) {
                                rejbook[i]['author_id'] = allau[j].name
                            }
                        }
                    }*/
                Artcate.find({status: 0}).populate('book').exec().then(cat => {
                    for (var i = 0; i < newbook.length; i++) {
                        for (var j = 0; j < cat.length; j++) {
                            // console.log('in 2 looop'+newbook[i].category_id+' id  '+cat[j]._id);

                            if (newbook[i].art_cat_id == cat[j]._id) {
                                //     console.log("id"+newbook[i].category_id+'MEEEE'+cat[j]._id);
                                newbook[i].art_cat_id = cat[j].article_type
                                // newbook[i].namecat=cat[j].name;
                                //   newbook[i].user=cat[j].name;
                                // console.log("uuuuuuuuuuuuuuuuuuu"+newbook[i].user);

                            }
                        }
                    }

                    //rej book
                    for (var i = 0; i < rejbook.length; i++) {
                        for (var j = 0; j < cat.length; j++) {
                            // console.log('in 2 looop'+newbook[i].category_id+' id  '+cat[j]._id);

                            if (rejbook[i].art_cat_id == cat[j]._id) {
                                //     console.log("id"+newbook[i].category_id+'MEEEE'+cat[j]._id);
                                rejbook[i].art_cat_id = cat[j].article_type
                                // newbook[i].namecat=cat[j].name;
                                //   newbook[i].user=cat[j].name;
                                // console.log("uuuuuuuuuuuuuuuuuuu"+newbook[i].user);

                            }
                        }
                    }
                    User.find({user_type: 0}).populate('book').exec().then(ur => {
                        var usr = [];
                        usr = ur;

                        for (var i = 0; i < newbook.length; i++) {
                            for (var j = 0; j < usr.length; j++) {
                                if (usr[j]._id == (newbook[i].user_id).toString()) {
                                    console.log("yess");
                                    newbook[i].user = ur[j].name;
                                    newbook[i].email = ur[j].email;
                                    newbook[i].contact = ur[j].mobile
                                }

                            }
                        } //rejbook
                        for (var i = 0; i < rejbook.length; i++) {
                            for (var j = 0; j < usr.length; j++) {
                                if (usr[j]._id == (rejbook[i].user_id).toString()) {
                                    console.log("yess");
                                    rejbook[i].user = ur[j].name;
                                    rejbook[i].email = ur[j].email;
                                    rejbook[i].contact = ur[j].mobile
                                }

                            }
                        }
                    });
                });


                //   Author.find({status:0}).exec()

                console.log("new Book" + newbook);
               /* res.render('adminpages/new_book', {
                    condi: true,
                    newb: newbook,
                    appb: appbook,
                    rejb: rejbook,
                    log: log
                });*/
                res.render('adminpages/new_article', {condi: true, ar: newbook,rejb:rejbook});

            });
        })

    });


   /* res.render('adminpages/new_article', {condi: true, ar: ona});
*/

})

router.post('/updt_cat/:id', function (req, res, next) {
    var a = req.params.id;
    var n = req.body.newn;
    Bookcate.update({_id: a}, {$set: {name: n}}).exec().then(ress => {

        return res.status(200).json({
            message: 'updated'
        })

    })
    /* return res.status(200).json({
         message: "Update called" + a
     })*/
})
// All UPdate
//book
router.post('/updt_book', function (req, res, next) {
    var bid = req.body.bid;
    var sta = req.body.st;
    book.update({_id: bid}, {$set: {approve_status: sta}}).exec().then(ress => {

        return res.status(200).json({
            message: 's'
        })

    })
})


router.post('/updt_cat_del', function (req, res, next) {
    var bid = req.body.bid;
    var sta = req.body.st;
    book.update({_id: bid}, {$set: {status: sta}}).exec().then(ress => {

        return res.status(200).json({
            message: 's'
        })

    })
})

var bct=require('../models/model_book-category');
router.post('/updt_bcat_del', function (req, res, next) {
    var bid = req.body.uid;
    var sta = req.body.st;
    bct.update({_id: bid}, {$set: {status: sta}}).exec().then(ress => {

        return res.status(200).json({
            message: 's'
        })

    })
})



var bact=require('../models/model_artical_category');
router.post('/updt_bacat_del', function (req, res, next) {
    var bid = req.body.uid;
    var sta = req.body.st;
    bact.update({_id: bid}, {$set: {status: sta}}).exec().then(ress => {

        return res.status(200).json({
            message: 's'
        })

    })
})

 //view book
router.get('/viewbook',function (req,res,next) {
    book.find({status: 0, approve_status: 0}).exec().then(newbook => {

        book.find({status: 0, approve_status: 1}).exec().then(appbook => {
            app = appbook;
            book.find({status: 0, approve_status: 2}).exec().then(rejbook => {
                rej = rejbook;
                var allau = [];

                Bookcate.find({status: 0}).populate('book').exec().then(cat => {
                    for (var i = 0; i < newbook.length; i++) {
                        for (var j = 0; j < cat.length; j++) {
                            // console.log('in 2 looop'+newbook[i].category_id+' id  '+cat[j]._id);

                            if (newbook[i].category_id == cat[j]._id) {
                                //     console.log("id"+newbook[i].category_id+'MEEEE'+cat[j]._id);
                                newbook[i].category_id = cat[j].name
                                // newbook[i].namecat=cat[j].name;
                                //   newbook[i].user=cat[j].name;
                                // console.log("uuuuuuuuuuuuuuuuuuu"+newbook[i].user);

                            }
                        }
                    }

                    //rej book
                    for (var i = 0; i < rejbook.length; i++) {
                        for (var j = 0; j < cat.length; j++) {
                            // console.log('in 2 looop'+newbook[i].category_id+' id  '+cat[j]._id);

                            if (rejbook[i].category_id == cat[j]._id) {
                                //     console.log("id"+newbook[i].category_id+'MEEEE'+cat[j]._id);
                                rejbook[i].category_id = cat[j].name
                                // newbook[i].namecat=cat[j].name;
                                //   newbook[i].user=cat[j].name;
                                // console.log("uuuuuuuuuuuuuuuuuuu"+newbook[i].user);

                            }
                        }
                    }
                    User.find({user_type: 0}).populate('book').exec().then(ur => {
                        var usr = [];
                        usr = ur;

                        for (var i = 0; i < newbook.length; i++) {
                            for (var j = 0; j < usr.length; j++) {
                                if (usr[j]._id == (newbook[i].user_id).toString()) {
                                    console.log("yess");
                                    newbook[i].user = ur[j].name;
                                    newbook[i].email = ur[j].email;
                                    newbook[i].contact = ur[j].mobile
                                }

                            }
                        } //rejbook
                        for (var i = 0; i < rejbook.length; i++) {
                            for (var j = 0; j < usr.length; j++) {
                                if (usr[j]._id == (rejbook[i].user_id).toString()) {
                                    console.log("yess");
                                    rejbook[i].user = ur[j].name;
                                    rejbook[i].email = ur[j].email;
                                    rejbook[i].contact = ur[j].mobile
                                }

                            }
                        }
                    });
                });


                //   Author.find({status:0}).exec()

                console.log("new Book" + newbook);
                res.render('adminpages/view_book', {
                    condi: true,
                    newb: newbook,

                });
            });
        })

    });
});

router.get('/viewbookss',function (req,res,next) {
    Art.find({status: 0, a_status: 0}).exec().then(newbook => {

        Art.find({status: 0, a_status: 1}).exec().then(appbook => {
            app = appbook;
            Art.find({status: 0, a_status: 2}).exec().then(rejbook => {
                rej = rejbook;
                var allau = [];
                /*Author.find({status: 0}).populate('book').exec().then(doc => {/*
                    allau = doc;

                    for (var i = 0; i < newbook.length; i++) {
                        for (var j = 0; j < allau.length; j++) {
                            //  console.log('in 2 looop'+newbook[i].author_id+' id  '+allau[j]._id);

                            if (newbook[i].author_id == allau[j]._id) {
                                newbook[i]['author_id'] = allau[j].name
                            }
                        }
                    }


                    //rej book
                    for (var i = 0; i < rejbook.length; i++) {
                        for (var j = 0; j < allau.length; j++) {
                            //  console.log('in 2 looop'+newbook[i].author_id+' id  '+allau[j]._id);

                            if (rejbook[i].author_id == allau[j]._id) {
                                rejbook[i]['author_id'] = allau[j].name
                            }
                        }
                    }*/
                Artcate.find({status: 0}).populate('book').exec().then(cat => {
                    for (var i = 0; i < newbook.length; i++) {
                        for (var j = 0; j < cat.length; j++) {
                            // console.log('in 2 looop'+newbook[i].category_id+' id  '+cat[j]._id);

                            if (newbook[i].art_cat_id == cat[j]._id) {
                                //     console.log("id"+newbook[i].category_id+'MEEEE'+cat[j]._id);
                                newbook[i].art_cat_id = cat[j].article_type
                                // newbook[i].namecat=cat[j].name;
                                //   newbook[i].user=cat[j].name;
                                // console.log("uuuuuuuuuuuuuuuuuuu"+newbook[i].user);

                            }
                        }
                    }

                    //rej book
                    for (var i = 0; i < rejbook.length; i++) {
                        for (var j = 0; j < cat.length; j++) {
                            // console.log('in 2 looop'+newbook[i].category_id+' id  '+cat[j]._id);

                            if (rejbook[i].art_cat_id == cat[j]._id) {
                                //     console.log("id"+newbook[i].category_id+'MEEEE'+cat[j]._id);
                                rejbook[i].art_cat_id = cat[j].article_type
                                // newbook[i].namecat=cat[j].name;
                                //   newbook[i].user=cat[j].name;
                                // console.log("uuuuuuuuuuuuuuuuuuu"+newbook[i].user);

                            }
                        }
                    }
                    User.find({user_type: 0}).populate('book').exec().then(ur => {
                        var usr = [];
                        usr = ur;

                        for (var i = 0; i < newbook.length; i++) {
                            for (var j = 0; j < usr.length; j++) {
                                if (usr[j]._id == (newbook[i].user_id).toString()) {
                                    console.log("yess");
                                    newbook[i].user = ur[j].name;
                                    newbook[i].email = ur[j].email;
                                    newbook[i].contact = ur[j].mobile
                                }

                            }
                        } //rejbook
                        for (var i = 0; i < rejbook.length; i++) {
                            for (var j = 0; j < usr.length; j++) {
                                if (usr[j]._id == (rejbook[i].user_id).toString()) {
                                    console.log("yess");
                                    rejbook[i].user = ur[j].name;
                                    rejbook[i].email = ur[j].email;
                                    rejbook[i].contact = ur[j].mobile
                                }

                            }
                        }
                    });
                });


                //   Author.find({status:0}).exec()

                console.log("new Book" + newbook);
                res.render('adminpages/view_article', {
                    condi: true,
                    newb: newbook,

                });
            });
        })

    });
});
        // res.render('adminpages/view_book',{condi:true})


module.exports = router;
