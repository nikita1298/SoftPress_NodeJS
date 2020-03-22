var au = [];
$(function () {
    $.get('/users/all_auth', function (data) {
        console.log(data['data']);
        au = data['data'];
        var availableTutorials = [];
        var a = []
        for (var i = 0; i < data['data'].length; i++) {
            console.log(data['data'][i].name);
            availableTutorials[i] = (data['data'][i].name)

        }

    })
})


$(document).ready(function () {
    var c = 1;

    $.get('/admin/art_cat_on_ajx/', function (data) {
        console.log(data['data']);
        var alld = data['data'];


        for (var i = 0; i < data['data'].length; i++) {
            $('#example3 tr.last').data = '';
            $('#example3 tr:last').after(
                '  <tr>\n' +
                '                            <td class="text-center">' + c + '</td>\n' +
                '                            <td class="text-center">' + alld[i].article_type + '</td>\n' +
                '                            <td class="text-center">20</td>\n' +
                '                            <td class="text-center"><button class="fa fa-edit " style="background: transparent;color: #0b3e6f;border: none" id=' + alld[i]._id + ' data-toggle="modal" data-target="#ed' + alld[i]._id + '"></button></td>\n' +
                '                            <td class="text-center"><button class="fa fa-trash  arcatdel" id=' + alld[i]._id + ' style="background: transparent;color: red;border: none"></button></td>\n' +
                '                        </tr>'
            );
            c++;
        }
    })


//alert("Art");
    $("#art_cat").focusout(function () {//alert("ii");
        var artcat = document.getElementById("art_cat").value;
        if (artcat.trim() == 0) {
            //  alert('dhj');
            $("#err_art_cat").html('<span class="fa fa-exclamation text-danger "> Enter Category Name</span>');
        }
        else if (!(/^[A-Za-z\s]+$/.test(artcat))) {
            $("#err_art_cat").html('<span class="fa fa-exclamation text-danger"> Invalid Category Name</span>');
        }
        else {
            $("#err_art_cat").html('');

        }
    });

    $("#add_art").click(function () {
        var berr = 0;
        var artcat = document.getElementById("art_cat").value;
        if (artcat.trim() == 0) {
            //  alert('dhj');
            $("#err_art_cat").html('<span class="fa fa-exclamation text-danger "> Enter Category Name</span>');
        }
        else if (!(/^[A-Za-z\s]+$/.test(artcat))) {
            $("#err_art_cat").html('<span class="fa fa-exclamation text-danger"> Invalid Category Name</span>');
        }
        else {
            $("#err_art_cat").html('');

        }
        if (berr == 0) {
            $.post('/admin/add_new_art_cat/', {
                artcat: artcat
            }, function (data) {
                alert(data['message']);
                $('#example3 tr:last').after('  <tr>\n' +
                    '                            <td class="text-center">' + c + '</td>\n' +
                    '                            <td class="text-center">' + data['data'].article_type + '</td>\n' +
                    '                            <td class="text-center">20</td>\n' +
                    '                            <td class="text-center"><button class="fa fa-edit " style="background: transparent;color: #0b3e6f;border: none" id=' + data['data']._id + ' data-toggle="modal" data-target="#mdledt' + data['data']._id + '"></button></td>\n' +
                    '                            <td class="text-center"><button class="fa fa-trash" id=' + data['data']._id + ' style="background: transparent;color: red;border: none"></button></td>\n' +
                    '                        </tr>'
                );
                c++;
            });
        }
    })

    $.get('/admin/art_cats', function (data) {
        console.log(data['data']);
        var opt = "";
        for (var i = 0; i < data['data'].length; i++) {
            opt += "<option value=" + data['data'][i]['_id'] + ">" + data['data'][i]['article_type'] + "</option>"
        }
        $("#rsrl").append(opt);
        //  console.log(opt)

    })


    //add article


    $("#up_r_title").focusout(function () {
        var arttitle = document.getElementById("up_r_title").value;
        if (arttitle.trim() == 0) {
            $("#err_up_r_title").html('<span class="fa fa-exclamation text-danger"> Enter Article title</span>');


        }
        else if (!(/^[A-Za-z\s]+$/.test(arttitle))) {
            $("#err_up_r_title").html('<span class="fa fa-exclamation text-danger"> Invalid Article title </span>');

        }
        else {
            $("#err_up_r_title").html('');

        }
    });

    $("#rautomplete").focusout(function () {
        var artauth = document.getElementById("rautomplete").value;
        if (artauth.trim() == 0) {
            $("#err_up_r_auth_name").html('<span class="fa fa-exclamation text-danger"> Enter Article Author</span>');


        }
        else if (!(/^[A-Za-z\s]+$/.test(artauth))) {
            $("#err_up_r_auth_name").html('<span class="fa fa-exclamation text-danger"> Invalid Article Author </span>');

        }
        else {
            $("#err_up_r_auth_name").html('');

        }
    });

    $("#up_r_des").focusout(function () {
        var artdes = document.getElementById("up_r_des").value;
        if (artdes.trim() == 0) {
            $("#err_up_r_des").html('<span class="fa fa-exclamation text-danger"> Enter Article Description</span>');


        }
        else if (!(/^[A-Za-z\s]+$/.test(artdes))) {
            $("#err_up_r_des").html('<span class="fa fa-exclamation text-danger"> Invalid Article Description </span>');

        }
        else {
            $("#err_up_r_des").html('');

        }
    });

    $("#rsrl").focusout(function () {
        var artc = document.getElementById("rsrl").value;
        //   alert(bcat);
        if (artc.trim() == 0) {
            $("#err_up_r_cat").html('<span class="fa fa-exclamation text-danger"> Select Article Category</span>');


        }

        else {
            $("#err_up_r_cat").html('');

        }
    });

    $("#r_userPhoto").focusout(function () {
        var v = art_img();
        //   alert(v);
    })
    $("#r_user").focusout(function () {
        var v = art_pdf();
        // alert(v);
    })

    $("#upload_art").click(function () {
        alert("jj")
        var err = 0;
        var im = art_img();
        if (im == 1) {
            err++;
        }
        var pd = art_pdf();
        if (pd == 1) {
            err++;
        }
        var artc = document.getElementById("rsrl").value;
        //   alert(bcat);
        if (artc.trim() == 0) {
            $("#err_up_r_cat").html('<span class="fa fa-exclamation text-danger"> Select Article Category</span>');
            err++;

        }

        else {
            $("#err_up_r_cat").html('');

        }

        var artdes = document.getElementById("up_r_des").value;
        if (artdes.trim() == 0) {
            $("#err_up_r_des").html('<span class="fa fa-exclamation text-danger"> Enter Article Description</span>');

            err++;
        }
        else if (!(/^[A-Za-z\s]+$/.test(artdes))) {
            $("#err_up_r_des").html('<span class="fa fa-exclamation text-danger"> Invalid Article Description </span>');
            err++;
        }
        else {
            $("#err_up_r_des").html('');

        }

        var artauth = document.getElementById("rautomplete").value;
        if (artauth.trim() == 0) {
            $("#err_up_r_auth_name").html('<span class="fa fa-exclamation text-danger"> Enter Article Author</span>');
            err++;

        }
        else if (!(/^[A-Za-z\s]+$/.test(artauth))) {
            $("#err_up_r_auth_name").html('<span class="fa fa-exclamation text-danger"> Invalid Article Author </span>');
            err++;
        }
        else {
            $("#err_up_r_auth_name").html('');

        }

        var arttitle = document.getElementById("up_r_title").value;
        if (arttitle.trim() == 0) {
            $("#err_up_r_title").html('<span class="fa fa-exclamation text-danger"> Enter Article title</span>');
            err++;

        }
        else if (!(/^[A-Za-z\s]+$/.test(arttitle))) {
            $("#err_up_r_title").html('<span class="fa fa-exclamation text-danger"> Invalid Article title </span>');
            err++;
        }
        else {
            $("#err_up_r_title").html('');

        }
        alert("mmm" + err)
        if (err == 0) {
            alert("au" + au.length);
            if (au.length == 0) {
                $.post('/users/add_auth', {
                    booka: artauth
                }, function (data) {
                    alert("i am in");
                    alert(data['data']['_id'] + " " + data['data']._id);
                    console.log(data['data']);
                    alert(data['data']);
                    n = data['data']._id;
                    $("#rau_id").val(n);
                    alert("n in" + n);

                    alert(document.getElementById("rau_id").value);
                    console.log(n);

                })

                alert("we hope that you have enterd information is right");

                alert("n bar" + n);
                //  $("#rau_id").val(n);

                $("#ruploadForm").attr('action', '/article/apr/photo');

            } else {
                for (var i = 0; i < au.length; i++) {
                    if (au[i].name == artauth) {
                        $("#rau_id").val(au[i]._id);
                        $("#ruploadForm").attr('action', '/article/apr/photo');
                        a = 1;
                        break;
                    }
                    else {
                        a = 0;
                    }
                }
            }
            var n = '';
            if (a == 0) {
                alert("a" + a);

                $.post('/users/add_auth', {
                    booka: artauth
                }, function (data) {
                    alert("i am in");
                    alert(data['data']['_id'] + " " + data['data']._id);
                    console.log(data['data']);
                    alert(data['data']);
                    n = data['data']._id;
                    $("#rau_id").val(n);
                    alert("n in" + n);

                    alert(document.getElementById("rau_id").value);
                    console.log(n);

                })

                alert("we hope that you have enterd information is right");

                alert("n bar" + n);
                //  $("#rau_id").val(n);

                $("#ruploadForm").attr('action', '/article/apr/photo');


                //  return false

            }

        }
        else {
            //   alert("No Action");
            return false
        }


    })
    //Articles rej app

    $(".a_apr").click(function () {
        var a = this.id;
        alert(a);

        $.post('/article/action_artcle', {
            art_id:a,
            st:'0'
        }, function (data) {
           if(data['id']=='s'){
               alert("Article approved")
               location.reload()
           }
        })
    })

    $(".a_rej").click(function () {
        var a = this.id;
        alert(a);

        $.post('/article/action_artcle', {
            art_id:a,
            st:'2'
        }, function (data) {
            alert("Article cancled")
location.reload()
        })
    })



    $(".mybtna").click(function () {
        //var m=document.querySelector('.mybtn').id;
        var m = this.id;
        var old = document.getElementById("h" + m).value;
        var ne = document.getElementById("book_cat" + m).value;
        //alert(m + old);
        if (ne == old) {
        } else{
            $.post('/article/ar_updt_cat/' + m, {
                uid: m,
                newn:ne
            }, function (data) {
                alert(data['message'])
                location.reload()
            })
        }


    })


});


