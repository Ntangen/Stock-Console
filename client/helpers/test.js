Template.test.helpers({
	foo: function (){
	Meteor.call('test', function (error, result){
		if (error) console.log(error);
	});
	}	
});