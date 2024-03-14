// index.html
<div id="myContainer"></div>

// sketch.js
function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("myContainer");
}

// style.css
#myContainer {
    position: absolute;
    left: 100px;
    top: 100px;
}
