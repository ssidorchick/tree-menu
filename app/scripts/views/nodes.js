'use strict';

var task = task || {};

(function() {
  task.NodesView = Backbone.View.extend({
    className: 'nodes',

    initialize: function(options) {
      this.collection = options.collection;
      this.level = options.level || 0;

      this.listenTo(this.collection, 'add', this.renderNode);
    },

    render: function() {
      this.collection.each(function(node) {
        this.renderNode(node);
      }, this);

      this.renderEmptyNode();

      return this;
    },

    renderNode: function(node) {
      var nodeView = new task.NodeView({ model: node, level: this.level, NodesView: task.NodesView });
      this.$el.append(nodeView.render().el);
    },

    renderEmptyNode: function() {
      var node = new task.Node();
      this.listenTo(node, 'change:name', this.addNode);

      this.emptyNodeView = new task.NodeView({ model: node, level: this.level, NodesView: task.NodesView });
      this.$el.append(this.emptyNodeView.render().el);
    },

    addNode: function(node) {
      this.stopListening(node);
      this.emptyNodeView.$el.detach();

      this.collection.add(node);

      this.renderEmptyNode();
    }
  });
})();
