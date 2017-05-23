function query_graph() {
  xhr = new XMLHttpRequest();
  xhr.open('GET', './graph', true);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      cyInstance.json(JSON.parse(xhr.responseText));
      cyInstance.elements().layout({name: layout_name, fit: first_run, rankDir: 'BT'}).run();
      first_run = false;
    }
  }
  xhr.send();
}

function view_position() {
console.log('here')
   layout_name = 'preset';
   first_run = true;
  query_graph();
}

function view_tree() {
console.log('there')
   layout_name = 'dagre';
   first_run = true;
  query_graph();
}


var cyInstance = new cytoscape({
  container: document.getElementById('cy'),
  style: [{selector: 'node', style: {'background-color': '#0471A6','label': 'data(id)'}},
    {selector: 'edge',style: {'line-color': '#43AA8B','target-arrow-color': '#43AA8B',
        'target-arrow-shape': 'triangle','curve-style': 'bezier'}}]});

var first_run = true;
var layout_name = 'preset';
query_graph();
setInterval(query_graph, 1000);
