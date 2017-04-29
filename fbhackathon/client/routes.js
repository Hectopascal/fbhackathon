Router.route('/', function () {
  this.render('register', {
    data: function () {}
  });
});

Router.route('/home', function () {
  this.render('Home', {
    data: function () {}
  });
});