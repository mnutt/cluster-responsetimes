/**
 * Module dependencies.
 */

var cluster = require('cluster'),
  should = require('should'),
  responsetimes = require('../lib/cluster-responsetimes');

module.exports = {
  'responsetimes constructor': function() {
    var plugin;
    try { plugin = exception() }catch(e){ e.should.be.an.instanceof(Error) }

    plugin = responsetimes(cluster);
    plugin.should.be.an.instanceof(Function);
  }
};