Router.route('/', function() {
	this.render('landing');
});

Router.route('/home', function() {
	this.render('home');
});

var requireLogin = function(){
	if (! Meteor.user()) {
		this.render('accessDenied');
	} else {
		this.render('home');
	}
}

Router.onBeforeAction(requireLogin, {only:'home'});