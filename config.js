'use strict'
var config = {}

config.db = {}
config.webhost = process.env.WEBHOST || 'http://localhost/'

config.db.host = process.env.HOST || 'mongo'
config.db.name = process.env.NAME || 'url_shortener'

module.exports = config
