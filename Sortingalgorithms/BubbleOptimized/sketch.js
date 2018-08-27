let objects = [];
let current = 0;
const amount_objects = 200;
let last = amount_objects;
const scaleUp = 500;
let calcPerDraw = 1;

function setup() {
    createCanvas(windowWidth, windowHeight - 5);

    let objectWidth = Math.floor(windowWidth / (2 * (amount_objects + 1)));
    let x = objectWidth;

    //Distance to left and right side of screen, Offset first "x" to half the 
    let offSet = windowWidth / (2 * (amount_objects + 1)) - objectWidth;
    offSet *= amount_objects;
    x += offSet;

    for (let i = 0; i < amount_objects; i++) {
        objects[i] = new SortingObject(Math.random());
        objects[i].x = x;
        x += 2 * objectWidth;
        objects[i].width = objectWidth;
    }

    frameRate(60);
}

function draw() {

    for (let i = 0; i < calcPerDraw; i++) {
        background(55);
        fill(255);
        for (let o of objects) {
            rect(o.x, windowHeight * .25, o.width, o.value * scaleUp);
        }

        //Bubble
        if (current + 1 >= last) {
            current = 0;
            last--;
        } else {

            //Fill with red color
            fill(color(255, 0, 0));
            // o is the element at the current index, k is the next one. Firstly, we draw them red
            let o = objects[current];
            rect(o.x, windowHeight * .25, o.width, o.value * scaleUp);
            let k = objects[current + 1];
            rect(k.x, windowHeight * .25, k.width, k.value * scaleUp);

            //Then we check, if k´s value is less than o´s. If so, we switch their positions
            if (k.value < o.value) {
                objects.splice(current, 2, k, o);

                let kx = k.x;
                k.x = o.x;
                o.x = kx;
            }

            //We increment the index, so that we check the next element the next time
            current++;
        }
    }
}