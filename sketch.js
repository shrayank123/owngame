
var score=0;

var ground
var hero

function preload()
{
  groundImage = loadImage("basementBG.jpeg");
  heroimg = loadImage("hero.png");
  mons1 = loadImage("monster1.png")
  mons2 = loadImage("monster2.png")
  mons3 = loadImage("monster3.png")
  mons4 = loadImage("monster4.png")
  bull = loadImage("bullet.png")
}

function setup()
{
  createCanvas(1200, 600);
  ground = createSprite(600,270,1200,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  

  hero = createSprite(90,340,30,30);
  hero.addImage("hero",heroimg);
  hero.scale=0.5;

  bulletsGroup = new Group();
  Mon1Group = new Group();
}




function draw()
{
background("white")
 


if (keyDown("K"))
{
  spawnBullets()
  console.log("hi")
}
if(bulletsGroup.isTouching(Mon1Group))
{
  var Visibility=255
  Visibility=Visibility-5
  tint( 255, Visibility);
  image(mons1,500,500)
  Mon1Group.destroyEach();
  bulletsGroup.destroyEach();
  score = score+1

}


spawnMon1()

drawSprites()
textSize(40)
stroke(200,30,30)
text("Score: "+ score, 100,100);
}




function spawnMon1() {
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var Mon1 = createSprite(900,420,40,10);
    Mon1.y = Math.round(random(80,420));
    Mon1.addImage(mons1);
    Mon1.scale = 0.5;
    Mon1.velocityX = -3;
    Mon1.Visibility=255
    
     //assign lifetime to the variable
    //Mon1.lifetime = 200;
    
    //adjust the depth
    
    //add each cloud to the group
    //cloudsGroup.add(cloud);
    Mon1Group.add(Mon1);
  }
  
}


function spawnBullets() {
  if (frameCount % 90 === 0) {
    var bullet = createSprite(210,420,40,10);
    bullet.y = Math.round(random(80,420));
    bullet.addImage(bull);
    bullet.scale = 0.2;
    bullet.velocityX = 3;
    
     //assign lifetime to the variable
    //Mon1.lifetime = 200;
    
    //adjust the depth
    
    //add each cloud to the group
    //cloudsGroup.add(cloud);
    bulletsGroup.add(bullet);
  }
}






























































/*var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}*/