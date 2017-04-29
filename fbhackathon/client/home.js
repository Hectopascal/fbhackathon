Template.Home.events({
    'click .join': function(event){
        Router.go('/player?audioId=' + $(event.target).attr('audioId') + '&audioName=' + $(event.target).attr('audioName'));
    }
});
