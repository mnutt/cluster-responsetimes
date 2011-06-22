/**
 * Module dependencies
 */
var metrics = require('metrics'),
  utils = require('cluster/lib/utils');

module.exports = function(cluster) {
  responsetimes.enableInWorker = true;

  /**
   * REPL response times command
   */
  cluster.repl.define('responsetimes', function(master, sock) {
    var stat = master.responseTimes.printObj();

    sock.title('Response times');
    sock.row('minimum', stat.min);
    sock.row('maximum', stat.max);
    sock.row('mean', (stat.mean || 0).toFixed(1));
    sock.row('std_dev', (stat.std_dev || 0).toFixed(1));
    sock.row('median', stat.median);
    sock.row('count', stat.count || 0);
    sock.row('75%', stat.p75);
    sock.row('95%', stat.p95);
    sock.row('99%', stat.p99);
    sock.row('99.9%', stat.p999);

    sock.write('\n');
  }, 'Display response times');

  function responsetimes(master) {
    var server = master.server;

    // worker stats
    if(master.isWorker) {
      utils.unshiftListener(server, 'request', function(req, res) {
        var startTime = new Date();

        var end = res.end;
        res.end = function(str, encoding) {
          res.end = end;
          res.end(str, encoding);

          var time = (new Date()) - startTime;
          master.call('reportResponseTime', time);
        };
      });
    } else {
      // receive response times in master
      master.responseTimes = new metrics.Histogram.createExponentialDecayHistogram();

      master.reportResponseTime = function(worker, time) {
        master.responseTimes.update(time, new Date());
      };
    }
  }

  return responsetimes;
};
