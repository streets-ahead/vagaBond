$(document).ready(function(){
	
	$(document).keyup(function(e){
		if(e.keyCode==27){ //ESC key pressed
			$('#modal-form').modal({keyboard: true, backdrop: 'static'})
		}
	})

})