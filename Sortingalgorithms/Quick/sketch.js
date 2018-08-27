let objects = [];
let current = 0;
const amount_objects = 220;
const scaleUp = 500;

let corrects = [];

function setup() {
    createCanvas(windowWidth, windowHeight - 5);
    background(55);

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
        objects[i].width = objectWidth;
        x += 2 * objectWidth; // Add space between columns
    }

    objects = qs(objects);
    reOrder();



    frameRate(2);

}

function draw() {

//     if (objects.length == corrects.length) {
//         noLoop();
//     }
//     background(55);
    fill(255);
    for (let o of objects) {
        rect(o.x, windowHeight * .25, o.width, o.value * scaleUp);
    }

//     for (let c of corrects) {
//         fill(0, 0, 255);
//         rect(objects[c].x, windowHeight * .25, objects[c].width, objects[c].value * scaleUp);
//     }

//     //---- Sorting
//     let r;
//     if (corrects.length == 0) {
//         r = floor(random(0, objects.length));
//     } else if (corrects.indexOf(0) == -1) {
//         r = floor(random(0, corrects[0]));
//     } else {
//         let min = 0;
//         let max = objects.length;

//         for (let i = 1; i < corrects.length; i++) {
//             if (corrects[i - 1] + 1 != corrects[i] && min == 0) {
//                 min = corrects[i - 1];
//                 max = corrects[i];
//                 r = floor(random(min + 1, max));
//                 break;
//             }
//         }

//         if (r == undefined) {
//             r = floor(random(corrects[corrects.length], objects.length));
//         }
//     }

//     console.log(r);
//     let left = [];
//     let center = objects[r];
//     let right = [];

//     for (let o of objects) {

//         if (o.value <= center.value) {
//             fill(color(0, 255, 0));
//             //rect(o.x, windowHeight * .25, o.width, o.value * scaleUp);
//             left.push(o);
//         } else {
//             fill(color(255, 0, 0));
//             //rect(o.x, windowHeight * .25, o.width, o.value * scaleUp);
//             right.push(o);
//         }
//     }

//     corrects.push(objects.indexOf(center));

//     objects = left;
//     //objects.push(center);
//     objects = objects.concat(right);
//     reOrder();
//     sortCorrects();
}

function qs(values) {

    if (values.length == 1) {
        return values;
    }

    let pivot = values[floor(random(values.length))];
    let left = [];
    let right = [];

    for (let v of values) {

        if (v == pivot) {
            continue;
        }

        if (v.value <= pivot.value) {
            left.push(v);
        } else {
            right.push(v);
        }
    }

    let ret = [];

    if (left.length > 0) {
        ret = ret.concat(qs(left));
    }
    ret.push(pivot);

    if (right.length > 0) {
        ret = ret.concat(qs(right));
    }

    return ret;
}

function reOrder() {

    let objectWidth = Math.floor(windowWidth / (2 * (amount_objects + 1))); // Add 1 to get a space on the most right column
    let x = objectWidth; //First x position on the canvas

    //"Center" the graphic by calculating and adding the offset to the first x position on the canvas
    let offSet = windowWidth / (2 * (amount_objects + 1)) - objectWidth;
    offSet *= amount_objects;
    x += Math.floor(offSet);

    for (let i = 0; i < objects.length; i++) {
        objects[i].x = x;
        objects[i].width = objectWidth;
        x += 2 * objectWidth; // Add space between columns
    }
}

function sortCorrects() {
    corrects = corrects.sort(function (a, b) {
        return a - b;
    });
}