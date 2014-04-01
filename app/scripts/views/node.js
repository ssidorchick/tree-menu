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

      var template = this.model.get('name') ? this.template : this.emptyTemplate;
      this.$el.html(template(data));

      return this;
    },

    dblclickHandler: function(e) {
      if (this.model.get('name')) {
        this.model.set('nodes', new task.Nodes());
      }
    },

    keyupEmptyNode: function(e) {
      if (e.keyCode === 13) {
        var name = this.$el.find('.empty-node').val();
        if (name) {
          this.model.set('name', name);
        }
      }
    }
  });
})();