function art_img() {
    var fileInput = document.getElementById('r_userPhoto');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.png|\.jpeg)$/i;
    var flag = 0;

    if (filePath == "") {
        $("#img_r_err").html('<span class="fa fa-exclamation text-danger">Please select file first</span>');
        flag += 1;
    } else {
        document.getElementById('img_r_err').innerHTML = "";
    }
    if (filePath != "") {
        if (!allowedExtensions.exec(filePath)) {
            $("#img_r_err").html('<span class="fa fa-exclamation text-danger">Please upload file  .PNG, .JPG ,.JPEG only.</span>');
            fileInput.value = '';
            flag += 1;
        } else {
            document.getElementById('img_r_err').innerHTML = "";
        }
    }
    if (flag != 0) {
        return 1;
    }
    else {
        return 0;
    }
}

function art_pdf() {
    var fileInput = document.getElementById('r_user');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.pdf)$/i;
    var flag = 0;

    if (filePath == "") {
        $("#err_r_pdf").html('<span class="fa fa-exclamation text-danger">Please select file first</span>');
        flag += 1;
    } else {
        document.getElementById('err_r_pdf').innerHTML = "";
    }
    if (filePath != "") {
        if (!allowedExtensions.exec(filePath)) {
            $("#err_r_pdf").html('<span class="fa fa-exclamation text-danger">Please upload file  .pdf only.</span>');
            fileInput.value = '';
            flag += 1;
        } else {
            document.getElementById('err_r_pdf').innerHTML = "";
        }
    }
    if (flag != 0) {
        return 1;
    }
    else {
        return 0;
    }
}




