let objects = [];
let current = 0;
const amount_objects = 200;
const scaleUp = 500;

function setup() {
    createCanvas(windowWidth, windowHeight - 5);

    //Calculate possible size for each column in pixels (given that the space between columns is the same as the width of the column itself)
    let objectWidth = Math.floor(windowWidth / (2 * (amount_objects + 1))); // Add 1 to get a space on the most right column
    let x = objectWidth; //First x position on the canvas

    //"Center" the graphic by calculating and adding the offset to the first x position on the canvas
    let offSet = windowWidth / (2 * (amount_objects + 1)) - objectWidth;
    offSet *= amount_objects;
    x += Math.floor(offSet);

    //Create Objects and their "height" with a random value
    for (let i = 0; i < amount_objects; i++) {
        objects[i] = new SortingObject(Math.random());
        objects[i].x = x;
        x += 2 * objectWidth; // Add space between columns
        objects[i].width = objectWidth;
    }

    frameRate(60);
}

function draw() {


    background(55);
    fill(255);
    for (let o of objects) {
        rect(o.x, windowHeight * .25, o.width, o.value * scaleUp);
    }

    //Sorting
    try {

        //Fill with red color
        fill(color(255, 0, 0));

        // a is the element at the current index, b is the next one. Firstly, we draw them red
        let a = objects[current];
        rect(a.x, windowHeight * .25, a.width, a.value * scaleUp);
        let b = objects[current + 1];
        rect(b.x, windowHeight * .25, b.width, b.value * scaleUp);

        //Then we check, if k´s value is less than o´s. If so, we switch their positions
        if (b.value < a.value) {

            //Switch positions in the array
            objects.splice(current, 2, b, a);

            //Switch drawing positions
            let bx = b.x;
            b.x = a.x;
            a.x = bx;
        }

        //Check next element
        current++;
    } catch {
        //When the end is reached, reset "current" to check the first element again
        current = 0;

        console.clear();
        console.table(objects);
    }
}