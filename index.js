
var looper = require('looper')

module.exports = function (len) {
  var ended = false, buffer = ''
  len = len || 40*1024

  return function (read) {
    return function (abort, cb) {
      if(ended) return cb(ended)
      looper(function (next) {
        console.log('llopy')
        read(abort, function (end, data) {
          var _buffer
          // if the input has ended,
          // cb any remaining data (if it exists)
          // else end the stream.
          console.log(end, data)
          if(end) {
            ended = end
            if(buffer) {
              _buffer = buffer
              buffer = ''
              cb(null, _buffer)
            }
            else
              cb(end)
          }
          else {
            buffer += data
            if(buffer.length > len) {
              _buffer = buffer
              buffer = ''
              cb(null, _buffer)
            }
            else
              next()
          }
        })
      })
    }
  }
}
