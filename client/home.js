Template.home.events({
	'submit .top-submit': function(e) {
	e.preventDefault();	
	console.log("primary submit flag");
		var userSymbol = $("input").val().toUpperCase();
		if (Stocks.findOne({symbol: userSymbol})) {
			return alert ("This stock is already listed.");
			}
		Meteor.call('stockInsert', userSymbol, function (error, result){
			if (error) console.log(error);
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

