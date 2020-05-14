function setup() {
    // create canvas
  var c = createCanvas(window.innerWidth, window.innerHeight);
  background(100);
  // Add an event for when a file is dropped onto the canvas
  c.drop(gotFile);
  // image(img, 0, 0);
  }

function draw() {
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text('Drag an image file (has to be from your computer) \n onto the canvas to make the image 3D!!! \n if it does not immediately load, please try again', width/2, height/2);
  noLoop();
}

function gotFile(file) {
    // If it's an image file
    var img = createImg(file.data).hide();
    if (file.type == 'image' && img.height != 0 && img.width != 0) {
        // Create an image DOM element but don't show it
        background(255);
        print("img height x width: " + img.height + " " + img.width)
        print("window height x width: " + window.innerHeight + " " + window.innerWidth)
        if (window.innerWidth < window.innerHeight) {
            var factor = img.width/window.innerWidth;
            image(img, 0, 0, window.innerWidth, img.height / factor);
        } else {
            var factor = img.height/window.innerHeight;
            image(img, 0, 0, img.width / factor, window.innerHeight);
        }
        // Draw the image onto the canvas
        loadPixels();
        for(var i=0; i<pixels.length; i+=8){
            var colordistright = round((dist(pixels[i],pixels[i+1],pixels[i+2],pixels[i+4],pixels[i+5],pixels[i+6])));
            if (colordistright <= 100){
                pixels[i] = pixels[i+100];
                pixels[i+1] = 100;
                pixels[i+2] = pixels[i-100];
                pixels[i+4] = 100;
            }
        }
        updatePixels();
    } else {
        clear();
        print("error");
        background(100);
        fill(255);
        noStroke();
        textSize(24);
        textAlign(CENTER);
        text('Try again - error reading file.', width/2, height/2);
    }
}
