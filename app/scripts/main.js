/*global task, $*/


window.task = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    'use strict';

    var collection = new task.Nodes();
    collection.add(new task.Node({ name: 'Category 1' }));
    collection.add(new task.Node({ name: 'Category 2' }));
    collection.add(new task.Node({ name: 'Category 3' }));
    var subNode = new task.Node({ name: 'Category 4' });
    collection.add(subNode);
    var subCollection = new task.Nodes();
    subCollection.add(new task.Node({ name: 'Sub Category 1' }));
    subCollection.add(new task.Node({ name: 'Sub Category 2' }));
    subCollection.add(new task.Node({ name: 'Sub Category 3' }));
    subNode.set('nodes', subCollection);

    var nodesView = new task.NodesView({ collection: collection });
    $('#nodes').append(nodesView.render().el);
  }
};

$(document).ready(function () {
  'use strict';
  task.init();
});
