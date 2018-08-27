class MatrixText {

    constructor(char, size, x, y, speed) {
        this.char = char;
        this.size = size;
        this.x = x;
        this.y = y;
        this.speed = floor(speed * 5);
    }

    draw() {
        text(this.char, this.x, this.y, this.x + this.size, this.y + this.size);
    }

    moveDown() {
        this.y += this.size + this.speed;
    }

    offScreen() {
        return this.y > windowHeight;
    }
}