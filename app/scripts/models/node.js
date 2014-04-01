'use strict';

var task = task || {};

(function() {
  task.Node = Backbone.Model.extend({
    defaults: {
      name: "Category",
      isEmpty: false
    }
  });
})();
