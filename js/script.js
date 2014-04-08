
function addComment(){
	$(document).ready(function(){

		var email = $("[name=email]").val();
		var comment = $("#comment_area").val();

		$.post('addComment.php', {Email: email, Comment: comment}, function(data){

			data = $.parseJSON(data);

			if(data[0].status === "good"){

				$(".comments").after(
				'<div class="date"><p>'+ new Date() + '</p></div>'
				+'<div class="email">'+ getUserName() + '</div>' 
				+'<div class="comment"><p>'+ $("#comment_area").val() + '</p></div>');
				
				$("[name=email]").val("");
				$("#comment_area").val("");
			}
		});
		return false;
	});
}

function getUserName(){

		var email = $("[name=email]").val();
		if(email.indexOf("@")> 0){
			var emailTrimmed = email.substring(0,email.indexOf("@"));
			return emailTrimmed;
		}

		return email;

	
}

function rotateBanner(element, source){

	$.post('banner.html',function(data){
		data = $.parseJSON(data);
		var i = 0;
		$(element).html('<a href="'+data[i].link+'"><img src="'+data[i].image+'" alt="'+data[i].alt+'"></a>');

		setInterval(function(){

			console.log(data[i]);
			$(element).html('<a href="'+data[i].link+'"><img src="'+data[i].image+'" alt="'+data[i].alt+'"></a>');

			if(i == data.length-1){
				i = 0;
			}
			else{
				i++;
			}


		}, 7000);
	});
}


function removeCartItem(element) {

	$(document).ready(function(){

		$(".remove_item").click(function(){

			$(this).closest(element).remove();

		});
	});
}


function validateForm(){

	$(document).ready(function(){

			var name = isName($("[name=name]").val());
			var address = isAddress($("[name=address]").val());
			var city = isCity($("[name=city]").val());
			var email = isEmail($("[name=email]").val());
			var phone = isPhoneNumber($("[name=phone]").val());
			var shipping = isShipping();
			var state = isState();

	
			var abort = false;
			$("div.error").remove();

			$("input").each(function(){

				if($(this).val() === ''){

					$(this).after('<div class="error">This field is required</div>');
					abort = true;
				}
			});
			if(!name){
				$("[name=name]").after('<div class="error">Please enter a valid name &quot;First Last&quot</div>');
				abort = true;
			}
			if(!address){
				$("[name=address]").after('<div class="error">Please enter a valid address &quot;1234 E washington&quot</div>');
				abort = true;
			}
			if(!city) {
				$("[name=city]").after('<div class="error">Please enter a valid City</div>');
				abort = true;
			}
			if(!email) {
				$("[name=email]").after('<div class="error">Please enter a valid email &quot;email@example.com&quot;</div>');
				abort = true;
			}
			if(!phone) {
				$("[name=phone]").after('<div class="error">Please enter a valid phone Number &quot;555-555-5555&quot;</div>');
				abort = true;
			}
			if(!shipping) {
				$(".shipping_kind").after('<div class="error">Please select a valid shipping method</div>');
				abort = true;
			}
			if(!state) {
				$("select").after('<div class="error">Please select a valid state</div>');
				abort = true;
			}

			if(abort) {

				return false;
			} 
			else { 
				$(".shipping_submit").submit();
				window.location.href="total.html"
				return true;
			}

	});

}


function isName(name) {
  var regex = /^[a-zA-Z ]+$/;
  return regex.test(name);
}
function isAddress(address) {
  var regex = /^[a-zA-Z0-9 ]+$/;
  return regex.test(address);
}
function isCity(city) {
  var regex = /^[a-zA-Z]+$/;
  return regex.test(city);
}
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function isPhoneNumber(p) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = p.replace(/\D/g, "");
  return (digits.match(phoneRe) !== null);
}
function isState(){
	if($("select").val() === ''){
		return false;
	}
	else{
		return true;
	}

}
function isShipping(){
		var shipping = $("#nextDay:checked").val();
		var shipping2 = $("#second:checked").val();
		var shipping3 = $("#ground:checked").val();
		if(shipping =="nextDay"){
			return true;
		}
		if(shipping2 =="secondDay"){
			return true;
		}
		if(shipping3 == "ground"){
			return true;
		}
		return false;
}







