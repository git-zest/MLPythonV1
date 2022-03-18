$(".next1").on("click", function () {
	if (validate1()) {
		$('.active').next().addClass('active');
		$('.f1').hide();
		$('.f2').show();
	} else {
		$('#notify1').html('Enter the valid DB Name');
	}
});

$(".next2").on("click", function () {
	if (validate2()) {
		$('.active').next().addClass('active');
		$('.f1').hide();
		$('.f2').hide();
		$('.f3').show();
	}

});

$(".previous1").on("click", function () {
	$('.active').next().removeClass('active');
	$('.f1').show();
	$('.f2').hide();
});

$(".previous2").on("click", function () {
	$('.active').next().next().removeClass('active');
	$('.f3').hide();
	$('.f2').show();
});


function validate1() {
	var fname, lname, contact;
	s_name = $(".s_name").val();
	console.log(s_name);
	if (s_name === '') {
		return false;
	}
	else if (s_name.includes(" ")) {
		return false;
	}else{
			return true;
	}
}

function validate2() {
	var fname, lname, contact;
	url = $("#url").val();
	if (url === '') {
		$('#notify2').html('You must enter the valid URL!!');
		return false;
	}
	return true;
}
