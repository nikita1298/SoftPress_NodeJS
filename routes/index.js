var express = require('express');
var router = express.Router();
var http=require('httpclient');

const Book=require('../models/model_book');
const Author=require('../models/model_author');
const  Bookcat=require('../models/model_book-category');
const  Art=require('../models/model_article');
const  artcat=require('../models/model_artical_category');

/* GET home page. */
router.get('/', function(req, res, next) {

    Bookcat.find().then(bdocs=> {
    //  console.log("NNN"+bdocs);
        var bookcatChunks = [];
        var chunkSize = 7;
        for (var i = 0; i < bdocs.length; i += chunkSize) {
            bookcatChunks.push(bdocs.slice(i, i + chunkSize));

        }
        artcat.find().then(re=>{
            var artcatChunks = [];
            var chunkSize = 7;
            for (var i = 0; i < re.length; i += chunkSize) {
                artcatChunks.push(re.slice(i, i + chunkSize));

            }

        console.log("My ALL CATS"+bdocs);
        res.render('clientpages/homepage', { title: 'FOdme',condi:false,bact:bookcatChunks,mbcat:bdocs,arcat:artcatChunks,macat:re});
        })
    })
    // res.render('adminpages/dashboard', { title: 'FOme',condi:true });
});

router.get('/gatmenu',function (req,res,next) {
    Bookcat.find().then(bdocs => {
        //  console.log("NNN"+bdocs);
        var bookcatChunks = [];
        var chunkSize = 7;
        for (var i = 0; i < bdocs.length; i += chunkSize) {
            bookcatChunks.push(bdocs.slice(i, i + chunkSize));

        }
        artcat.find().then(re => {
            var artcatChunks = [];
            var chunkSize = 7;
            for (var i = 0; i < re.length; i += chunkSize) {
                artcatChunks.push(re.slice(i, i + chunkSize));

            }

        return res.status(200).json({
            bch:bookcatChunks,
            mbc:bdocs,
            acat:artcatChunks,
            brcat:re
        })
        })
    })
})
router.get('/cllogin', function(req, res, next) {
    console.log("indexsession" + req.session.email);
    var log = {
        email: req.session.email,
        id: req.session.userid,
        name: req.session.name

    }
    if (req.session.email == null) {
        res.render('clientpages/login', {title: 'FOme', condi: false, login: log});

    } else {
        Book.find({status: 0, approve_status: '0', user_id: req.session.userid}).exec().then(newbook => {
            console.log("users" + newbook + req.session.userid);

            Art.find({status: 0, a_status: '0', user_id: req.session.userid}).exec().then(newart => {



                Bookcat.find({status: 0}).populate('book').exec().then(cat => {
                    for (var i = 0; i < newbook.length; i++) {
                        for (var j = 0; j < cat.length; j++) {
                            // console.log('in 2 looop'+newbook[i].category_id+' id  '+cat[j]._id);

                            if (newbook[i].category_id == cat[j]._id) {
                                //     console.log("id"+newbook[i].category_id+'MEEEE'+cat[j]._id);
                                newbook[i].category_id = cat[j].name
                                // newbook[i].namecat=cat[j].name;
                                newbook[i].email = req.session.email
                                // console.log("uuuuuuuuuuuuuuuuuuu"+newbook[i].user);

                            }
                        }
                    }


                });

                artcat.find({status: 0}).exec().then(acat => {
                 //   console.log("messa"+acat);
                    for (var i = 0; i < newart.length; i++) {
                        for (var j = 0; j < acat.length; j++) {
                            // console.log('in 2 looop'+newbook[i].category_id+' id  '+cat[j]._id);
                            //console.log("messa"+acat);
                            console.log("messa"+acat[j]._id+"AA"+newart[i].art_cat_id);

                            if (newart[i].art_cat_id == acat[j]._id) {
                                console.log("messa"+acat[j]._id+"AA"+newart[i].art_cat_id);

                                //     console.log("id"+newbook[i].category_id+'MEEEE'+cat[j]._id);
                                newart[i].art_cat_id = acat[j].article_type
                                // newbook[i].namecat=cat[j].name;
                                newart[i].email = req.session.email
                                // console.log("uuuuuuuuuuuuuuuuuuu"+newbook[i].user);

                            }
                        }
                    }


                });
console.log("meart"+newart);
                res.render('clientpages/clienthomepage', {title: 'FOme', condi: false, login: log, newb: newbook,art:newart});

                })
            });

    }

});

