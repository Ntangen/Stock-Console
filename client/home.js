Template.home.events({
	'submit': function(e) {
	e.preventDefault();	
	console.log("TEMP");
	var userSymbol = $("input").val().toUpperCase();
	if (Stocks.findOne({symbol: userSymbol})) {
		return alert ("This stock is already listed.");
		}
	Meteor.call('stockInsert', userSymbol, function (error, result){
		if (error) console.log(error);
		// if (result.stockExists===true) return alert ("This stock is already listed.");
		});
	$("#userSymbol").val("");
	$("#exchange").val("");
	},

	'click #refresh': function(e){
	e.preventDefault();	
	Meteor.call('refresh', function (error, result){
		if (error) console.log(error);
	});

	}

});

