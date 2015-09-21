Template.portfolio.helpers ({
	stocks: function (){
	return Stocks.find({portfolio: 1}, {sort: {symbol:1}});
	},

	priceTotal: function(){
		var total = 0;
		Stocks.find({portfolio:1}).forEach(function(doc){
			total += (doc.price * doc.shares);
			});
		return total.toFixed(2);
	},

	costbasis: function(){
		var total = 0;
		Stocks.find({portfolio:1}).forEach(function(doc){
			total += (doc.purchPrice * doc.shares);
			});
		return total.toFixed(2);
	},

	gainlossTotal: function(){
		var total = 0;
		Stocks.find({portfolio:1}).forEach(function(doc){
			total += (doc.price * doc.shares)-(doc.purchPrice * doc.shares);
			});
		return total.toFixed(2);	
	},

	gainlossPctTotal: function(){
		var startTotal = 0, endTotal = 0, pct = 0;
		Stocks.find({portfolio:1}).forEach(function(doc){
			startTotal += (doc.purchPrice * doc.shares);
			endTotal += (doc.price * doc.shares);
			});
		pct = (((endTotal/startTotal)-1)*100).toFixed(1);
		return pct;
	}
});