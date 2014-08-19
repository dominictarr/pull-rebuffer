
var tape = require('tape')
var pull = require('pull-stream')
var rebuffer = require('./')

tape('buffer strings', function (t) {

  pull(
    pull.count(1000),
    pull.map(function (e) {
      return e + '\n'
    }),
    rebuffer(256),
    pull.collect(function (err, ary) {
      if(err) throw err
      t.ok(ary.length > 8)
      var d = ary.join(''), e = ''

      for(var i = 0; i <= 1000; i++) e += i + '\n'

      t.equal(d, e)
      t.end()

    })
  )

})

tape('empty', function (t) {
  pull(
    pull.empty(),
    pull.map(function (e) {
      return e + '\n'
    }),
    rebuffer(256),
    pull.collect(function (err, ary) {
      if(err) throw err
      t.equal(ary.length, 0)
      t.end()
    })
  )

})

tape('short', function (t) {
  pull(
    pull.values(['1\n', '2\n', '3\n']),
    rebuffer(256),
    pull.collect(function (err, ary) {
      if(err) throw err
      t.equal(ary.length, 1)
      t.equal(ary[0], '1\n2\n3\n')
      t.end()
    })
  )
})
