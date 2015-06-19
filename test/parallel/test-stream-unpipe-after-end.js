'use strict';
var stream = require('../../');

var r = new stream.Readable({
  read: function() {}
});

var w = new stream.Writable({
  write: function(c, e, cb) {
    // call cb async, like a transform
    setTimeout(cb);
  }
});

// get some data into the read buffer
r.push('a');

// start piping
r.pipe(w);

// some time later, end the writable
setTimeout(function() {
  w.end();

  // readable should have been unpiped by now so it should be safe to keep pushing
  r.push('b');
});
