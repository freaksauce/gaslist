Meteor.subscribe('gaslistsCollection');

Template.listItems.helpers({
  gaslistId: function() {
      return Session.get('gaslistId');
  }
});

Template.addItems.events({
  'submit #addItemToGaslist': function(evt) {
    evt.preventDefault();
    var listId = evt.target.item.getAttribute('data-id');
    var item = {id: Date.now(), url: evt.target.item.value};
    Meteor.call('addItemToGaslist', listId, item, function(err, result) {
      if (err) {
        console.log('[ERROR]:\n');
        console.log(err);
        return;
      }
      if (result) {
        console.log(result);
      }
    });
  },
  'click .delete': function(evt) {
    evt.preventDefault();
    var listId = evt.target.getAttribute('data-listid');
    var itemId = evt.target.getAttribute('data-id');
    Meteor.call('removeItemFromGasList', listId, itemId, function(err, result) {
      if (err) {
        console.log('[ERROR]:\n');
        console.log(err);
        return;
      }
      if (result) {
        console.log(result);
      }
    });
  }
});
