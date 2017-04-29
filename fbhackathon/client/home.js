Template.Home.events({
    'click .join': function(event){
        var next = '/player?audioId=' + $(event.target).attr('audioId') + '&audioName=' + $(event.target).attr('audioName');
        //Router.go(next);
        location.href = next;
    }
});
