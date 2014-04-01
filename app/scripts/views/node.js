'use strict';

var task = task || {};

(function() {
  task.NodeView = Backbone.View.extend({
    className: 'node',
    template: _.template($('#nodeTemplate').html()),
    emptyTemplate: _.template($('#emptyNodeTemplate').html()),
    events: {
      'dblclick': 'dblclickHandler',
      'keyup .empty-node': 'keyupEmptyNode'
    },

    initialize: function(options) {
      this.level = options.level;
    },

    render: function() {
      var data = this.model.toJSON();
      data.level = '- ';
      for (var i = 0; i < this.level; i++) {
        data.level = '-' + data.level;
      }

      if (this.model.get('isEmpty')) {
        this.$el.html(this.emptyTemplate(data));
      } else {
        this.$el.html(this.template(data));
      }
      return this;
    },

    dblclickHandler: function(e) {
      if (!this.model.get('isEmpty')) {
        this.model.set('nodes', new task.Nodes());
      }
    },

    keyupEmptyNode: function(e) {
      if (e.keyCode === 13) {
        this.model.set('name', this.$el.find('.empty-node').val());
      }
    }
  });
})();
