Meteor.startup(function () {
  Meteor.publish('gaslistsCollection', function(){
   return gaslistsCollection.find()
  });
});

Meteor.methods({
  addGaslist: function(gaslistName) {
    console.log('METHOD: addGaslist');
    var currentUserId = Meteor.userId();
    return gaslistsCollection.insert({
      listName: gaslistName,
      items: [],
      createdBy: currentUserId
    });
  },
  removeGaslist: function(gaslistId) {
    console.log('METHOD: removeGaslist');
    return gaslistsCollection.remove({
      _id: gaslistId
    })
  },
  addItemToGaslist: function(gaslistId, item) {
    console.log('METHOD: addItemToGaslist');
    var gaslist = gaslistsCollection.findOne({_id: gaslistId});
    var items = gaslist.items;
    items.push(item);
    return gaslistsCollection.update(gaslistId, {items: items});
  },
  removeItemFromGasList: function(gaslistId, itemId) {
    console.log('METHOD: removeItemFromGasList');
    var gaslist = gaslistsCollection.findOne({_id: gaslistId});
    var items = gaslist.items;
    for(var i = 0; i < items.length; i++) {
      if(items[i].id == itemId) {
          items.splice(i, 1);
          break;
      }
    }
    return gaslistsCollection.update(gaslistId, {items: items});
  }
});
