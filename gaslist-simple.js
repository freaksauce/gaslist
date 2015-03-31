if (Meteor.isClient) {
  gaslistsCollection = new Mongo.Collection('gaslistsCollection');
  
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
        var val = evt.target.gaslistName.value;
        console.log('submit: '+val);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    
  });
}
