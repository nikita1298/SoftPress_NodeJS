var au=[];
$(function() {
    $.get('/users/all_auth',function (data) {
        console.log(data['data']);
        au=data['data'];
    var availableTutorials  =  [];
        var a=[]
    for (var i=0;i<data['data'].length;i++){
        console.log(data['data'][i].name);
        availableTutorials[i]=(data['data'][i].name)

    }

    $( "#automplete" ).autocomplete({
        source: availableTutorials
    });
        $( "#rautomplete" ).autocomplete({
            source: availableTutorials
        });
    });
    $.get('/admin/book_cats',function (data) {
        console.log(data['data']);
        var opt="";
        for(var i=0;i<data['data'].length;i++){
            opt += "<option value=" + data['data'][i]['_id'] + ">" + data['data'][i]['name'] + "</option>"
        }
        $("#srl").append(opt);
      //  console.log(opt)

    })

   // document.getElementById("upload_book").disabled = false;
$("#upload_book").click(function () {
    console.log("Button Clicked")
})
});

/*
    var availableTutorials  =  [
        "ActionScript",
        "Bootstrap",
        "C",
        "C++",
        'nikita',
    ];
    $( "#automplete" ).autocomplete({
        source: availableTutorials
    });

$(document).ready(function () {
alert("hii auto comp");
    var options=['Niki','Mona','Name'];
    $('#up_auth_name').autocomplete({1:'Nikita',2:'KUNJ'}

    )
});*/