router.get('/p_art',function (req,res,next) {
    Art.find({status: 0,$or :[{ a_status: '1'},{a_status:'2'}], user_id: req.session.userid}).exec().then(newart => {
        artcat.find({status: 0}).exec().then(acat => {
            //   console.log("messa"+acat);
            for (var i = 0; i < newart.length; i++) {
                for (var j = 0; j < acat.length; j++) {
                    // console.log('in 2 looop'+newbook[i].category_id+' id  '+cat[j]._id);
                    //console.log("messa"+acat);
                    console.log("messa"+acat[j]._id+"AA"+newart[i].art_cat_id);

                    if (newart[i].art_cat_id == acat[j]._id) {
                        console.log("messa"+acat[j]._id+"AA"+newart[i].art_cat_id);

                        //     console.log("id"+newbook[i].category_id+'MEEEE'+cat[j]._id);
                        newart[i].art_cat_id = acat[j].article_type
                        // newbook[i].namecat=cat[j].name;
                        newart[i].email = req.session.email
                        // console.log("uuuuuuuuuuuuuuuuuuu"+newbook[i].user);

                    }
                }
            }


        });
        res.render('clientpages/p_art', {title: 'FOme', condi: false,art:newart});

    })
    })



router.get('/p_book',function (req,res,next) {
    Book.find({status: 0,$or:[{ approve_status: '1'},{approve_status:'2'}], user_id: req.session.userid}).exec().then(newbook => {
        Bookcat.find({status: 0}).populate('book').exec().then(cat => {
            for (var i = 0; i < newbook.length; i++) {
                for (var j = 0; j < cat.length; j++) {
                    // console.log('in 2 looop'+newbook[i].category_id+' id  '+cat[j]._id);

                    if (newbook[i].category_id == cat[j]._id) {
                        //     console.log("id"+newbook[i].category_id+'MEEEE'+cat[j]._id);
                        newbook[i].category_id = cat[j].name
                        // newbook[i].namecat=cat[j].name;
                        newbook[i].email = req.session.email
                        // console.log("uuuuuuuuuuuuuuuuuuu"+newbook[i].user);

                    }
                }
            }


        });

        res.render('clientpages/p_book', {title: 'FOme', condi: false,newb:newbook});

    })
})

router.get('/cllogin', function(req, res, next) {
    console.log("indexsession"+req.session.email);
    var log={
        email:req.session.email,
        id:req.session.userid,
         name:req.session.name

}
if(req.session.email==null){
    res.render('clientpages/login', {title: 'FOme', condi: false, login: log});

}else {
    res.render('clientpages/clienthomepage', {title: 'FOme', condi: false, login: log});
}
});
router.get('/upload_book',function (req,res,next) {
    var log={
        email:req.session.email,
        id:req.session.userid,
        name:req.session.name
}
    res.render('clientpages/upload_book',{login:log,upbook:true});
})


router.get('/upload_article',function (req,res,next) {
    var log={
        email:req.session.email,
        id:req.session.userid,
        name:req.session.name
    }
    res.render('clientpages/upload_article',{login:log,upbook:true});
})
router.get('/login', function(req, res, next) {
    res.render('clientpages/login', { title: 'Express' ,condi:false});
});

