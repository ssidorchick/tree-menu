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
      this.NodesView = options.NodesView;

      this.listenTo(this.model, 'change:nodes', this.renderNodesView);
    },

    render: function() {
      var data = this.model.toJSON();
      data.level = '- ';
      for (var i = 0; i < this.level; i++) {
        data.level = '-' + data.level;
      }

      var template = this.model.get('name') ? this.template : this.emptyTemplate;
      this.$el.html(template(data));

      this.renderNodesView(this.model);

      return this;
    },

    renderNodesView: function(node) {
      var subnodes = node.get('nodes');
      if (subnodes) {
        var nodesView = new this.NodesView({
          collection: subnodes,
          level: this.level + 1
        });
        this.$el.append(nodesView.render().el);
      }
    },

    dblclickHandler: function(e) {
      if (this.model.get('name') && !this.model.get('nodes')) {
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
