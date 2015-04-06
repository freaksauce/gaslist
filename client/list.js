Meteor.subscribe('gaslistsCollection');

Template.showGaslist.helpers({
  gaslistName: function() {
    var list = Session.get('gaslist');
    return list.listName;
  }
});

Template.listItems.helpers({
  gaslistId: function() {
      var list = Session.get('gaslist');
      return list._id;
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
        $('input[name=item]').val('');
        console.log(result);
      }
    });
  }
});

Template.listItems.events({
  'click .delete': function(evt) {
    console.log('delete');
    evt.preventDefault();
    var itemUrl = evt.target.getAttribute('data-href');
    var listId = evt.target.getAttribute('data-listid');
    var itemId = evt.target.getAttribute('data-id');
    console.log(itemUrl+' itemUrl');

    Meteor.call('removeItemFromGasList', listId, itemId, function(err, result) {
      if (err) {
        console.log('[ERROR]:\n');
        console.log(err);
        return;
      }
      if (result) {
        console.log(result);
        var list = Session.get('gaslist');
        $('.msg').text(itemUrl+' was removed from Gaslist - '+list.name);
        setTimeout(function() {
          $('.msg').fadeOut(500, function() {
            $(this).text('');
          });
        }, 2000);
      }
    });
  }
});
