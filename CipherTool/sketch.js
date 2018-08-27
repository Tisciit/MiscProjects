var val = 1000;

function setup() {
    createCanvas(300,400);
    background(55);
    frameRate(1);
    fill(255);
}

function draw() {
    background(55);
    text(val/=2, 10, 10);
}