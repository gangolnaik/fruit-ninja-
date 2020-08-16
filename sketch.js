var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sword,swordImage;
var fruitsGroup, fruit1,fruit2,fruit3,fruit4,fruit1Image,fruit2Image,fruit3Image,fruit4Image;
var aliensGroup,alien,alienImage;

var score;
var gameOverImg;
var checkPointSound,dieSound,bladeSound;

function preload(){
  swordImage = loadImage("sword.png");
  
  alien = loadImage("alien.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  gameOverImg = loadImage("gameOver.png")
  
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  bladeSound = loadSound("jumper.mp3")
}

function setup() {
  createCanvas(400, 400);
  
  sword = createSprite(200,200,20,50);
  
  sword.addImage(swordImage);
  

  sword.scale = 0.6;
  
  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg);
  
  //create Obstacle and Cloud Groups
  fruitsGroup = createGroup();
  aliensGroup = createGroup();
  score = 0;
  
}

function draw() {
  
  background("lightblue");
  //displaying score
  text("Score: "+ score, 300,50);
  
  
  if(gameState === PLAY){
    //move the 
    gameOver.visible = false;
    if(score>0 && score%10 === 0){
       checkPointSound.play() 
    }
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    //spawn the clouds
    alienes();
  
    //spawn obstacles on the ground
    fruits();
    
    if(fruitsGroup.isTouching(sword)) {
      score = score + 1;
      bladeSound.play();
      fruitsGroup.destroyEach();
    }
    
    if(aliensGroup.isTouching(sword)) {
        gameState = END;
        dieSound.play();
        aliensGroup.destroyEach();
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      //set lifetime of the game objects so that they are never destroyed    
   }
  
  drawSprites();
}

function fruits(){
 if (frameCount % 30===0) {
   var frui1 = createSprite(-40,200,10,40);
   frui1.velocityX = (6 + score/10);
   frui1.y = Math.round(random(50,300));
   var frui2 = createSprite(440,200,10,40);
   frui2.velocityX = -(6 + score/10);
   frui2.y = Math.round(random(50,300));
    //generate random obstacles
    var randi = Math.round(random(1,4));
    switch(randi) {
      case 1: frui1.addImage(fruit1);
              break;
      case 2: frui1.addImage(fruit2);
              break;
      case 3: frui1.addImage(fruit3);
              break;
      case 4: frui1.addImage(fruit4);
              break;
      default: break;
    }
    var rando = Math.round(random(1,4));
    switch(rando) {
      case 1: frui2.addImage(fruit1);
              break;
      case 2: frui2.addImage(fruit2);
              break;
      case 3: frui2.addImage(fruit3);
              break;
      case 4: frui2.addImage(fruit4);
              break;
      default: break;
    }
    //assign scale and lifetime to the obstacle           
    frui1.scale = 0.2;
    frui1.lifetime = 300;
    frui2.scale = 0.2;
    frui2.lifetime = 300;
   
   //add each obstacle to the group
    fruitsGroup.add(frui1);
    fruitsGroup.add(frui2);
 }
}

function alienes() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var aliens = createSprite(600,300,40,10);
    aliens.addImage(alien);
    aliens.scale = 0.4;
    aliens.y= Math.round(random(50,500));
    aliens.velocityX = -(6 + score/5);
    
    //assign lifetime to the variable
    aliens.lifetime = 300;
    
    
    //add each cloud to the group
    aliensGroup.add(aliens);
    }
}

