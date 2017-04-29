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

Router.route('/player', function(){
    this.render('navigation', {
        to:"top"
    });
    this.render('player', {
        to:"main"
    });
});

if (Meteor.isServer) {
var fs = Npm.require('fs');
Router.route('audio', {
   name: 'audio',
   path: /^\/audio\/(.*)$/,
   where: 'server',
   action: function() {
     var filePath = Meteor.absolutePath + '/.audio/' + this.params[0];
     var data = fs.readFileSync(filePath);
     this.response.writeHead(200, {
         'Content-Type': 'audio'
     });
     this.response.write(data);
     this.response.end();
   }
});
}
