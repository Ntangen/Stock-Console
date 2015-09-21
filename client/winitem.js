Template.winItem.helpers({
	costbasis: function(){
		var total = Number(this.soldPrice * this.shares);
		return total.toFixed(2);
	},

	mktprice: function(){
		var total = Number(this.price * this.shares);
		return total.toFixed(2);
	},

	gainlossTotal: function(){
		var total = Number((this.price * this.shares) - (this.soldPrice * this.shares));
		return total.toFixed(2);
	},

	gainlossPctTotal: function(){
		var cost = 0, mktprice = 0, pct = 0;
		cost += Number((this.soldPrice * this.shares));
		mktprice += Number((this.price * this.shares));
		pct = (((mktprice/cost)-1)*100).toFixed(1);
		return pct;
	}

});

Template.winItem.events({
	'click #remove': function(e) {
		e.preventDefault();
		if (confirm("Stop tracking this stock?")){
			var stockToRemove = this.symbol;
			Meteor.call('removeWL', stockToRemove, function (error, result){
			$("#"+stockToRemove).parent().parent().fadeOut();
			if (error) console.log(error);
				});
		}
	}
});