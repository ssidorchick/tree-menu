'use strict';

var task = task || {};

(function() {
  task.Nodes = Backbone.Collection.extend({
    model: task.Node
  });
})();
