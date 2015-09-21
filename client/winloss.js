Template.winloss.events({
	'submit .form-inline': function(e) {
		e.preventDefault();   
		var symbol = document.getElementById('inputSymbol').value.toUpperCase();
		var soldPrice = Number(document.getElementById('soldPrice').value);
		var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
		if (!regex.test(soldPrice)){
			$("#inputSymbol").val("");
			$("#soldPrice").val("");
			return alert("Sale price must be entered in XX.YY format");
			} 
		if (!Stocks.findOne({symbol: symbol})) {
			$("#inputSymbol").val("");
			$("#soldPrice").val("");
			return alert("This stock isn't in your portfolio.");
			}
		if (Stocks.findOne({symbol: symbol, portfolio: 2})) {
			$("#inputSymbol").val("");
			$("#soldPrice").val("");
			return alert("This stock is already being tracked below.") }
		if (!Stocks.findOne({symbol:symbol}).shares) {
			var shares = prompt("There are no shares saved. How many shares did you own?")
				if (!shares || shares === "0") { 
					$("#inputSymbol").val("");
					$("#soldPrice").val("");
					alert("Must input a number of shares.");
					return; 
				} else {
				$("#inputSymbol").val("");
				$("#soldPrice").val("");
				}	}
		Meteor.call('postSaleAdd', symbol, soldPrice, shares, function (error, result){
			if (error) console.log(error);
			});
		$("#inputSymbol").val("");
		$("#soldPrice").val("");
	}
});

Template.winloss.helpers({
	stocks: function (){
	return Stocks.find({portfolio: 2}, {sort: {symbol:1}});
	}
});