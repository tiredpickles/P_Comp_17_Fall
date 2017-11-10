var letterM = {
    x: 50,
    y: 50,
    xspeed: 2,
    yspeed: 4,
    move: function () {

        if (letterM.x >= width || letterM.x <= 0) {
            letterM.xspeed = letterM.xspeed * -1;
        }
        if (letterM.y >= height || letterM.y <= 0) {
            letterM.yspeed = letterM.yspeed * -1;
        }

        letterM.x = letterM.x + letterM.xspeed;
        letterM.y = letterM.y + letterMs.yspeed;
    },

    drawletter: function () {
        text("M", 10, 10, 70, 80);
        fill(0, 0, 255);
        textSize(64);
        stroke(240, 150, 150);
        strokeWeight(3);
        //text("M", 10, 10, 70, 80); //text(str,x,y,[x2],[y2])
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(90, 10, 250);
    letterM.move();
    letterM.drawletter();
}
