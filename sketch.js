var balloon;
var balloon_img;
var bg_image;
var ground;
var db;
var position;

function preload(){
  bg_image = loadImage("bg.png");
  balloon_img = loadAnimation("b1.png","b2.png","b3.png");
}

function setup() {
  createCanvas(500,500);
  balloon = createSprite(50,400);
  balloon.addAnimation("bi",balloon_img);
  balloon.scale = 0.6;
  db = firebase.database();
    var ballpos = db.ref("balloon/position");
    ballpos.on("value",readposition,showerror);
}
function draw() {
  background(bg_image);

  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(+10,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    balloon.scale = 0.9;
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10);
    balloon.scale = 0.3;
  }
  drawSprites();
}

function writePosition(x,y){
  db.ref("balloon/position").set({
      "x":position.x + x,
      "y":position.y + y
  });
}

function readposition(data){
   position = data.val();
   balloon.x = position.x;
   balloon.y = position.y;
}

function showerror(){
   console.log("There is some error in the data");
}