if (Meteor.isClient) {
  
  Meteor.subscribe('gaslistsCollection');

  
  Template.userGaslists.helpers({
    gaslists: function() {
      this._id = Meteor.userId();
      Session.set('currentUser', this._id);
      var userGasLists = gaslistsCollection.find({_id: this._id});
      var count = userGasLists.count();
      console.log(userGasLists);
      console.log(count);
      Session.set('userGasLists', userGasLists);
      if (count > 0) {
        return true;
      }else{
        return false;
      }
    }
  });
  
  Template.userGaslists.events({
    'submit #createGaslist': function(evt){
        evt.preventDefault();
        var gaslistName = evt.target.gaslistName.value;
        console.log('submit: '+gaslistName);
      
        gaslistsCollection.insert({
          listName: gaslistName,
          createdBy: this._id
        });
    }
  });

}

if (Meteor.isServer) {
  gaslistsCollection = new Mongo.Collection('gaslistsCollection');
  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.publish('gaslistsCollection', function(){
        return gaslistsCollection.find()
    });
  });
}
