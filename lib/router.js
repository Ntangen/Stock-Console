Router.route('/', function() {
	this.render('landing');
});

// Router.route('/home', function() {
// 	this.render('home');
// });

var requireLogin = function(){
	if (! Meteor.user()) {
		if (!Meteor.loggingIn()){
			this.render(this.loadingTemplate);
		} else {
			this.next();
		}
		this.render('accessDenied');
	} else {
		this.render('home');
	}
}

Router.onBeforeAction(requireLogin, {only:'home'});