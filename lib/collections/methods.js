Meteor.methods ({
	stockInsert: function (userSymbol){
		var googURL = "https://www.google.com/finance/info?q="
			+ "NASDAQ" + ":" + userSymbol;  // need to add this.exchange
		var result = HTTP.get(googURL, function (err, res) {
			if (res.statusCode===200){
				var responseStr = res.content.substr("////".length);
				var responseArray = JSON.parse(responseStr);
					stockObj = {
					symbol: userSymbol,
					price: responseArray[0].l,
					change: responseArray[0].c,
					changePct: responseArray[0].cp,
					asof: responseArray[0].lt,
					id: Meteor.user()._id,
					user: Meteor.user().username
					};	
		if (Meteor.isServer) {
		var stockId = Stocks.insert(stockObj);
		console.log("inserted w/ID: " + stockId);
		} else return	
		} });
	}, 

	refresh: function (){
		var cursor = Stocks.find();
		cursor.forEach(function (doc) {
			var googURL = "https://www.google.com/finance/info?q="
						+ "NASDAQ" + ":" + doc.symbol;  // works with any exchange
			var result = HTTP.get(googURL, function (err, res) {
			if (res.statusCode===200){
				var responseStr = res.content.substr("////".length);
				var responseArray = JSON.parse(responseStr);
				var pricenow = (Stocks.findOne({symbol:doc.symbol}).shares * responseArray[0].l).toFixed(2);
				stockObj = {
					symbol: doc.symbol,
					price: responseArray[0].l,
					change: responseArray[0].c,
					changePct: responseArray[0].cp,
					asof: responseArray[0].lt,
					mktprice: pricenow
					};	
				if (Meteor.isServer) {
				Stocks.update({symbol:doc.symbol}, 
					{$set:{price:stockObj.price,change:stockObj.change,asof:stockObj.asof, changePct:stockObj.changePct,mktprice:stockObj.mktprice}} );
					if (doc.portfolio===1){
						var gainloss = Number((doc.price * doc.shares) - (doc.purchPrice * doc.shares)).toFixed(2);
						var gainlossPct = ((((doc.price * doc.shares) / (doc.purchPrice * doc.shares))-1)*100).toFixed(0) + "%";
						Stocks.update({symbol:doc.symbol},{$set:{gainloss: gainloss, gainlossPct: gainlossPct}});
					}	}
				} 
			});
		console.log("refreshed panel");
		});
	},
	
	remove: function(stockToRemove){
		if (Meteor.isServer) {
		console.log("remove checkin");
		Meteor.setTimeout(function () {
			Stocks.remove({symbol:stockToRemove});
		}, 600);
		}
	},

	removePort: function(stockToRemove){
		if (Meteor.isServer) {
		Meteor.setTimeout(function () {
			var result = Stocks.update({symbol:stockToRemove}, {$set:{portfolio:0}});
			console.log("removed from portfolio: " + result);
		}, 600);
		}
	},

	removeWL: function(stockToRemove){
		if (Meteor.isServer) {
		Meteor.setTimeout(function () {
			var result = Stocks.update({symbol:stockToRemove}, {$set:{portfolio:0, shares:0}});
			console.log("removed from tracking: " + result);
		}, 600);
		}
	},

	add: function(stocktoAdd, purchPrice, shares) {
		if (Meteor.isServer){
		var startValue = (purchPrice * shares).toFixed(2);
		var todayValue = (Stocks.findOne({symbol:stocktoAdd}).price * shares).toFixed(2);
		var gainloss = Number((todayValue - startValue).toFixed(2))
		var gainlossPct = (((todayValue / startValue)-1)*100).toFixed(0) + "%";
		var result = Stocks.update({symbol:stocktoAdd}, {$set: {portfolio: 1, purchPrice: purchPrice, shares: shares}});
		console.log ("Entries changed: " + result);
			}
	},

	postSaleAdd: function(stocktoAdd, soldPrice, shares){
		if (Meteor.isServer){
		console.log("postsale method");
		console.log(stocktoAdd + " " + soldPrice);
			if (!shares) {

			var result = Stocks.update({symbol:stocktoAdd}, {$set: {portfolio: 2, soldPrice: soldPrice}});
			console.log ("Entries changed: " + result);
				}
			else {  
			var result = Stocks.update({symbol:stocktoAdd}, {$set: {portfolio: 2, shares: shares, soldPrice: soldPrice}});
			console.log ("Entries changed: " + result);
			} 
		} 
	}

});
