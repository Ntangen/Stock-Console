Template.stockTable.helpers ({
	stocks: function (){
	return Stocks.find({}, {sort: {symbol:1}});
	}
});