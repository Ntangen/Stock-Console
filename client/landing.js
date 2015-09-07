Template.login.events({
	'submit': function(e){
	e.preventDefault();
	var u = document.getElementById('user').value;
	var p = document.getElementById('pass').value;
	Meteor.loginWithPassword(u, p, function(err){
		if (err) {
			console.log(err.message);
			$('[data-toggle="popover"]').popover({
				content: err.message
			});
			$('[data-toggle="popover"]').popover('show');
			setTimeout(function (){
			$('[data-toggle="popover"]').popover('toggle')},(5000));
			}
		});
	$("#target").trigger('reset');
	},

	'click #createacct': function(e){
		e.preventDefault();
		console.log("create acct checkin");
		var x = confirm("Create new account?")
			if (x==true) {
		var u = document.getElementById('user').value;
		var p = document.getElementById('pass').value;
		Accounts.createUser({username: u, password:p}, function(err){if (err) {
			console.log(err.message);
			$('[data-toggle="popover"]').popover({
				content: err.message
				});
			$('[data-toggle="popover"]').popover('show');
			setTimeout(function (){
				$('[data-toggle="popover"]').popover('toggle')},(5000));
			}
		});  
	$("#target").trigger('reset');
	} }
});

// Template.login.onRendered(function() {
// 	$('body').on('click', function (e) {
//     $('[data-toggle="popover"]').each(function () {
//         if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
//             $(this).popover('hide');
//         }
//     });
// 	});
//  });