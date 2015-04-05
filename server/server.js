Meteor.startup(function () {
  Meteor.publish('gaslistsCollection', function(){
   return gaslistsCollection.find()
  });
});

Meteor.methods({
  addGaslist: function(gaslistName) {
    var currentUserId = Meteor.userId();
    return gaslistsCollection.insert({
      listName: gaslistName,
      createdBy: currentUserId
    });
  },
  removeGaslist: function(gaslistId) {
    return gaslistsCollection.remove({
      _id: gaslistId
    })
  }
});
