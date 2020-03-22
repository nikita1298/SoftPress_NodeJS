const Bookr = require('../models/model_article');
var mkdirp = require('fs')
var express = require("express");
var multer = require('multer');
var Art=require('../models/model_article');
var Artcat=require('../models/model_artical_category');

var arr;
var name;
var count = 0;
const router = express.Router();
const storage = multer.diskStorage({

    destination: function (req, file, cb) {


        var dir = 'public/Art_uploads/' + req.session.userid
        try {
            if (!mkdirp.existsSync(dir)) {
                // fs.mkdirSync(dir)
                console.log("Dir No Exist");
                mkdirp.mkdirSync('public/Art_uploads/' + req.session.userid);
            }
        } catch (err) {
            console.log("Dir existing" + err);

        }
        try {
            if (!mkdirp.existsSync(dir+"/"+req.body.up_r_title+'/')) {
                // fs.mkdirSync(dir)
                console.log("Dir No Exist");
                mkdirp.mkdirSync('public/Art_uploads/' + req.session.userid+'/'+req.body.up_r_title);
            }
        } catch (err) {
            console.log("Dir existing" + err);

        }

        var dest = 'public/Art_uploads/' + req.session.userid+'/'+req.body.up_r_title;

        cb(null, dest);
    },
    filename: function (req, file, cbs) {
        var a = new Date().toUTCString();
        console.log(a);
        cbs(null, req.body.up_r_title +"_"+ file.originalname);
        console.log("My Fie Name" + file);
        count++;
        if (count == 1) {
            name="";
            name =req.body.up_r_title +"_"+  file.originalname;
            count++
            console.log("222" + count)

        }
        else {
            arr="";
            arr =req.body.up_r_title +"_"+ file.originalname;
        }
        console.log(file)

    }
});
const upload = multer({
    storage: storage,
    /*  limits:{
          fileSize:1024*1024*5
      },*/
})

router.post('/apr/photo', upload.any(), function (req, res) {
    /* upload(req,res,function(err) {
         if(err) {
             return res.end("Error uploading file.");
         }

       //  res.end("File is uploaded");
     });*/

   arid=req.body.rsrl;


     var nar= new Art({
        article_id: new mongoose.Types.ObjectId(),
            user_id: req.session.userid,
            author_id: req.body.rautomplete,
            art_cat_id: req.body.rsrl,
            article_title: req.body.up_r_title,
            description: req.body.up_r_des,
            article_img: name,
            article_file: arr

    });
     nar.save().then(resu=>{
         count=0;
         name="";
         arr=""
         console.log(resu)
         // return  res.status()
         //   res.send("Done");
         res.redirect('/cllogin');
     })
         .catch(err => {
             console.log(err);


         });



    console.log("AUthrssschna"+req.body.rau_id);
    //   res.send("Niki Done");
   /* Art.findOneAndUpdate({_id:arid},{$push:{article:nar}}
        ).then(result => {
        count=0;
        name="";
        arr="";
        console.log(result)
        // return  res.status()
        //   res.send("Done");
        res.redirect('/cllogin');
    })
        .catch(err => {
            console.log(err);


        });*/


});

router.get("/me",function (req,res,next) {
    res.send("me");
})


router.post("/action_artcle",function (req,res,next) {
    a_id=req.body.art_id;
        cat=req.body.cat_id;
        s=req.body.st;

    Art.update({"_id":a_id}, {$set: {"a_status":s}}).exec().then(ress => {
console.log('enterrrrrrrrrrrrrrrrrrrrr'+ress);

        return res.status(200).json({
            id: 's'
        })

    })

})


router.post('/ar_updt_cat/:id', function (req, res, next) {
    var a = req.params.id;
    var n = req.body.newn;
    Artcat.update({_id: a}, {$set: {article_type: n}}).exec().then(ress => {

        return res.status(200).json({
            message: 'updated',
            data:ress
        })

    })
    /* return res.status(200).json({
         message: "Update called" + a
     })*/
})

var Art=require('../models/model_article');
router.post('/usrart_del',function (req,res,next) {
    Art.update({_id:req.body.bbid},{$set:{'status':'1'}}).exec().then(resu=>{
        console.log("update")
        return res.status(200).json({
            data:resu,
            st:"Article Removed"
        })


    })
    /*  return res.status(200).json({
          st:req.body.bbid
      })*/
})
module.exports = router;