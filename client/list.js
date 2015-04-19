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
  // 'submit #addItemToGaslist': function(evt) {
  //   evt.preventDefault();
  //   var listId = evt.target.item.getAttribute('data-id');
  //   var item = {id: Date.now(), url: evt.target.item.value};
  //   Meteor.call('addItemToGaslist', listId, item, function(err, result) {
  //     if (err) {
  //       console.log('[ERROR]:\n');
  //       console.log(err);
  //       return;
  //     }
  //     if (result) {
  //       $('input[name=item]').val('');
  //       console.log(result);
  //     }
  //   });
  // },
  'click .modal-trigger': function(evt) {
    var modalId = evt.target.getAttribute('href');
    $(modalId).openModal();
  }
});

Template.addItemModal.events({
  'click button#get-info': function(evt, template) {
    var url = template.find('#gas-url').value;
    console.log(url);

    // hide find button
    template.$('#get-info').addClass('hide');
    // show progress bar
    template.$('.loading').removeClass('hide');

    Meteor.call('scrapepage', url, function(error, result) {
      if (error) {
        console.log(error);
      }else{
        console.log(result);
        // hide progress bar
        template.$('.loading').addClass('hide');
        
        template.$('.scrape-details').removeClass('hide');
        template.$('#gas-item-title').val(result.title);
        // template.$('#gas-item-description').val(result.description);
        template.$('#gas-item-image').attr('src',result.image);

        template.$('.confirm-item').removeClass('hide');
      }
    });
  },
  'submit #addItemToGaslist': function(evt, template) {
    evt.preventDefault();
    var listId = evt.target.getAttribute('data-id');
    var item = {id: Date.now(), url: template.$('#gas-url').val(), title: template.$('#gas-item-title').val(), image: template.$('#gas-item-image').attr('src')};
    console.log(item);
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
