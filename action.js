// global variable declarations
var canvas = document.getElementById("c1");
var originalImage = null;
var grayImage = null;
var redImage = null;
var rainbowImage = null;
var blurImage = null;
var borderImage = null;

 
function upload_img() {
    var file_input = document.getElementById("img_input");
    originalImage = new SimpleImage(file_input);
    grayImage = originalImage;
    redImage = originalImage;
    rainbowImage = originalImage;
    blurImage = originalImage;
    borderImage = originalImage;
    originalImage.drawTo(canvas);
}

 
function imageIsLoaded(img) {
    if (img == null || !img.complete()) {
        alert("image not loaded");
        return false;
    } else {
        return true;
    }
}

function filterGray() {
    for (var pixel of grayImage.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
}

function filterRed() {
    for (var pixel of redImage.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
        if (avg < 128) {
            pixel.setRed(avg * 2);
            pixel.setGreen(0);
            pixel.setBlue(0);
        } else {
            pixel.setRed(255);
            pixel.setGreen(avg * 2 - 255);
            pixel.setBlue(avg * 2 - 255);
        }
    }
}

function filterRainbow() {
    var h = rainbowImage.getHeight();
    var segment = h/7;
    for (var pixel of rainbowImage.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3; 
        //red
        if (pixel.getY() < segment) {
            if (avg < 128) {
                pixel.setRed(2*avg);
                pixel.setGreen(0);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(2*avg-255);
                pixel.setBlue(2*avg-255);
            }
        //orange
        } else if (pixel.getY() < segment * 2) {
            if (avg < 128) {
                pixel.setRed(2*avg);
                pixel.setGreen(0.8*avg);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(avg*1.2-51);
                pixel.setBlue(2*avg-255);
            }
        //yellow
        } else if (pixel.getY() < segment * 3) {
             if (avg < 128) {
                pixel.setRed(2*avg);
                pixel.setGreen(2*avg);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(255);
                pixel.setBlue(2*avg-255);
            }
        //green
        } else if (pixel.getY() < segment * 4) {
            if (avg < 128) {
                pixel.setRed(0);
                pixel.setGreen(2*avg);
                pixel.setBlue(0);
            } else {
                pixel.setRed(2*avg-255);
                pixel.setGreen(255);
                pixel.setBlue(2*avg-255);
            }
        //blue
        } else if (pixel.getY() < segment * 5) {
            if (avg < 128) {
                pixel.setRed(0);
                pixel.setGreen(0);
                pixel.setBlue(2*avg);
            } else {
                pixel.setRed(2*avg-255);
                pixel.setGreen(2*avg-255);
                pixel.setBlue(255);
            }
        //indigo
        } else if (pixel.getY() < segment * 6) {
            if (avg < 128) {
                pixel.setRed(0.8*avg);
                pixel.setGreen(0);
                pixel.setBlue(2*avg);
            } else {
                pixel.setRed(avg*1.2-51);
                pixel.setGreen(2*avg-255);
                pixel.setBlue(255);
            }
        //violet
        } else if (pixel.getY() < segment * 7) {
            if (avg < 128) {
                pixel.setRed(1.6*avg);
                pixel.setGreen(0);
                pixel.setBlue(1.6*avg);
            } else {
                pixel.setRed(avg*0.4+153);
                pixel.setGreen(2*avg-255);
                pixel.setBlue(avg*0.4+153);
            }
        }
    }
}

function getRand1_5() {
    min = Math.ceil(1);
    max = Math.floor(5);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  
function getCoords(z) {
    var rand = getRand1_5()
    if (z + rand < blurImage.getWidth() && z + rand < blurImage.getHeight()) {
        return z + rand;
    } else {
        return z - rand;
    }
}

function filterBlur() {
    for (var pixel of blurImage.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        
        if (Math.random() < 0.5) {
            blurImage.setPixel(x, y, blurImage.getPixel(x, y));
        } else {
            blurImage.setPixel(x, y, blurImage.getPixel(getCoords(x), getCoords(y)));
        }
    }
}

function doGray() {
    if (imageIsLoaded(grayImage)) {
        filterGray();
        grayImage.drawTo(canvas);
    }
}

function doRed() {
    if (imageIsLoaded(redImage)) {
        filterRed();
        redImage.drawTo(canvas);
    }
}

function doRainbow() {
    if (imageIsLoaded(rainbowImage)) {
        filterRainbow();
        redImage.drawTo(canvas);
    }
}

function doBlur() {
    if (imageIsLoaded(blurImage)) {
        filterBlur();
        blurImage.drawTo(canvas);
    }
}

function doBorder() {
    if (imageIsLoaded(borderImage)) {
        filterBorder();
        borderImage.drawTo(canvas);
    }
}

function reset() {
    if (imageIsLoaded(originalImage)) {
        upload_img();
    }
}

function setColor(pixel, rgb_array) {
    pixel.setRed(rgb_array[0]);
    pixel.setGreen(rgb_array[1]);
    pixel.setBlue(rgb_array[2])
}

function doColor() {
    var colorinput = document.getElementById("clr");
    var color = colorinput.value;
    color = color.substring(1);
    //console.log(color);
    //console.log(typeof color);
    var aRgbHex = color.match(/.{1,2}/g);
    var aRgb = [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16)
    ];
    //console.log(aRgb); //[21, 2, 190]
    return aRgb;
}

function doWidth() {
    var rangeinput = document.getElementById("sldr");
    var input = rangeinput.value;
    return input;
}

function filterBorder() {
    var rgb_array = doColor();
    var border_width = doWidth();
    //console.log(rgb_array);
    //console.log(border_width);

    for (var pixel of borderImage.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        
        if (x < border_width || x > borderImage.getWidth() - border_width) {
            setColor(pixel, rgb_array);
        }
        if (y < border_width || y > borderImage.getHeight() - border_width) {
            setColor(pixel, rgb_array);
        }
    }
}

