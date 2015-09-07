Meteor.publish("stocks", function () {
	return Stocks.find({id: this.userId});
});