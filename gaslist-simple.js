gaslistsCollection = new Mongo.Collection('gaslistsCollection');

if (Meteor.isClient) {
//   Meteor.subscribe('gaslistsCollection');
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
      
        var checkExists = gaslistsCollection.findOne({
          listName: gaslistName
        });
        console.log(checkExists);
        if (!checkExists) {
          gaslistsCollection.insert({
            listName: gaslistName,
            createdBy: this._id
          });
        }else{
          $('.errorMsg').text('This gaslist name is already in use');
        }    
    }
  });

}

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    // code to run on server at startup
//     Meteor.publish('gaslistsCollection', function(){
//         return gaslistsCollection.find()
//     });
  });
}
