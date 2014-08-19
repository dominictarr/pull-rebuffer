# pull-rebuffer

pull-stream that reclumps short strings (to speed writing to fs etc)

``` js
var rebuffer = require('pull-rebuffer')
var pull = require('pull-stream')
var toPull = require('stream-to-pull-stream')

pull(
  streamOfLines,
  //combine lines into 40k long sections
  rebuffer(40*1024),
  toPull.sink(fs.createWriteStream(filename))
)

```

for some node streams, but in particular fs streams,
writing a few longer buffers will be much faster than
writing many short buffers.

## License

MIT
