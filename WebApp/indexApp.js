function registerWindow(){
	window.open ("register.html");
	return false;
}

function login(){
	var button = document.createElement("button");
	document.body.style.backgroundColor = "black";
	button.innerHTML = "add category!";
button.addEventListener("click", function() {
  nodes.forEach( function (arrayItem)
  {
    delete arrayItem.x;
    delete arrayItem.y;
    delete arrayItem.px;
    delete arrayItem.py;
  });
  nodes.push({ name: "Hackathons", target: [], value: 58 });
  update();
  button.innerHTML = "add another category!";
});
	document.body.appendChild(button);
	loginBar = document.getElementById("navbar");
	loginBar.remove();
	document.getElementById("delet").remove();
	document.getElementById("welcome").style.display="block";
	update()
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
      { name: "Travel", target: [], value: 52 },
      { name: "Accomodation", target: [], value: 125 },  
      { name: "Bills", target: [], value: 48 }, 
      { name: "Food", target: [], value: 58 },
      { name: "Books", target: [], value: 40 }, 
      { name: "Sports", target: [], value: 36 },
      { name: "Going Out", target: [], value: 52 },
      { name: "Gifts", target: [], value: 37 },
      { name: "ET", target: [], value: 20 },
      { name: "Cinema", target: [], value: 36 },
      { name: "Car",  target: [], value: 25 },
      { name: "Cloth", target: [], value: 25 },
];

function increase(nod){
	nod.value+=10;
	update();
}

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

                  if ( d.value < 20 ) {
                        return colors(i);
                  } else if(d.value<30){
                        return '#FF0000';
                  } else if(d.value<40){
                        return '#D00000';
                  } else if(d.value<50){
                        return '#A80000';
                  } else if(d.value<60){
                        return '#880000';
                  } else{
                        return '#400000';
                  }
            })


      


      node.append('text')
            .text(function(d){ return d.name+"-"+d.value; })
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
            .on("click", function(d){
            	for (var i in nodes) {
     				if (nodes[i].name == d.name) {
        			projects[i].value = 200;
        			break; //Stop this loop, we found it!
     			}
   			}
            	update()
            })
          force
	      .start();
        }

