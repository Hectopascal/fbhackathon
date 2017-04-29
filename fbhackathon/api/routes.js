Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function (){
    this.render('navigation', {
        to:"top"
    })
    this.render('Main', {
        to:"main"
    });
});

Router.route('/register', function () {
  this.render('navigation', {
    to:"top"
  });   
  this.render('register', {
    to:"main"
  });
});

Router.route('/home', function () {
  this.render('navigation', {
    to:"top"
  });
  this.render('Home', {
    to:"main"
  });
});

Router.route('/login', function(){
    this.render('navigation', {
        to:"top"
    });
    this.render('login', {
        to:"main"
    });
});

Router.route('/profile', function(){
    this.render('navigation', {
        to: "top"
    });
    this.render('profile', {
        to: "main"
    });
});