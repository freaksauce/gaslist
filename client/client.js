// Meteor.subscribe('gaslistsCollection');

Template.userGaslists.helpers({
  hasGaslists: function() {
    this._id = Meteor.userId();
    Session.set('currentUser', this._id);
    var userGasLists = gaslistsCollection.find({createdBy: this._id});
    var count = userGasLists.count();
    console.log(userGasLists.fetch());
    console.log(count);
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
      console.log('submit: '+gaslistName);

      var checkExists = gaslistsCollection.find({
        listName: gaslistName
      });
      console.log(checkExists);
      if (!checkExists) {
        gaslistsCollection.insert({
          listName: gaslistName,
          createdBy: Meteor.userId()
        });
        $('input[name=gaslistName]').val('');
        $('.msg').text('Your gaslist "'+gasListName+'" was created.')
      }else{
        $('.errorMsg').text('This gaslist name is already in use');
        $('input[name=gaslistName]').val('');
      }
  }
});
