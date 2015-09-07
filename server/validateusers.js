Accounts.validateNewUser(function(user){
	console.log ("VALIDATION CHECKIN");
	console.log("New user: "+ user.username);
	throw new Meteor.error("Password must be more than 4 characters.");
	return true;
});