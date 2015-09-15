Template.stockItem.events({
	'click #remove': function(e) {
		e.preventDefault();	
		var stockToRemove = this.symbol;
		Meteor.call('remove', stockToRemove, function (error, result){
			$("#"+stockToRemove).parent().parent().fadeOut();
			if (error) console.log(error);
	});
	},

	'click #add': function(e) {
		e.preventDefault();
		var stocktoAdd = this.symbol;
		if (Stocks.findOne({symbol: stocktoAdd}).portfolio ===1) {
			return alert ("This stock is already in your portfolio.");
			}
		$(':focus').popover({
				html: true,
				container: 'body',
				content: function(){
					return $('#hidden-content').html();
					}
			});
		$(':focus').popover('show');
		// var purchPrice = $('#purchprice').val();
		// var shares = document.getElementById('shares').value;
		// $('#poptarget-'+this.symbol).submit(function (e){
		// 	e.preventDefault();
		// 	console.log("HELLO");
			// console.log(shares + " shares at " + purchPrice + " per share.");
			// Meteor.call('add', stocktoAdd,purchPrice, shares, function (error,result){
			// 	if (error) console.log(error)
		// });
	},

	'submit form': function(e){
		e.preventDefault();
		console.log("HELLO");
	}

});

Template.stockItem.onRendered(function() {
	$('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
	});
 });