$(document).ready(function () {

   /* $("#up_title").focusout(function () {
        var booktitle= document.getElementById("up_title").value;
         if(booktitle.trim()==0){

         }


        var isbn=document.getElementById("up_isbn").value;

    })*/
$("#up_title").focusout(function () {
    var booktitle= document.getElementById("up_title").value;
    if(booktitle.trim()==0){
        $("#err_up_title").html('<span class="fa fa-exclamation text-danger"> Enter book title</span>');


    }
    else if(!(/^[A-Za-z\s]+$/.test(booktitle))){
        $("#err_up_title").html('<span class="fa fa-exclamation text-danger"> Invalid book title </span>');

    }
    else {
        $("#err_up_title").html('');

    }
});




    $("#automplete").focusout(function () {
        var bookauth= document.getElementById("automplete").value;
        if(bookauth.trim()==0){
            $("#err_up_auth_name").html('<span class="fa fa-exclamation text-danger"> Enter book author name</span>');


        }
        else if(!(/^[A-Za-z\s]+$/.test(bookauth))){
            $("#err_up_auth_name").html('<span class="fa fa-exclamation text-danger"> Invalid book author name </span>');

        }
        else {
            $("#err_up_auth_name").html('');

        }
    });

    $("#up_isbn").focusout(function () {
        var isbn=document.getElementById("up_isbn").value;
        if(isbn.trim()==0){
            $("#err_up_isbn").html('<span class="fa fa-exclamation text-danger"> Enter book ISBN</span>');


        }
        else if(!(/^[0-9]*$/.test(isbn))){
            $("#err_up_isbn").html('<span class="fa fa-exclamation text-danger"> Invalid book ISBN </span>');

        }
        else {
            $("#err_up_isbn").html('');

        }
    })


    $("#up_edition").focusout(function () {
        var bedition=document.getElementById("up_edition").value;
        if(bedition.trim()==0){
            $("#err_up_edition").html('<span class="fa fa-exclamation text-danger"> Enter book edition </span>');


        }
        else if(!(/^[0-9]*$/.test(bedition))){
            $("#err_up_edition").html('<span class="fa fa-exclamation text-danger"> Invalid book edition </span>');

        }
        else {
            $("#err_up_edition").html('');

        }
    })
    $("#up_pub").focusout(function () {
        var bookpub= document.getElementById("up_pub").value;
        if(bookpub.trim()==0){
            $("#err_up_pub").html('<span class="fa fa-exclamation text-danger"> Enter book Publication name</span>');


        }
        else if(!(/^[A-Za-z\s]+$/.test(bookpub))){
            $("#err_up_pub").html('<span class="fa fa-exclamation text-danger"> Invalid book Publication name </span>');

        }
        else {
            $("#err_up_pub").html('');

        }
    });
    var nowY = new Date().getFullYear(),
        options = "";

    for(var Y=nowY; Y>=1980; Y--) {
        options += "<option>"+ Y +"</option>";
    }

    $("#srl1").append( options );
    $("#srl1").focusout(function () {
        var byear=document.getElementById("srl1").value;
        //alert(byear);
        if(byear.trim()==0){
            $("#err_up_year").html('<span class="fa fa-exclamation text-danger"> Select book publication year </span>');


        }

        else {
            $("#err_up_year").html('');

        }
    })

    $("#srl").focusout(function () {
        var bcat=document.getElementById("srl").value;
     //   alert(bcat);
        if(bcat.trim()==0){
            $("#err_up_cat").html('<span class="fa fa-exclamation text-danger"> Select book Category</span>');


        }

        else {
            $("#err_up_cat").html('');

        }
    });
    $("#up_rlink").focusout(function () {
        var li=document.getElementById("up_rlink").value;
         if(li.trim()==0){

      //  $("#up_rlink").val("none");
        }

        else {
            $("#err_up_lik").html('');

        }
   //     alert(li);

    });
    $("#userPhoto").focusout(function () {
        var v=book_img();
     //   alert(v);
    })
    $("#user").focusout(function () {
        var v=book_pdf();
       // alert(v);
    })

    $("#upload_book").click(function () {
        var err = 0;
        var booktitle = document.getElementById("up_title").value;
        if (booktitle.trim() == 0) {
            $("#err_up_title").html('<span class="fa fa-exclamation text-danger"> Enter book title</span>');
            err++;

        }
        else if (!(/^[A-Za-z\s]+$/.test(booktitle))) {
            $("#err_up_title").html('<span class="fa fa-exclamation text-danger"> Invalid book title </span>');
            err++;
        }
        else {
            $("#err_up_title").html('');

        }
        var im = book_img();
        if (im == 1) {
            err++;
        }
        var pd = book_pdf();
        if (pd == 1) {
            err++;
        }


        var bookauth = document.getElementById("automplete").value;
        if (bookauth.trim() == 0) {
            $("#err_up_auth_name").html('<span class="fa fa-exclamation text-danger"> Enter book author name</span>');
            err++;

        }
        else if (!(/^[A-Za-z\s]+$/.test(bookauth))) {
            $("#err_up_auth_name").html('<span class="fa fa-exclamation text-danger"> Invalid book author name </span>');
            err++;
        }
        else {
            $("#err_up_auth_name").html('');

        }

        var isbn = document.getElementById("up_isbn").value;
        if (isbn.trim() == 0) {
            $("#err_up_isbn").html('<span class="fa fa-exclamation text-danger"> Enter book ISBN</span>');
            err++;

        }
        else if (!(/^[0-9]*$/.test(isbn))) {
            $("#err_up_isbn").html('<span class="fa fa-exclamation text-danger"> Invalid book ISBN </span>');
            err++;
        }
        else {
            $("#err_up_isbn").html('');

        }

        var bedition = document.getElementById("up_edition").value;
        if (bedition.trim() == 0) {
            $("#err_up_edition").html('<span class="fa fa-exclamation text-danger"> Enter book edition </span>');
            err++;

        }
        else if (!(/^[0-9]*$/.test(bedition))) {
            $("#err_up_edition").html('<span class="fa fa-exclamation text-danger"> Invalid book edition </span>');
            err++;
        }
        else {
            $("#err_up_edition").html('');

        }

        var bookpub = document.getElementById("up_pub").value;
        if (bookpub.trim() == 0) {
            $("#err_up_pub").html('<span class="fa fa-exclamation text-danger"> Enter book Publication name</span>');

            err++;
        }
        else if (!(/^[A-Za-z\s]+$/.test(bookpub))) {
            $("#err_up_pub").html('<span class="fa fa-exclamation text-danger"> Invalid book Publication name </span>');
            err++;
        }
        else {
            $("#err_up_pub").html('');

        }
        var byear = document.getElementById("srl1").value;
        //   alert(byear);
        if (byear.trim() == 0) {
            $("#err_up_year").html('<span class="fa fa-exclamation text-danger"> Select book publication year </span>');
            err++;

        }

        else {
            $("#err_up_year").html('');

        }
        var bcat = document.getElementById("srl").value;
        // alert(bcat);
        if (bcat.trim() == 0) {
            $("#err_up_cat").html('<span class="fa fa-exclamation text-danger"> Select book Category </span>');
            err++;

        }

        else {
            $("#err_up_cat").html('');

        }

        // alert("Hii niki form acttiobn" + err);
        var a = 1;
        if (err == 0){
            alert("au"+au.length);
            if(au.length==0) {    alert(a);

                $.post('/users/add_auth',{
                    booka:bookauth
                },function (data) {
                    alert("i am in");
                    alert(data['data']['_id']+" "+data['data']._id);
                    console.log(data['data']);
                    alert(data['data']);
                    n=data['data']._id;
                    //  ("#automplete").value=data[data]._id;
                })
                alert("we hope that you have enterd information is right");
                //  $("#au_id").val(n);
                $("#uploadForm").attr('action', '/book/api/photo');



                //  return false
            }else{
                for (var i = 0; i < au.length; i++) {
                    if (au[i].name == bookauth) {
                        $("#au_id").val(au[i]._id);
                        $("#uploadForm").attr('action', '/book/api/photo');
                        a = 1;
                        break;
                    }
                    else {
                        a = 0;
                    }
                }
            }
            var n='';
            if(a==0){
                alert(a);

                $.post('/users/add_auth',{
                    booka:bookauth
                },function (data) {
                    alert("i am in");
                    alert(data['data']['_id']+" "+data['data']._id);
                    console.log(data['data']);
                    alert(data['data']);
                    n=data['data']._id;
                  //  ("#automplete").value=data[data]._id;
                })
                    alert("we hope that you have enterd information is right");
                  //  $("#au_id").val(n);
                    $("#uploadForm").attr('action', '/book/api/photo');



              //  return false

            }

    }
        else {
         //   alert("No Action");
            return false
        }
    })













//console.log(img+"IGKGJGKFJKGFJ"+bdf);
  /*  $("#upload_book").click(function () {
        var booktitle= document.getElementById("up_title").value;
        var isbn=document.getElementById("up_isbn").value;
        var author=    document.getElementById("automplete").value;
        var edition= document.getElementById("up_edition").value;
        var publiction= document.getElementById("up_pub").value;
        var yesr= document.getElementById("up_year").value;
        var bcat= document.getElementById("srl").value;
        var  rlink= document.getElementById("up_rlink").value;
        var  img= document.getElementById("userPhoto");
        var  bdf= document.getElementById("user");
        console.log(img+"IGKGJGKFJKGFJ"+bdf);

         $.post('/book/api/photo', {
             up_title: booktitle,
             up_isbn: isbn,
             automplete: author,
            up_edition: edition,
             up_pub: publiction,
             up_year: yesr,
             srl: bcat,
             up_rlink: rlink,
              img:img,
              bdf:bdf

          },function (data) {

          console.log('data');

          })

    })
*/
  $("#rem").focusout(function () {

      var add = document.getElementById("rem").value;
      if (add.trim() == 0) {
          $("#err_log_remail").html('<span class="fa fa-exclamation text-danger"> Enter Email Address</span>');
      }
      else if (!(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(add))) {
          $("#err_log_remail ").html('<span class="fa fa-exclamation text-danger"> Invalid Email Address</span>');
      }
      else {
          $("#err_log_remail ").html('');
      }

  })
    $("#send").click(function () {
       var errr=0;
        var add = document.getElementById("rem").value;
        if (add.trim() == 0) {
            errr++;
            $("#err_log_remail").html('<span class="fa fa-exclamation text-danger"> Enter Email Address</span>');
        }
        else if (!(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(add))) {
           errr++;
            $("#err_log_remail ").html('<span class="fa fa-exclamation text-danger"> Invalid Email Address</span>');
        }
        else {
            $("#err_log_remail ").html('');
        }

        console.log("data");
if(errr==0) {
    $.post('http://localhost/sfp/index.php', {
        ema: add,
        nam:document.getElementById("nam").value
    }, function (data) {
        console.log(data);
    })
}
    })

  //  alert("hio")
});


