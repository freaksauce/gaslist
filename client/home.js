Meteor.subscribe('gaslistsCollection');

Template.userGaslists.created = function() {
  this.gaslistName = new ReactiveVar;
}

Template.userGaslists.helpers({
  hasGaslists: function() {
    var userGasLists = gaslistsCollection.find({createdBy: Meteor.userId()});
    var count = userGasLists.count();
    // console.log(userGasLists.fetch());
    // console.log(count);
    if (count > 0) {
      return true;
    }else{
      return false;
    }
  },
  gaslists: function() {
    return gaslistsCollection.find({createdBy: Meteor.userId()});
  }
});

Template.userGaslists.events({
  'submit #createGaslist': function(evt, template){
      evt.preventDefault();
      gaslistName = evt.target.gaslistName.value;
      template.gaslistName.set(gaslistName);
      console.log('submit: '+gaslistName);

      var checkCollection = gaslistsCollection.find({
        listName: gaslistName
      });
      var checkExists = checkCollection.count();
      if (checkExists == 0) {
        var addList = Meteor.call('addGaslist', gaslistName, function(err, result) {
          if (err) {
            console.log('[ERROR]:\n');
            console.log(err);
            return;
          }
          if (result) {
            $('input[name=gaslistName]').val('');
            $('.msg').text('Your gaslist "'+template.gaslistName.get()+'" was created.');
            setTimeout(function() {
              $('.msg').fadeOut(500, function() {
                $(this).text('').fadeIn();
              });
            }, 2000);
            Session.gaslistName.set('');
            // console.log('list added');
          }
        });

      }else{
        $('.errorMsg').text('This gaslist name is already in use');
        setTimeout(function() {
          $('.errorMsg').fadeOut(500, function() {
            $(this).text('').fadeIn();
          });
        }, 2000);
        $('input[name=gaslistName]').val('');
      }
  },
  'click .delete': function(evt) {
    console.log('delete');
    evt.preventDefault();
    var listId = evt.target.getAttribute('data-id');
    Meteor.call('removeGaslist', listId, function(err, result) {
      if (err) {
        console.log('[ERROR]:\n');
        console.log(err);
        return;
      }
      if (result) {
        console.log('Result: '+result);
      }
    });
  }
});
