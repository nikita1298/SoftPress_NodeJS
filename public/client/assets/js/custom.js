$("#mbg").hide();
	$(document).ready(function () {
		$("#mbg").hide();
		if ($(window).width() < 760) {

			$("#fors").hide();
			$("#mbg").show();
//document.getElementById("mbg").style.display="inline");

		} else {
			$("#fors").show();
			$("#mbg").hide();
			// document.getElementById("mbg").style.display="none";
		}
		if($(window).width()<895 ){
		 $("#acc").hide();
            document.getElementById("acc").style.display="none";
		}
		else {
            $("#acc").show();
            document.getElementById("acc").style.display="block";

        }


		$(window).resize(function () {
			//alert($(window).width());

			if ($(window).width() < 760) {
				$("#fors").hide();
				$("#mbg").show();
				 //document.getElementById("mbg").style.display="inline";
				
			} else {
				$("#fors").show();
				$("#mbg").hide();
				// document.getElementById("mbg").style.display="block";

			}


		});
	//	alert("The paragraph was clicked." + $(window).width());
	});
$(window).resize(function () {
    if($(window).width() <895 ){
        $("#acc").hide();
        document.getElementById("acc").style.display="none";

    }
    else {
        $("#acc").show();
        document.getElementById("acc").style.display="block";

    }
})