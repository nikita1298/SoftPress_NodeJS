$(document).ready(function () {
    //alert("hii");
    $("#usr_name").focusout(function () {//alert("ii");
        var username = document.getElementById("usr_name").value;
        if (username.trim() == 0) {
            //  alert('dhj');
            $("#err_usr_name").html('<span class="fa fa-exclamation text-danger"> Enter full Name</span>');
        }
        else if (!(/^[A-Za-z\s]+$/.test(username))) {
            $("#err_usr_name").html('<span class="fa fa-exclamation text-danger"> Invalid full Name</span>');
        }
        else {
            $("#err_usr_name").html('');
            $("#usr_name").css("border-bottom-color", "#7E7E7E");

        }
    });

    $("#usr_email").focusout(function () {//alert("ii");
        var em = 0;
        var useremail = document.getElementById("usr_email").value;
        if (useremail.trim() == 0) {
            //  alert('dhj');
            em++;
            $("#err_usr_email").html('<span class="fa fa-exclamation text-danger"> Enter Email Address</span>');
        }
        else if (!(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(useremail))) {
            $("#err_usr_email ").html('<span class="fa fa-exclamation text-danger"> Invalid Email Address</span>');
            em++;
        }
        else {
            $("#usr_email").css("border-bottom-color", "#7E7E7E")
            $("#err_usr_email ").html('');
        }
        //  alert(em);
        if (em == 0) {
            // alert('hii');
            $.post('/users/mailcheck', {
                "email": useremail,

            }, function (data) {//alert('1f00');
                console.log("My Data at email" + data['message']);
                if (data['message'] == 'y') {
                    $("#err_usr_email ").html('<span class="fa fa-exclamation text-danger"> This Email is Already exist</span>');
                  //  uni++;
                }
                //window.location = data.redirect

            })
        }
    });

    $("#usr_mobile").focusout(function () {
        //alert("ii");
        var mr = 0;
        var mobile = document.getElementById("usr_mobile").value;
        // alert(mobile.length);
        if (mobile.trim() == 0) {
            $("#err_usr_mobile").html('<span class="fa fa-exclamation text-danger"> Enter Mobile Number</span>');
            mr++;
        }
        else if (!((/^[6-9]\d{9}$/).test(mobile))) {
            $("#err_usr_mobile").html('<span class="fa fa-exclamation text-danger"> Enter Valid mobile Number</span>');
            mr++;
        }
        else {
            $("#usr_mobile").css("border-bottom-color", "#7E7E7E")

            $("#err_usr_mobile").html('');


        }
        if (mr == 0) {

            $.post('users/mobilecheck', {
                "mobile": mobile,

            }, function (data) {
                //alert('00');
                console.log("My Data at" + data['message']);
                if (data['message'] == 'y') {
                    $("#err_usr_mobile").html('<span class="fa fa-exclamation text-danger"> This Mobile is Already Registered</span>');
                  //  uni++;
                }
                //window.location = data.redirect

            })
        }

    });

    $("#usr_pass").focusout(function () {
        //  alert("ii");
        var pass = document.getElementById("usr_pass").value;
        //  alert(pass.length);
        if (pass.trim() == 0) {
            $("#err_usr_pass").html('<span class="fa fa-exclamation text-danger"> Enter Password</span>');
        }
        else if (!((/^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%*&+()]).*$/).test(pass))) {
            $("#err_usr_pass").html('<span class="fa fa-exclamation text-danger"> Enter Valid Password</span>');
        }
        else {
            $("#usr_pass").css("border-bottom-color", "#7E7E7E")

            $("#err_usr_pass").html('');


        }
    });

    $("#usr_cpass").focusout(function () {
        //  alert("ii");
        var pass = document.getElementById("usr_pass").value;

        var cpass = document.getElementById("usr_cpass").value;
        //  alert(pass.length);
        if (cpass.trim() == 0) {
            $("#err_usr_cpass").html('<span class="fa fa-exclamation text-danger"> Enter Password</span>');
        }
        else if (cpass != pass) {
            $("#err_usr_cpass").html('<span class="fa fa-exclamation text-danger">Password and coform Password doesn\'t match</span>');
        }
        else {
            $("#usr_cpass").css("border-bottom-color", "#7E7E7E")

            $("#err_usr_cpass").html('');


        }
    });


    $("#usr_register").click(function () {
        var reg_err = 0;

        var username = document.getElementById("usr_name").value;
        if (username.trim() == 0) {
            //   alert('dhj');
            $("#err_usr_name").html('<span class="fa fa-exclamation text-danger"> Enter full Name</span>');
            reg_err++;
            // alert(reg_err+" error in name")
        }
        else if (!(/^[a-zA-Z- ]*$/.test(username))) {
            $("#err_usr_name").html('<span class="fa fa-exclamation text-danger"> Invalid full Name</span>');
            reg_err++;
        }
        else {
            $("#err_usr_name").html('');
        }

        // alert(reg_err+" error in name   out")

        var mobile = document.getElementById("usr_mobile").value;
        // alert(mobile.length);
        if (mobile.trim() == 0) {
            $("#err_usr_mobile").html('<span class="fa fa-exclamation text-danger"> Enter Mobile Number</span>');
            reg_err++;
        }
        else if (!((/^[6-9]\d{9}$/).test(mobile))) {
            $("#err_usr_mobile").html('<span class="fa fa-exclamation text-danger"> Enter Valid mobile Number</span>');
            reg_err++;

        }
        else {
            $("#usr_mobile").css("border-bottom-color", "#7E7E7E")

            $("#err_usr_mobile").html('');


        }


        //  alert(pass.length);
        var pass = document.getElementById("usr_pass").value;

        if (pass.trim() == 0) {
            $("#err_usr_pass").html('<span class="fa fa-exclamation text-danger"> Enter Password</span>');
            reg_err++;

        }
        else if (!((/^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%*&+()]).*$/).test(pass))) {
            $("#err_usr_pass").html('<span class="fa fa-exclamation text-danger"> Enter Valid Password</span>');
            reg_err++;

        }
        else {
            $("#usr_pass").css("border-bottom-color", "#7E7E7E")

            $("#err_usr_pass").html('');


        }


        var cpass = document.getElementById("usr_cpass").value;
        // alert(pass.length);
        if (cpass.trim() == 0) {
            $("#err_usr_cpass").html('<span class="fa fa-exclamation text-danger"> Enter Password</span>');
            reg_err++;

        }
        else if (cpass != pass) {
            $("#err_usr_cpass").html('<span class="fa fa-exclamation text-danger">Password and coform Password doesn\'t match</span>');
            reg_err++;

        }
        else {
            $("#usr_cpass").css("border-bottom-color", "#7E7E7E")

            $("#err_usr_cpass").html('');


        }
        var useremail = document.getElementById("usr_email").value;
        if (useremail.trim() == 0) {
            reg_err++;
            //  alert('dhj');
            $("#err_usr_email").html('<span class="fa fa-exclamation text-danger"> Enter Email Address</span>');
        }
        else if (!(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(useremail))) {
            reg_err++;

            $("#err_usr_email ").html('<span class="fa fa-exclamation text-danger"> Invalid Email Address</span>');
        }
        else {
            $("#usr_email").css("border-bottom-color", "#7E7E7E")
            $("#err_usr_email ").html('');
        }

        $.post('/users/mobilecheck', {
            "mobile": mobile,

        }, function (data) {
            //alert('00');
            console.log("My Data at" + data['message']);
            if (data['message'] == 'y') {
                $("#err_usr_mobile").html('<span class="fa fa-exclamation text-danger"> This Mobile is Already Registered</span>');
                reg_err++
            }
            //window.location = data.redirect

        });
        $.post('users/mailcheck', {
            "email": useremail,

        }, function (data) {//alert('1f00');
            console.log("My Data at email" + data['message']);
            if (data['message'] == 'y') {
                $("#err_usr_email ").html('<span class="fa fa-exclamation text-danger"> This Email is Already exist</span>');
                reg_err++;
                //alert("reg_error"+reg_err);

            }
            //window.location = data.redirect

        });
        //    alert(reg_err+" error in last")

        if (reg_err == 0) {
            //   alert("reg_error in if"+reg_err);

            console.log('Emai.js' + useremail);
             $.post('/users/signup',{
                   "name":username,
                   "email":useremail,
                   "password":pass,
                   "mobile":mobile
               },function (data,stu) {
                 if(stu=='success') {
                     console.log("My Data" + data['message']);
                     console.log("My Data" + data['data']['email']);
                     console.log("My Data" + data['data']['name']);
                     //window.location = data.redirect
                 }
                 else {
                     console.log("In Valid");
                 }
               })
         /*  $.post('/users/register', {
                "name": username,
                "email": useremail,
                "password": pass,
                "mobile": mobile

            }, function (data) {
                console.log('My Data' + data['message']);
            })*/
        }
    })

    //-----------------Login ---------------------------------
    $("#log_add").focusout(function () {
        //alert("login")
        var add = document.getElementById("log_add").value;
        if (add.trim() == 0) {
            $("#err_log_email").html('<span class="fa fa-exclamation text-danger"> Enter Email Address</span>');
        }
        else if (!(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(add))) {
            $("#err_log_email ").html('<span class="fa fa-exclamation text-danger"> Invalid Email Address</span>');
        }
        else {
            $("#log_add").css("border-bottom-color", "#7E7E7E")
            $("#err_log_email ").html('');
        }


    });

    $("#log_pass").focusout(function () {
        var pass = document.getElementById("log_pass").value;
        if (pass.trim() == 0) {
            $("#err_log_pass").html('<span class="fa fa-exclamation text-danger"> Enter Password</span>');
        }
        else {
            $("#log_pass").css("border-bottom-color", "#7E7E7E")
            $("#err_log_pass ").html('');
        }


    });
    $("#btn_login").click(function () {
            var log_err = 0;
            var add = document.getElementById("log_add").value;
            if (add.trim() == 0) {
                $("#err_log_email").html('<span class="fa fa-exclamation text-danger"> Enter Email Address</span>');
                log_err++;
            }
            else if (!(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(add))) {
                $("#err_log_email ").html('<span class="fa fa-exclamation text-danger"> Invalid Email Address</span>');
                log_err++
            }
            else {
                $("#log_add").css("border-bottom-color", "#7E7E7E")
                $("#err_log_email ").html('');
            }


            var passl = document.getElementById("log_pass").value;
            if (passl.trim() == 0) {
                log_err++;
                $("#err_log_pass").html('<span class="fa fa-exclamation text-danger"> Enter Password</span>');
            }
            else {
                $("#log_pass").css("border-bottom-color", "#7E7E7E")
                $("#err_log_pass ").html('');
            }

//alert(log_err);
            if (log_err == 0) {
              alert("ckii");
                $.post('/users/login', {
                        email: add,
                        password: passl
                    }
                    , function (data,sts) {
                        alert("datta" + data['message']);
                        if (sts == 'success') {
                            if(data['data']['user_type']==0){
                                window.location.replace('/cllogin');

                            }
                            else if(data['data']['user_type']==1){
                                window.location.replace('/adlogin');

                            }
                           // window.location.replace('/ses');
                        }
                        else {
                           // alert("Invlid users");
                            $("#err_log_invalid ").html('<span style="color: red"><br>Invalid Username or Password..!</span>');

                        }
                        // alert("datta" + data['data']['email'] + "\n" + data['data']['password'] + "\n" + data['data']['_id']);
                        //alert("Login u");
                    })
            }
        }
    );
    window.onbeforeunload=function () {
        alert("close");
        $.get('/nosession')
    };
});