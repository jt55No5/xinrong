
function showLocation(province , city , town) {
	
	var loc	= new Location();
	var title	= ['请选择省份' , '请选择城市' , '请选择地区'];
	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	})
	
	$('#loc_province').append(title[0]);
	$('#loc_city').append(title[1]);
	$('#loc_town').append(title[2]);
	
	
	$('#loc_province').change(function() {
		$('#loc_city').empty();
		$('#loc_city').append(title[1]);
		loc.fillOption('loc_city' , '0,'+$('#loc_province').val());
		$('#loc_town').empty();
		$('#loc_town').append(title[2]);
	})
	
	$('#loc_city').change(function() {
		$('#loc_town').empty();
		$('#loc_town').append(title[2]);
		loc.fillOption('loc_town' , '0,' + $('#loc_province').val() + ',' + $('#loc_city').val());
		if($("#loc_town").find("option").length == 1){ 
			var city_val = $('#loc_city').val();
			var city_text = $('#loc_city :selected').text();
			var v = '<option value="'+city_val+'">'+city_text+'</option>';
			$('#loc_town').append(v);
		}
	})
	
	$('#loc_town').change(function() {
		$('input[@name=location_id]').val($(this).val());
	})
	
	if (province) {
		loc.fillOption('loc_province' , '0' , province);
		
		if (city) {
			loc.fillOption('loc_city' , '0,'+province , city);
			
			if (town) {
				loc.fillOption('loc_town' , '0,'+province+','+city , town);
			}
		}
		
	} else {
		loc.fillOption('loc_province' , '0');
	}
		
}

function showLocation2(province , city , town) {
	
	var loc	= new Location();
	var title	= ['请选择省份' , '请选择城市' , '请选择地区'];
	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	})
	
	$('#wBox #loc_province').append(title[0]);
	$('#wBox #loc_city').append(title[1]);
	$('#wBox #loc_town').append(title[2]);
	
	
	$('#wBox #loc_province').change(function() {
		$('#wBox #loc_city').empty();
		$('#wBox #loc_city').append(title[1]);
		loc.fillOption('wBox #loc_city' , '0,'+$('#wBox #loc_province').val());
		$('#wBox #loc_town').empty();
		$('#wBox #loc_town').append(title[2]);
	})
	
	$('#wBox #loc_city').change(function() {
		$('#wBox #loc_town').empty();
		$('#wBox #loc_town').append(title[2]);
		loc.fillOption('wBox #loc_town' , '0,' + $('#wBox #loc_province').val() + ',' + $('#wBox #loc_city').val());
		if($("#wBox #loc_town").find("option").length == 1){ 
			var city_val = $('#wBox #loc_city').val();
			var city_text = $('#wBox #loc_city :selected').text();
			var v = '<option value="'+city_val+'">'+city_text+'</option>';
			$('#wBox #loc_town').append(v);
		}
	})
	
	$('#wBox #loc_town').change(function() {
		$('input[@name=location_id]').val($(this).val());
	})
	
	if (province) {
		loc.fillOption('wBox #loc_province' , '0' , province);
		
		if (city) {
			loc.fillOption('wBox #loc_city' , '0,'+province , city);
			
			if (town) {
				loc.fillOption('wBox #loc_town' , '0,'+province+','+city , town);
			}
		}
		
	} else {
		loc.fillOption('wBox #loc_province' , '0');
	}
		
}


