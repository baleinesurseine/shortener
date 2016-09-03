'use strict'
var express = require('express')
var sanitize = require('mongo-sanitize') // security
var helmet = require('helmet')
var app = express()
app.use(helmet())
app.use(helmet.hidePoweredBy())
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var config = require('./config')
var base58 = require('./base58.js')
var validator = require('validator')
var server = require('http').Server(app)

// grab the url model
var Url = require('./models/url')

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name, function (err) {
  if (err) throw err
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// static landing page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'))
})

// handle shorten POST
app.post('/api/shorten', function (req, res) {
  var longUrl = sanitize(req.body.url)
  var shortUrl = ''

  if (!validator.isURL(longUrl)) {
    console.log('Not a valid Url')
    return res.status(400).send({error: 'not a valid url'})
  }

  // check if url already exists in database

  Url.findOne({long_url: longUrl}, function (err, doc) {
    if (err) {
      return res.status(500).send({ error: 'Something failed!' })
    }
    if (doc) {
      shortUrl = config.webhost + base58.encode(doc._id)
      // the document exists, so we return it without creating a new entry
      res.send({
        'shortUrl': shortUrl,
        'longUrl': longUrl
      })
    } else {
      // since it doesn't exist, let's go ahead and create it:
      var newUrl = Url({
        long_url: longUrl
      })
      // save the new link
      newUrl.save(function (err) {
        if (err) {
          console.log(err)
          return res.status(500).send({ error: 'Something failed!' })
        }
        shortUrl = config.webhost + base58.encode(newUrl._id)
        res.send({
          'shortUrl': shortUrl,
          'longUrl': longUrl
        })
      })
    }
  })
})

app.get('/api/urls', function (req, res) {
  Url.find({}, function (err, docs) {
    if (err) {
      return res.status(500).end({ error: 'Something failed!' })
    }
    for (var i = 0; i < docs.length; i++) {
      var doc = {
        _id: docs[i]['_id'],
        long_url: docs[i]['long_url']
      }
      var id = doc['_id']
      doc.shortUrl = config.webhost + base58.encode(id)
      docs[i] = doc
    }
    return res.send({urls: docs})
  })
})

// get long URL from shortened one
app.get('/:encoded_id', function (req, res) {
  var base58Id = req.params.encoded_id

  base58.decodeAsync(base58Id, function (err, id) {
    if (err) {
      return res.redirect(config.webhost)
    }
    // check if url already exists in database
    Url.findOne({_id: id}, function (err, doc) {
      if (err) {
        return res.status(500).send({ error: 'Something failed!' })
      }
      if (doc) {
        return res.redirect(doc.long_url)
      } else {
        return res.redirect(config.webhost)
      }
    })
  })
})

var port = process.env.PORT || process.argv[2] || 8000
server.listen(port, function () {
  console.log(`Server listening on port ${port}`)
})

module.exports = server
