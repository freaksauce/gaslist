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
  'click .modal-trigger': function(evt) {
    var modalId = evt.target.getAttribute('href');
    $(modalId).openModal();
  }
});

Template.addItemModal.events({
  'click button#get-info': function(evt, template) {
    // get url field value
    // add url validation
    var url = template.find('#gas-url').value;
    // if url is empty exit and make field invalid
    if (url === '') {
      template.$('#gas-url').addClass('invalid');
      return false;
    }
    console.log(url);

    // hide find button
    template.$('#get-info').addClass('hide');
    // show progress bar
    template.$('.loading').removeClass('hide');

    // call scrapepage to get page title and image from url
    Meteor.call('scrapepage', url, function(error, result) {
      if (error) {
        console.log(error);
      }else{
        console.log(result);
        // hide progress bar
        template.$('.loading').addClass('hide');
        // show details container
        template.$('.scrape-details').removeClass('hide');
        if (result.title !== '') {          
          template.$('#gas-item-title').val(result.title);
        }else{
          console.log('no title');
          template.$('#gas-item-title').focus().addAttribute('placeholder','Please add a title');
        }
        // template.$('#gas-item-description').val(result.description);
        if (result.image !== '') {          
          template.$('#gas-item-image').attr('src',result.image);
        }else{
          console.log('no image');
        }

        template.$('.confirm-item').removeClass('hide');
      }
    });
  },
  'submit #addItemToGaslist': function(evt, template) {
    console.log('submit');
    evt.preventDefault();
    var listId = evt.target.getAttribute('data-id');
    var item = {id: Date.now(), url: template.$('#gas-url').val(), title: template.$('#gas-item-title').val(), image: template.$('#gas-item-image').attr('src')};
    console.log(item);
    if (item.url === '' || item.title === '') {
      template.$('#gas-url').addClass('invalid');
      template.$('#gas-item-title').addClass('invalid');
      return false;
    }
    Meteor.call('addItemToGaslist', listId, item, function(err, result) {
      if (err) {
        console.log('[ERROR]:\n');
        console.log(err);
        return;
      }
      if (result) {
        template.$('#gas-url').val('');
        template.$('#gas-item-title').val('');
        // template.$('#gas-item-description').val('');
        template.$('#gas-item-image').attr('src','');
        template.$('.scrape-details').addClass('hide');
        template.$('#modal1').closeModal();
        console.log(result);
      }
    });
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
