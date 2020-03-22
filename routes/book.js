const Bookr = require('../models/model_book');
var mkdirp = require('fs')
var express = require("express");
var multer = require('multer');
var arr;
var name;
var count = 0;
const router = express.Router();
const storage = multer.diskStorage({

    destination: function (req, file, cb) {


        var dir = 'public/uploads/' + req.session.userid
        try {
            if (!mkdirp.existsSync(dir)) {
                // fs.mkdirSync(dir)
                console.log("Dir No Exist");
                mkdirp.mkdirSync('public/uploads/' + req.session.userid);
                 }
        } catch (err) {
            console.log("Dir existing" + err);

        }
        try {
            if (!mkdirp.existsSync(dir+"/"+req.body.up_title+'/')) {
                // fs.mkdirSync(dir)
                console.log("Dir No Exist");
                mkdirp.mkdirSync('public/uploads/' + req.session.userid+'/'+req.body.up_title);
            }
        } catch (err) {
            console.log("Dir existing" + err);

        }

        var dest = 'public/uploads/' + req.session.userid+'/'+req.body.up_title;

        cb(null, dest);
    },
    filename: function (req, file, cbs) {
        var a = new Date().toUTCString();
        console.log(a);
        cbs(null, req.body.up_title +"_"+req.body.up_edition+"_"+ file.originalname);
        console.log("My Fie Name" + file);
        count++;
        if (count == 1) {
            name="";
            name =req.body.up_title +"_"+req.body.up_edition+"_"+  file.originalname
            count++
            console.log("222" + count)

        }
        else {
            arr="";
            arr =req.body.up_title +"_"+req.body.up_edition+"_"+ file.originalname;
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

router.post('/api/photo', upload.any(), function (req, res) {
    /* upload(req,res,function(err) {
         if(err) {
             return res.end("Error uploading file.");
         }

       //  res.end("File is uploaded");
     });*/


    const newbook = new Bookr({
        _id: new mongoose.Types.ObjectId(),
        user_id: req.session.userid,
        author_id: req.body.automplete,
        category_id: req.body.srl,
        book_title: req.body.up_title,
        ISBN: req.body.up_isbn,
        publication_id: req.body.up_pub,
        edition: req.body.up_edition,
        publish_year: req.body.srl1,
        ref_link: req.body.up_rlink,
        book_image: name,
        book_file: arr
    });

 //   res.send("Niki Done");
    newbook.save().then(result => {
        count=0;
        name="";
        arr=""
        console.log(result)
       // return  res.status()
     //   res.send("Done");
res.redirect('/cllogin');
    })
        .catch(err => {
            console.log(err);


        });


});

var Book=require('../models/model_book');
router.post('/usrbook_del',function (req,res,next) {
  Book.update({_id:req.body.bbid},{$set:{'status':'1'}}).exec().then(resu=>{
     console.log("update")
       return res.status(200).json({
           data:resu,
           st:"Book Removed"
       })


   })
  /*  return res.status(200).json({
        st:req.body.bbid
    })*/
})

router.get('/user_book:id',function (req,res,next) {
    var id=req.params.id;
    console.log("We het call"+id);

    return res.status(200).json({
        m:id
    });
//    res.render('clientpage/book_display',{condi:false});

})
router.get('/user_bookto',function (req,res,next) {
    return res.render('clientpages/book_display',{title:'MME',condi:false});
})

module.exports = router;