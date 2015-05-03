Meteor.startup(function () {
  Meteor.publish('gaslistsCollection', function(){
   return gaslistsCollection.find()
  });
});

Meteor.methods({
  addGaslist: function(gaslistName) {
    console.log('METHOD: addGaslist');
    var currentUserId = Meteor.userId();
    if (gaslistName == '') {
      return false;
    }
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
    return gaslistsCollection.update(gaslistId, {$push: {items: item}});
  },
  removeItemFromGasList: function(gaslistId, item) {
    console.log('METHOD: removeItemFromGasList');
    var gaslist = gaslistsCollection.findOne({_id: gaslistId});
    return gaslistsCollection.update({_id: gaslistId}, {$pull: {items: item}});
  },
  'scrapepage': function(pageUrl) {
    console.log('scraping');
    data = Scrape.website(pageUrl);
    return data;
  }
});