router.get('/adlogin', function(req, res, next) {

    if(req.session.email==null){
        res.render('clientpages/login', {title: 'FOme', condi: false, login: log});

    }else {
        res.render('adminpages/dashboard', { title: 'Express' ,condi:true});
    }
  });
router.post('/register',function (req,res,next) {
    console.log(req.body.email);
    return "Succed";

});

/*
router.get('/db', function(req, res, next) {
    http.get('http://localhost:4000/product/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("hdshjh"+response) // Print the google web page.
              }
         else{
            console.log(error)
            res.send("fjkj111111111")
      
         }
    })
  //  res.send("fjkj")
         
});
*/
router.get('/db', function(req, res, next) {
    var  a="";
 res.render('client/discoverBook', { title: 'Express' });
  /* http.get('http://localhost:4000/product',(error,ress,body)=>{
     if(error){
         console.log("Err"+error);
     }
     else{
         console.log("Hii"+body[0]);
       a=JSON.parse(body);
       console.log("Hii"+JSON.stringify(a[1].price));
       res.send("djdhj"+JSON.stringify(a[0].name));
     }
   });*/
   

 });



router.get('/backhome', function(req, res, next) {
    res.render('client/homepage', { title: 'Express' });
});

router.get('/rtf',function (req,res,next) {
    var na=req.session.name.charAt(0).toUpperCase()+req.session.name.slice(1);
    var log={
        email:req.session.email,
        id:req.session.userid,
        name:req.session.name
    }
res.render('clientpages/refertofriend',{title:'Refer',na:na,login:log})
})
router.get('/lgout',function (req,res,next) {
        req.session.destroy();
     res.render('clientpages/homepage',{title:'Fome'})

})


//Home book cat

var ide='';
router.get('/user_book:id',function (req,res,next) {
    var id=req.params.id;
    ide=id;
    //console.log("We het call"+id);

    return res.status(200).json({
        m:id
    });
//    res.render('clientpage/book_display',{condi:false});

})

router.get('/cllogins', function(req, res, next) {
    var log = {
        email: req.session.email,
        id: req.session.userid,
        name: req.session.name

    }
    console.log('ide'+ide);
     Book.find({status:'0',approve_status:'0',category_id:ide}).then(resb=>{
         console.log("resb"+resb);
         res.render('clientpages/book_display',{condi:false,newb:resb,login:log});

     })

});

var ida='';
router.get('/user_art:id',function (req,res,next) {
    var id=req.params.id;
    ida=id;
    console.log("We het call"+id);

    return res.status(200).json({
        m:id
    });
//    res.render('clientpage/book_display',{condi:false});

})
var aart=require('../models/model_article')
router.get('/clloginss', function(req, res, next) {
    var log = {
        email: req.session.email,
        id: req.session.userid,
        name: req.session.name

    }
    console.log('ideiii'+ide);
    aart.find({status:'0',a_status:'0',art_cat_id:ida}).then(resb=>{
        console.log("resb"+resb);
        res.render('clientpages/article_display',{condi:false,art:resb,login:log});

    })
})

var shelf=require('../models/model_shelf');

router.get('/shelf',function (req,res,next) {

    var log = {
        email: req.session.email,
        id: req.session.userid,
        name: req.session.name

    }
    shelf.find({user_id:req.session.userid,status:0,model_t:'b'}).populate('book_id').exec().then(resi=> {
        shelf.find({user_id: req.session.userid, status: 0,model_t:'a'}).select('_id').populate('art_id').exec().then(resu => {

      //  res.send(resu[0].art_id.description+ "me" );
          res.render('clientpages/shelf',{condi:false,newb:resi,art:resu,login:log})
        })
    });
})
router.post('/shelf_del',function (req,res,next) {
    var shid=req.body.shid;
    shelf.update({_id:shid},{$set:{status:'1'}}).then(resc=>{
        res.status(200).json({
            id:'removed from shelf'
        })
    })
})


module.exports = router;
