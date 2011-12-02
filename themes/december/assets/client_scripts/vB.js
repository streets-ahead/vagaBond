$(document).ready(function(){

	$('#modal-form').hide() //fixes issue where page renders with modal box over navigation
	
	$(document).keyup(function(e){
		if(e.keyCode==27){ //ESC key pressed
			$('#modal-form').modal({keyboard: true, backdrop: 'static'})
		}
	})

})