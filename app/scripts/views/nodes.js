'use strict';

var task = task || {};

(function() {
  task.NodesView = Backbone.View.extend({
    initialize: function(options) {
      this.collection = options.collection;
      this.level = options.level || 0;
      this.nodeViews = [];

      this.listenTo(this.collection, 'add', this.renderNode);
    },

    render: function() {
      this.collection.each(function(node) {
        this.listenTo(node, 'change:nodes', this.addSubnodes);
        this.renderNode(node);

        var nodes = node.get('nodes');
        if (!_.isEmpty(nodes)) {
          var nodesView = new task.NodesView({
            collection: nodes,
            level: this.level + 1
          });
          this.$el.append(nodesView.render().el);
        }
      }, this);

      this.renderEmptyNode();

      return this;
    },

    renderNode: function(node) {
      var nodeView = new task.NodeView({ model: node, level: this.level });
      this.nodeViews.push(nodeView);
      this.$el.append(nodeView.render().el);
    },

    renderEmptyNode: function() {
      var node = new task.Node();
      this.emptyNodeView = new task.NodeView({ model: node, level: this.level });
      this.$el.append(this.emptyNodeView.render().el);

      this.listenTo(node, 'change:name', this.addNode);
    },

    addSubnodes: function(node) {
      var nodesView = new task.NodesView({
        collection: node.get('nodes'),
        level: this.level + 1
      });
      var index = this.collection.indexOf(node);
      this.nodeViews[index].$el.after(nodesView.render().el);
    },

    addNode: function(node) {
      this.stopListening(node);
      this.emptyNodeView.$el.detach();

      this.collection.add(node);
      this.listenTo(node, 'change:nodes', this.addSubnodes);

      this.renderEmptyNode(this.level);
    }
  });
})();
