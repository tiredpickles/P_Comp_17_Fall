//Serial variables here
var serial;
var inData;
var options = {
    baudrate: 9600
};
var portName = '/dev/cu.usbmodem1411';

//Draw variables here

var sound;
var fft;
var d = false;

function preload() {
    sound = loadSound('partita_d_minor.mp3');
    console.log("loaded");
}

function setup() {

    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.open(portName, options); // open a serial port

    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.mouseClicked(togglePlay);
    fft = new p5.FFT();
    sound.amp(0.5);
}


function draw() {

    var high5 = 0;
    var high6 = 0;
    var high7 = 0;
    var high8 = 0;
    var high9 = 0;
    //    background(255);
    //    ellipse(width/2, height/2, inData, inData);
    background(0);
    var spectrum = fft.analyze();
    //console.log(spectrum);
    noStroke();
    fill(0, 255, 0); // spectrum is green

    for (var i = 0; i < spectrum.length; i++) {
        var x = map(i, 0, spectrum.length/2, 0, width);
        var h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width / spectrum.length/2, h);
    }

    //For loop for each output pin

    //Pin5 - Start

    for (var i = 0; i < spectrum.length/2; i++) {
        if (i > 0 && i <= 128) {
            high5 = high5 + spectrum[i];
        }
    }
    high5 = high5 / 128;

    if (high5 > 1) {
        console.log("Horray");
        serial.write(high5);
    }
    //Pin5 End 

    //Pin6 - Start

    for (var i = 0; i < spectrum.length/2; i++) {
        if (i > 128 && i <= 256) {
            high6 = high6 + spectrum[i];
        }
    }
    high6 = high6 / 128;

    if (high6 > 2) {
        console.log("YooPee");
        serial.write(high6);
    }

    //Pin6 - End

    //Pin7 - Start
    for (var i = 0; i < spectrum.length/2; i++) {
        if (i > 256 && i <= 512) {
            high7 = high7 + spectrum[i];
        }
    }
    high7 = high7 / 256;
    console.log(high7);
    noFill();

    if (high7 > 1) {
        console.log("ISHOULD SEND TO ARDUINO");
        serial.write(high7);

    }
    //Pin7 End

    //Pin8 - Start

    for (var i = 0; i < spectrum.length/2; i++) {
        if (i > 512 && i <= 768) {
            high8 = high8 + spectrum[i];
        }
    }
    high8 = high8 / 256;
    console.log(high8);
    noFill();

    if (high8 > 1) {
        console.log("This is Pin 8");
        serial.write(high8);
    }
    //Pin 8 - End
    //Pin 9  - Start

    for (var i = 0; i < spectrum.length/2; i++) {
        if (i > 768 && i <= 512) {
            high9 = high9 + spectrum[i];
        }
    }
    high9 = high9 / 256;
    console.log(high9);
    noFill();

    if (high9 > 2) {
        console.log("Last Pin");
        serial.write(high9);
    }
    
    //Pin 9 - End

}

function togglePlay() {
    if (sound.isPlaying()) {
        sound.pause();
    } else {
        sound.loop();
    }
}

//function mousePressed() {
//    serial.write(255);
//}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}


function serialEvent() {

    inData = Number(serial.read());
    console.log(inData);

}

function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.');
}
