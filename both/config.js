gaslistsCollection = new Mongo.Collection('gaslistsCollection');

Router.route('/', function () {
  this.render('userGaslists');
});

Router.route('list', {
  path: '/gaslist/:_id',
  layoutTemplate: 'showGaslist',
  action: function() {
    var list = gaslistsCollection.findOne({_id: this.params._id});
    this.render('ShowGaslist', {data: list});
  }
});
// Router.route('/gaslist/:_id', function () {
//   var list = gaslistsCollection.findOne({_id: this.params._id});
//   this.render('ShowGaslist', {data: list});
// });
