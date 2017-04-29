Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(username, password, function(error){
        	if(error){
    			alert(error);
    		}
    		else{
    			Router.go('/home');
    		}
        });
    }
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            username: username,
            password: password
        }, function(error){
            if(error){
                alert(error.reason); // Output error if registration fails
            } 
            else{
                Router.go('/home');
            }
        });
    }
});

Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/login');
    }
});