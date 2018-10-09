



function makeHTML(name,number){
		console.log("Making HTML");
	 	
	 	 var nameHTML = "<p class ='cuisine-text'>"+number+ "." + name.cuisine.cuisine_name + "</p>" ;
	     $('#results').append(nameHTML);	
	}

function makeHTML2(){
		console.log("Making HTML");
	 	 
	 	 var nameHTML = "<p class='city-text'>Zomato does not operate in this area. Please use a different city.</p>" ;
	     $('#results').html(nameHTML);	
	}



function getZomato(longitude,latitude){
	console.log("About to make Zomato Request");

	
	var zomatoURLSearch = "https://developers.zomato.com/api/v2.1/cuisines?lat=" + latitude + "&lon="+ longitude;
	
	

	$.ajax({
		url : zomatoURLSearch,
		type : 'GET',
		dataType : 'json',
		async:true,
		beforeSend: function(xhr){xhr.setRequestHeader('user-key','ca1258c466ea1b484cc098284e3eb6a9');},

		error : function(err){
			console.log("You messed up");
			console.log(err);
			makeHTML2("Please type a different city.");
		},

		success : function(data){
			console.log("Getting data");
			console.log(data);

			var zomatoSearchResult = data.cuisines;
			console.log(zomatoSearchResult.length);

			for (var i = 0; i < zomatoSearchResult.length; i++){
				makeHTML(zomatoSearchResult[i],i+1);
				//getZomatolink(longitude,latitude,zomatoSearchResult[i].cuisine.cuisine_id,zomatoSearchResult[i]);
			}
		} 
	});
}



function getGeoTag(searchTerm){

	var GeoTagURL = "http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=" + searchTerm;

	

	console.log("About to make GeoTag request.");

	$.ajax({
		url : GeoTagURL,
		type : 'GET',
		dataType : 'jsonp',
		error : function(err){
			console.log("Uh oh???");
			console.log(err);
			makeHTML2();

		},
		success : function(data){
			console.log("WooHoo!!!");
			console.log(data);
			console.log(data.results[0].geometry.location.lng);
			 var longitude = data.results[0].geometry.location.lng;
			 var latitude  = data.results[0].geometry.location.lat;

			
			//makeHTML(longitude,latitude);
			
			getZomato(longitude,latitude);
		} 
	});
	console.log("Waiting...");
}


$('#the-button').click(function(){

	$('#results').html("");
	var theInput = $('#the-input').val();
	console.log(theInput);
	getGeoTag(theInput);
});

// $(document).ready(function(){
// 	console.log("The document is ready!");
// 	getGeoTag(theInput);
// });