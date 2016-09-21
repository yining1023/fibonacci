var canvas = d3.select("canvas"),
    context = canvas.node().getContext("2d"),
    width = canvas.property("width"),
    height = canvas.property("height"),
    radius = 50;

var points = d3.range(300).map(phyllotaxis(30));

d3.select("body").style("background-color", "#f9ea84");

canvas.call(d3.zoom()
    .scaleExtent([1 / 2, 4])
    .on("zoom", zoomed));

drawPoints(d3.zoomIdentity);

function zoomed() {
  context.clearRect(0, 0, width, height);
  drawPoints(d3.event.transform);
}

function drawPoints(transform) {
  // context.beginPath();
  // points.map(transform.apply, transform).forEach(drawPoint);
  // context.fill();
  // context.closePath();

  context.beginPath();
  for (var i = 0; i < points.length - 1; i++) {
    drawLine(points.map(transform.apply, transform)[i], points.map(transform.apply, transform)[i+1]);
  }  
  context.stroke();
  context.closePath();
}

function drawLine(point, pointNext) {
  context.moveTo(point[0], point[1]);
  context.lineTo(pointNext[0], pointNext[1]);
  // var red = Math.floor(Math.random() * 255);
  // var green = Math.floor(Math.random() * 255);
  // var blue = Math.floor(Math.random() * 255);
  // console.log(red, green, blue);
  // context.strokeStyle = "rgba(90, 194, 191, 0.25)";
  context.strokeStyle = "#fb9701";
  // context.strokeStyle = "rgb(90, 194, 191)";
  // context.strokeStyle = "rgba("+red+","+green+","+blue+",0.25)";
}

function drawPoint(point) {
  context.moveTo(point[0] + radius, point[1]);
  var radiusCircle = 5 * Math.random() + 0.5;
  context.arc(point[0], point[1], radiusCircle, 0, 2 * Math.PI);
  context.fillStyle = '#5ac2bf';
}

function phyllotaxis(radius) {
  var theta = Math.PI * (3 - Math.sqrt(5));
  return function(i) {
    var r = radius * Math.sqrt(i), a = theta * i;
    return [
      width / 2 + r * Math.cos(a),
      height / 2 + r * Math.sin(a)
    ];
  };
}
