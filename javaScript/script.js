$("#get-beer").on("click", function() {
    
    var beerId = $("#search-field").val();
	
	$.ajax({
		url: "http://api.brewerydb.com/v2/beer/" + beerId "/?key=cc12540abedfa669021307d4ba111d87",
		dataType: "JSON"
	}).done(function (data){
		$("#tips").text(data.value.joke);
	}).fail(function (data){
		console.log(data);
		$("#tips").text("Det gick inte att hämta ett tips.");
	});
	
});