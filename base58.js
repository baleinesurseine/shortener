'use strict'
var alphabet = 'wHK4Evq9oDXpbYU7hBQNn8yiRf3TGV5JFLrtg2AuemxkjsCScdaWM1zPZ6'
var base = alphabet.length

function encode (num) {
  var encoded = ''
  do {
    var remainder = num % base
    num = Math.floor(num / base)
    encoded = alphabet[remainder].toString() + encoded
  } while (num)
  return encoded
}

function encodeAsync (num, callback) {
  setImmediate(() => {
    num = parseInt(num, 10)
    if (isNaN(num)) {
      return callback(new Error('encodeAsync first parameter must be a number'), null)
    }
    num = +num
    var encoded = ''
    do {
      var remainder = num % base
      num = Math.floor(num / base)
      encoded = alphabet[remainder].toString() + encoded
    } while (num)
    return callback(null, encoded)
  })
}

function decode (str) {
  var decoded = 0
  while (str) {
    var index = alphabet.indexOf(str[0])
    var power = str.length - 1
    decoded += index * (Math.pow(base, power))
    str = str.substring(1)
  }
  return decoded
}

function decodeAsync (str, callback) {
  setImmediate(() => {
    if (typeof str !== 'string' && !(str instanceof String)) {
      return callback(new Error('decodeAsync first parameter must be a string'), null)
    }
    var decoded = 0
    while (str) {
      var index = alphabet.indexOf(str[0])
      if (index === -1) {
        let err = new Error('data is not base58 encoded')
        return callback(err, null)
      }
      var power = str.length - 1
      decoded += index * (Math.pow(base, power))
      str = str.substring(1)
    }
    return callback(null, decoded)
  })
}

module.exports.encode = encode
module.exports.decode = decode
module.exports.decodeAsync = decodeAsync
module.exports.encodeAsync = encodeAsync
