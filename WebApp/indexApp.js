function registerWindow(){
	window.open ("register.html");
	return false;
}

function login(){
	document.getElementById("botton").innerHTML = "Hello World";
}

var   w = screen.availWidth,
      h =  screen.availHeight,
      circleWidth = 5; 
 

var palette = {
      "lightgray": "#E5E8E8",
      "gray": "#708284",
      "mediumgray": "#536870",
      "blue": "#3B757F"
  }

var colors = d3.scale.category20();

var nodes = [
      { name: "Skills"},
      { name: "amazing", target: [], value: 58 },
      { name: "is", target: [], value: 165 },  
      { name: "Scss", target: [], value: 52 },
      { name: "Compass", target: [], value: 48 }, 
      { name: "Susy", target: [], value: 40 }, 
      { name: "Breakpoints", target: [], value: 36 },
      { name: "jQuery", target: [], value: 52 },
      { name: "Javascript", target: [], value: 37 },
      { name: "PHP", target: [], value: 20 },
      { name: "Wordpress", target: [], value: 67 },
      { name: "Adam", target: [], value: 68 },
      { name: "Snap.svg", target: [], value: 16 },
      { name: "d3",  target: [], value: 25 },
      { name: "Gulp", target: [], value: 45 },
      { name: "Angular", target: [], value: 25 },
      { name: "Adobe CS", target: [], value: 57 },
      { name: "mySql", target: [], value: 20 },
      { name: "Grunt", target: [], value: 37 },
];



var button = document.createElement("button");
button.innerHTML = "add circle!";

button.addEventListener("click", function() {
  nodes.forEach( function (arrayItem)
  {
    delete arrayItem.x;
    delete arrayItem.y;
    delete arrayItem.px;
    delete arrayItem.py;
  });
  nodes.push({ name: "JOHN CENNA", target: [], value: 58 });
  button.innerHTML = JSON.stringify(nodes);
  update();

});

document.body.appendChild(button);

var links = [];


var myChart = d3.select('body')
      .append("div")
        .classed("svg-container", true)
      
      .append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 "+w+" "+(h-70)+" ")
        .classed("svg-content-responsive", true)

        .style("background-color", "black")

var force = d3.layout.force()
	  .nodes(nodes)
      .links([])
      .gravity(0.3)
      .charge(-1000)
      .size([w,h]); //sets centre of gravity

      var link;

      var node; 

      force.on('tick', function(e){ 
            node.attr('transform', function(d, i){
              return 'translate(' + (circleWidth +d.x) + ','+ (circleWidth +d.y) + ')'
            })

          link 
              .attr('x1', function(d){ return d.source.x; }) 
              .attr('y1', function(d){ return d.source.y; })
              .attr('x2', function(d){ return d.target.x; })
              .attr('y2', function(d){ return d.target.y; })
      });

var update = function () { 

	  d3.select("div").remove();
	  d3.select("svg").remove();
	  myChart = d3.select('body')
      .append("div")
        .classed("svg-container", true)
      
      .append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 "+w+" "+(h-70)+" ")
        .classed("svg-content-responsive", true)

        .style("background-color", "black")


      link = myChart.selectAll('line') 
            .data(links).enter().append('line')
            .attr('stroke', palette.lightgray)
            .attr('strokewidth', '1');

      node =  myChart.selectAll('circle')  
            .data(nodes).enter() 
            .append('g') 
            .call(force.drag); 

     
     node.append('circle')
            .attr('cx', function(d){return d.x; })
            .attr('cy', function(d){return d.y; })
            .attr('r', function(d,i){
                  console.log(d.value);
                  if ( i > 0 ) {
                        return circleWidth + d.value; 
                  } else {
                        return circleWidth + 35; 
                  }
            })
            .attr('fill', function(d,i){
                  if ( i > 0 ) {
                        return colors(i);
                  } else {
                        return '#fff';
                  }
            })


      


      node.append('text')
            .text(function(d){ return d.name; })
            .attr('font-family', 'Raleway', 'Helvetica Neue, Helvetica')
            .attr('fill', function(d, i){
              console.log(d.value);
                  if ( i > 0 && d.value < 10 ) {
                        return palette.mediumgray;
                  } else if ( i > 0 && d.value >10 ) {
                        return palette.lightgray;
                  } else {
                        return palette.blue;
                  }
            })
            .attr('text-anchor', function(d, i) {
                  return 'middle';
            })
            .attr('font-size', function(d, i){
                  if (i > 0) {
                        return '1.3em';
                  } else {
                        return '1.5em';    
                  }
            }) 
          force
	      .start();
        }

update();
