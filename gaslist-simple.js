if (Meteor.isClient) {

  Template.loggedin.helpers({
    name: function() {
      console.log(this.userId);
      return this.userId;
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
