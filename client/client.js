Meteor.subscribe('gaslistsCollection');

Template.userGaslists.helpers({
  hasGaslists: function() {
    this._id = Meteor.userId();
    Session.set('currentUser', this._id);
    var userGasLists = gaslistsCollection.find({createdBy: this._id});
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
  'submit #createGaslist': function(evt){
      evt.preventDefault();
      gaslistName = evt.target.gaslistName.value;
      Session.set('gaslistName', gaslistName);
      console.log('submit: '+gaslistName);

      var checkExists = gaslistsCollection.find({
        listName: gaslistName
      });
      console.log(checkExists);
      // if (!checkExists) {
        var addList = Meteor.call('addGaslist', gaslistName, function(err, result) {
          if (err) {
            console.log('[ERROR]:\n');
            console.log(err);
            return;
          }
          if (result) {
            $('input[name=gaslistName]').val('');
            $('.msg').text('Your gaslist "'+Session.get('gaslistName')+'" was created.');
            Session.set('gaslistName', '');
            console.log('list added');
          }
        });
//
      // }else{
      //   $('.errorMsg').text('This gaslist name is already in use');
      //   $('input[name=gaslistName]').val('');
      // }
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
