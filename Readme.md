# cluster-responsetimes

  Response time stats for Cluster

## Installation

    $ npm install cluster-responsetimes

## Example

    var http = require('http'),
      cluster = require('cluster'),
      responsetimes = require('cluster-responsetimes');

    var server = http.createServer(function(req, res){
      res.end('Hello World');
    });

    cluster = cluster(server)
      .use(cluster.stats())
      .use(cluster.repl(3773))
      .use(responsetimes())
      .listen(3000);


  Then log into the REPL

    $ telnet localhost 3773
    Trying 127.0.0.1...
    Connected to localhost.
    Escape character is '^]'.
    cluster> responsetimes()

      Response times
      minimum: 1408
      maximum: 5725
      mean: 2540.66
      std_dev: 1798.58
      median: 1499
      count: 6
      75%: 4198.75
      95%: 5725
      99%: 5725
      99.9%: 5725


## License

(The MIT License)

Copyright (c) 2011 Michael Nutt &lt;michael@nuttnet.net&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.