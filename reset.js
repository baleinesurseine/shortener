var mongoose = require('mongoose')
var config = require('./config')

var Url = require('./models/url')
var counter = require('./models/counter')

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name)

counter.remove({}, function (error) {
  if (error) {
    return console.log('An error occured while removing counter')
  }
  var cnt = counter({_id: 'url_count', seq: 0})
  cnt.save(function (error) {
    if (error) {
      return console.log('An error occured while saving counter')
    }
    Url.remove({}, function (error) {
      if (error) {
        return console.log('An error occured while removing all Urls')
      }
      mongoose.connection.close()
      return console.log('All Urls where erased')
    })
  })
})
