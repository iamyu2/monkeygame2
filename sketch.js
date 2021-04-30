
//gamestates
var play = 1;
var end = 2;
gamestate = play;

// sprites and images
var monkey, monkey_running, monkeyA;
var banana, obstacle;
var bananaImage, obstacleImage;
var score;
var ground, sun;

//groups
var bananasGroup, obstaclesGroup, cloudsGroup;

function preload(){
  
  //adding annimations
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyA = loadAnimation("sprite_0.png");
  
  //adding images
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
}

function setup() {
  
 //canvas
 createCanvas(770, 420);
 
 //monkey
 monkey = createSprite(50, 340, 10, 10);
 monkey.addAnimation("running", monkey_running);
 monkey.addAnimation("monkey", monkeyA);
 monkey.scale = 0.2;
 monkey.setCollider("circle", 0, 0, 230);
  
 //ground and sun
 ground = createSprite(385, 405, 770, 20);
 sun = createSprite(740, 30, 40, 40);
 sun.shapeColor = "yellow";
 
 //groups
 obstaclesGroup = createGroup();
 cloudsGroup = createGroup();
 bananasGroup = createGroup();
  
 //
 score = 0;
  
}


function draw() {
 
 //background
 background(80, 50, 150);
  
 //scoring
 text("score:" + score, 20, 20);
  
 //play
 if (gamestate === play) {
   
   //functions
   bananaF();
   obstacleF(); 
   cloudF();
   
   //animation
   monkey.changeAnimation("running", monkey_running);
   
   //scoring
   if (monkey.isTouching(bananasGroup)){
     score = score + 100;
     bananasGroup.destroyEach();
   }
   
   //gravity and control
   monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(ground);
   if(keyDown("space") && monkey.y >= 333) {
     monkey.velocityY = -16;
    }
   
   //change gamestate
   if (obstaclesGroup.isTouching(monkey)){
     gamestate = end;
   }
   
 }
  
 //end
 if (gamestate === end){
    
   //set velocity
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
   
   //chenge image
   monkey.changeAnimation("monkey", monkeyA);
   
   //set lifetime
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
   
   //saw end
   text("G  A  M  E    IS    O V E R", 300, 210);
   text("R E S T A R T   THE   G A M E", 290, 240);
 }
  
 //draw
 drawSprites();
  
}

//main bananaF function
function  bananaF(){
  //
  var select_banana = Math.round(random(1))
  if (World.frameCount % 120 == 0){
    if (select_banana == 1){
      bananaA();
    }
  }
}

//bananaA function
function bananaA(){
  //
  banana = createSprite(770, 260, 30, 30);
  banana.y = Math.round(random(260,300));
  banana.addImage(bananaImage);
  banana.velocityX = -8;
  banana.lifetime = 200;
  banana.scale = 0.1;
  bananasGroup.add(banana);
  return banana;
}

//main obstacleF function
function  obstacleF(){
  //
  var select_O = Math.round(random(1))
  if (World.frameCount % 100 == 0){
    if (select_O == 1){
      obstacleA();
    }
  }
}

// obstacleA function 
function obstacleA(){
  //
  obstacle = createSprite(770, 340, 10, 10);
  obstacle.addImage(obstaceImage);
  obstacle.velocityX = -10;
  obstacle.lifetime = 300;
  obstacle.scale = 0.3;
  obstacle.setCollider("circle", 0, 0, 200);
  obstaclesGroup.add(obstacle);
  
}

//main cloudF function
function cloudF (){
  //
  var select_C = Math.round(random(1,2))
  if (World.frameCount % 60 == 0){
    if (select_C == 1){
      cloud1();
    }
    if (select_C == 2){
      cloud2();
    }
  }
}

//cloud function2
function cloud1(){
  //
  var cloudA = createSprite(770, 0, 70, 40);
  cloudA.y = Math.round(random(10,100));
  cloudA.velocityX = -8;
  cloudA.lifetime = 300;
  cloudA.shapeColor = "gray";
  cloudsGroup.add(cloudA);
}

//cloud function2
function cloud2(){
  //
  var cloudB = createSprite(770, 0, 70, 40);
  cloudB.y = Math.round(random(10,100));
  cloudB.velocityX = -8;
  cloudB.lifetime = 300;
  cloudB.shapeColor = "white";
  cloudsGroup.add(cloudB);
}



