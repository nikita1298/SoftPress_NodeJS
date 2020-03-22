$(document).ready(function () {
    var c=1;
    $.get('/admin/book_cat_on_ajx/',function (data) {
        console.log(data['data']);
        var alld=data['data'];

        for(var i=0;i<alld.length;i++) {
            $('#example2 tr.last').data='';
            $('#example2 tr:last').after(
                '  <tr>\n' +
                '                            <td class="text-center">'+c+'</td>\n' +
                '                            <td class="text-center">'+alld[i].name+'</td>\n' +
                '                            <td class="text-center">'+alld[i].status+'</td>\n' +
                '                            <td class="text-center"><button class="fa fa-edit " style="background: transparent;color: #0b3e6f;border: none" id='+alld[i]._id+' data-toggle="modal" data-target="#mdledt'+alld[i]._id+'"></button></td>\n' +
                '                            <td class="text-center"><button class="fa fa-trash mybtnbdel " id='+alld[i]._id+' style="background: transparent;color: red;border: none"></button></td>\n' +
                '                        </tr>'
            );c++;
        }
    })



    $("#book_cat").focusout(function () {//alert("ii");
        var bookcat = document.getElementById("book_cat").value;
        if (bookcat.trim() == 0) {
            //  alert('dhj');
            $("#err_book_cat").html('<span class="fa fa-exclamation text-danger "> Enter Category Name</span>');
        }
        else if (!(/^[A-Za-z\s]+$/.test(bookcat))) {
            $("#err_book_cat").html('<span class="fa fa-exclamation text-danger"> Invalid Category Name</span>');
        }
        else {
            $("#err_book_cat").html('');

        }
    });
    $("#add_cat").click(function () {
        var berr=0;
        var bookcat = document.getElementById("book_cat").value;
        if (bookcat.trim() == 0) {
            //  alert('dhj');
            berr++;
            $("#err_book_cat").html('<span class="fa fa-exclamation text-danger "> Enter Category Name</span>');
        }
        else if (!(/^[A-Za-z\s]+$/.test(bookcat))) {
            berr++;
            $("#err_book_cat").html('<span class="fa fa-exclamation text-danger"> Invalid Category Name</span>');
        }
        else {
            $("#err_book_cat").html('');

        }
        if(berr==0){
                $.post('/admin/add_new_cat/',{
                    bookcat:bookcat
                },function (data) {
    alert(data['message']);
    $('#example2 tr:last' ).after(  '  <tr>\n' +
        '                            <td class="text-center">'+c+'</td>\n' +
        '                            <td class="text-center">'+data['data'].name+'</td>\n' +
        '                            <td class="text-center">20</td>\n' +
        '                            <td class="text-center"><button class="fa fa-edit " style="background: transparent;color: #0b3e6f;border: none" id='+data['data']._id+' data-toggle="modal" data-target="#mdledt'+data['data']._id+'"></button></td>\n' +
        '                            <td class="text-center"><button class="fa fa-trash mybtnbdel" id='+data['data']._id+' style="background: transparent;color: red;border: none"></button></td>\n' +
        '                        </tr>'
    );
    c++;
                });
            }
        })

    
    $(".mybtn").click(function () {
        //var m=document.querySelector('.mybtn').id;
        var m = this.id;
        var old = document.getElementById("h" + m).value;
        var ne = document.getElementById("book_cat" + m).value;
        alert(m + old);
        if (ne == old) {
        } else{
            $.post('/admin/updt_cat/' + m, {
                uid: m,
                newn:ne
            }, function (data) {
                alert(data['message'])
                location.reload()
            })
    }


    })

    //book cat delete
    $(document).on('click','.mybtnbdel',function () {
        //var m=document.querySelector('.mybtn').id;
      var m = this.id;
        alert("my"+m);
            $.post('/admin/updt_bcat_del ', {
                uid: m,
                st:'1'

            }, function (data) {
                alert(data['message'])
                location.reload()
            })



    })

    $("#send").click(function () {
        console.log("data");

        $.post('http://localhost:8000/sfp/index.php',{
            ema:'Me'
        },function (data) {
            console.log(data);
        })
    })
//    alert("hio")

//toggle details
$(".medetail").click(function (event) {

    var t=this.id;
    var s=$("#"+t).attr("value");
    if(s=='Details') {
        $("#" + t).val('PDF')
        $(".bbok").hide();
        $(".details").show();
    }
    else {
        $("#" + t).val('Details');
        $(".bbok").show();
        $(".details").hide();

    }
    //var s=$(event.target).attr("value");
   // alert(t +''+s   );

})
    $(".details").hide();
//approve reject book
    $(".apr").click(function () {
        var i=this.id;
        alert(i);
        $.post('/admin/updt_book',{
            bid:i,
            st:'0'
        },function (data) {
            if(data['message']=='s') {

                alert("Book Appoved ");
                location.reload();
            }
        })
    })
    $(".rej").click(function () {
        var i=this.id;
        alert(i);
        $.post('/admin/updt_book',{
            bid:i,
            st:'2'
        },function (data) {
            if(data['message']=='s') {
                alert('Book Cancled');
                location.reload();
            }

        })
    })


});

