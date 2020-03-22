//fill menu home
$(function () {
    //alert("hoe");
    var r='',r1='';
    $.get('/gatmenu',function (data) {

        console.log(data['brcat'][0]);
        for(var i=0;i<data['bch'].length;i++){
         r=' <li><ul class="mega-sub-menu" id='+i+'></ul></li>';
            $("#fullbookcat").append(r)

            for(var j=0;j<data['bch'][i].length;j++){
r1='<li><a  id='+data['bch'][i][j]._id+'  class="hbcat">'+data['bch'][i][j].name+'</a></li>'+'\n'
                $('#'+i).append(r1)
            }

          }
var rr='',rr1='',is;
        for(var i=0;i<data['acat'].length;i++){
            is='a'+i;
            console.log("is"+is);
            rr=' <li><ul class="mega-sub-menu" id='+is+'></ul></li>';
            $("#fullartcat").append(rr)

            for(var j=0;j<data['acat'][i].length;j++){
                rr1='<li><a  id='+data['acat'][i][j]._id+'  class="hrcat">'+data['acat'][i][j].article_type+'</a></li>'+'\n'
                $("#a"+i).append(rr1)
            }

        }

        var mb="";
        for(var i=0;i<data['mbc'].length;i++){
            mb+=' <li class="hbcat"><a id='+data['mbc'][i]._id+' >'+data['mbc'][i].name+'</a>\n'
        }
        $("#mmbc").append(mb);
      //  $("#fullbookcat").html(r)
        //$("#mona").append("mr")
        var mab="";
        for(var i=0;i<data['brcat'].length;i++){
            mab+=' <li class="hrcat"><a id='+data['brcat'][i]._id+' class="">'+data['brcat'][i].article_type+'</a>\n'
        }
        console.log("maaaaaa"+mab);
        $("#mmac").append(mab);

    })
    
})

$(document).ready(function () {
    $(document).on('click','.hbcat',function () {
        var bid=this.id;
        alert("id");
        $.get('/user_book'+bid,function (data) {
            alert(data['m']);
            window.location.replace('/cllogins')
        })
    })
    $(document).on('click','.hrcat',function () {
        var bid=this.id;
        alert(bid)
        $.get('/user_art'+bid,function (data) {
            alert(data['m']+"returned");
            window.location.replace('/clloginss')
        })
    })

   // alert("new");
    $(".bbd").click(function () {
        var i=this.id;
        alert("new"+i);
        $.post('/book/usrbook_del',{
            bbid:i
        },function (data) {
            alert(data['st']);
        })
    })

    $(".abd").click(function () {
        var i=this.id;
        alert("new"+i);
        $.post('/article/usrart_del',{
            bbid:i
        },function (data) {
            alert(data['st']);
        })
    })

    //like and shelf book

    $(".addtosh").click(function () {
        var a=this.id;
      alert(this.id);
        $.post('/users/addtoself',{
            uid:document.getElementById('iu').value,
            bid:a,
            m:'b'
        },function (data) {
            alert("Book"+data['id']);

        })
    })

    $(".addtoa").click(function () {
        var a=this.id;
        alert(this.id);
        $.post('/users/addtoself',{
            uid:document.getElementById('iu').value,
            bid:a,
            m:'a'
        },function (data) {
            alert("Article "+data['id']);
        })
    })

    $(".lib").click(function () {
        var a=this.id;
        alert(this.id);
        $.post('/users/addtoli',{
            uid:document.getElementById('iu').value,
            bid:a,
            m:'b'
        },function (data) {
            alert("Book"+data['id']);
        })
    })

    $(".lia").click(function () {
        var a=this.id;
        alert(this.id);
        $.post('/users/addtoli',{
            uid:document.getElementById('iu').value,
            bid:a,
            m:'a'
        },function (data) {
            alert("Article "+data['id']);

        })
    })
    $("#shelfart").hide();

    $("#toggleshelf").click(function () {
        var a=$("#toggleshelf").attr("value");
        alert(a);
         if(a=='Show Article Shelf'){
            $("#toggleshelf").val("Show Book Shelf");
            $("#togshe").html('Article Shelf')
             $("#shelfart").show();
             $("#shelfbook").hide();


         }
        else {
            $("#toggleshelf").val("Show Article Shelf");
            $("#togshe").html('Book Shelf');
             $("#shelfart").hide();
             $("#shelfbook").show();


         }
    })

    $(".shrb").click(function () {
    //    alert(this.id)
        var a=this.id;
        var shid=document.getElementById("hbid"+a).value;
        alert(shid);
        $.post('/shelf_del',{
            shid:shid
        },function (data) {
            alert("Book "+data['id']);
            location.reload()
        })
    })

    $(".shra").click(function () {
         var a=this.id;
        var shid=document.getElementById("haid"+a).value;
    //    alert(shid);
       $.post('/shelf_del',{
 shid:shid
        },function (data) {
alert("Artical "+data['id']);
location.reload()
        })
    })


});

