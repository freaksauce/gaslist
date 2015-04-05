gaslistsCollection = new Mongo.Collection('gaslistsCollection');

Router.route('/', function () {
  this.layout('layoutMain');
  this.render('userGaslists');
});

Router.route('/gaslist/:_id', function () {
  this.layout('layoutMain');
  Session.set('gaslistId', this.params._id);
  var list = gaslistsCollection.findOne({_id: this.params._id});
  this.render('ShowGaslist', {data: list});
});
