var r1 = 50;
var a1 = 0;
var preloaderVisible = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  if (preloaderVisible) {
    displayPreloader();
  } else {
    fill(0, 5);
    rect(0, 0, width, height);

    translate(width / 2, height / 2);
    stroke(255);

    var x1 = r1 * cos(a1);
    var y1 = r1 * sin(a1);

    point(x1, y1);

    a1 += 3;
  }
}

function displayPreloader() {
  fill(255);
  text("Loading...", width / 2, height / 2);
}

function hidePreloader() {
  preloaderVisible = false;
}

setTimeout(hidePreloader, 2000);
