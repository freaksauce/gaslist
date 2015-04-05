gaslistsCollection = new Mongo.Collection('gaslistsCollection');

Router.route('/', function () {
  this.render('gaslistContent');
});

// Router.route('/gaslist', function () {
//   this.render('Items');
// });

Router.route('/gaslist/:_id', function () {
  var list = gaslistCollection.findOne({_id: this.params._id});
  this.render('ShowGaslist', {data: list});
});