function book_img(){
    var fileInput = document.getElementById('userPhoto');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.png|\.jpeg)$/i;
    var flag = 0;

    if(filePath == ""){
        $("#img_err").html('<span class="fa fa-exclamation text-danger">Please select file first</span>');
        flag += 1;
    }else{
        document.getElementById('img_err').innerHTML = "";
    }
    if(filePath != ""){
        if(!allowedExtensions.exec(filePath)){
            $("#img_err").html('<span class="fa fa-exclamation text-danger">Please upload file  .PNG, .JPG ,.JPEG only.</span>');
            fileInput.value = '';
            flag += 1;
        }else{
            document.getElementById('img_err').innerHTML = "";
        }
    }
    if(flag != 0){
        return 1;
    }
    else {
        return 0;
    }
}

function book_pdf(){
    var fileInput = document.getElementById('user');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.pdf)$/i;
    var flag = 0;

    if(filePath == ""){
        $("#err_pdf").html('<span class="fa fa-exclamation text-danger">Please select file first</span>');
        flag += 1;
    }else{
        document.getElementById('err_pdf').innerHTML = "";
    }
    if(filePath != ""){
        if(!allowedExtensions.exec(filePath)){
            $("#err_pdf").html('<span class="fa fa-exclamation text-danger">Please upload file  .pdf only.</span>');
            fileInput.value = '';
            flag += 1;
        }else{
            document.getElementById('err_pdf').innerHTML = "";
        }
    }
    if(flag != 0){
        return 1;
    }
    else {
        return 0;
    }
}




