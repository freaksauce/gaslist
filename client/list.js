Meteor.subscribe('gaslistsCollection');

Template.showGaslist.helpers({
  gaslistName: function() {
    var list = Session.get('gaslist');
    return list;
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
  },
  'click .modal-trigger': function(evt) {
    var modalId = evt.target.getAttribute('href');
    $(modalId).openModal();
  }
});

Template.listItems.events({
  'click .delete': function(evt) {
    // console.log('delete');
    evt.preventDefault();
    var itemUrl = evt.target.getAttribute('data-href');
    var listId = evt.target.getAttribute('data-listid');
    var itemId = evt.target.getAttribute('data-id');
    var item = this;
    // console.log(itemUrl+' itemUrl');

    Meteor.call('removeItemFromGasList', listId, item, function(err, result) {
      if (err) {
        console.log('[ERROR]:\n');
        console.log(err);
        return;
      }
      if (result) {
        var list = Session.get('gaslist');
        $('.msg').text(itemUrl+' was removed from Gaslist - '+list.listName);
        setTimeout(function() {
          $('.msg').fadeOut(500, function() {
            $(this).text('').fadeIn();
          });
        }, 2000);
      }
    });
  }
});
