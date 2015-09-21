Template.portItem.events({
	'click #remove': function(e) {
		e.preventDefault();
		if (confirm("Remove this stock from your portfolio?")){
			var stockToRemove = this.symbol;
			Meteor.call('removePort', stockToRemove, function (error, result){
			$("#"+stockToRemove).parent().parent().fadeOut();
			if (error) console.log(error);
				});
		}
	}
});

Template.portItem.helpers({
	costbasis: function (){
		var total = this.purchPrice * this.shares
		return total.toFixed(2)
	},
	mktprice: function (){
		var total = this.price * this.shares
		return total.toFixed(2)
	},
	gainloss: function (){
		var total = (this.price * this.shares)-(this.purchPrice * this.shares)
		return total.toFixed(2)
	},
	glpercent: function(){
		var total = ((((this.price * this.shares) / (this.purchPrice * this.shares))-1)*100)
		return total.toFixed(1)
	}

})