Meteor.subscribe('stocks');


// interval works, just disabling for now

// setInterval(function(){
// 	Meteor.call('refresh', function (error, result){
// 	if (error) console.log(error);
// 	});
// }, 3000);