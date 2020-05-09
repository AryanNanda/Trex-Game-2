var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImage
var obstacle,obstacleImage1,obstacleImage2,obstacleImage3,obstacleImage4,obstacleImage5,obstacleImage6
var count=0 ; 
var PLAY =1;
var END = 0;
var gameState = PLAY;  
var LifetimeObstacles 
var LifetimeClouds
var gameOver,gameOverImage;
var restart,restartImage;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  restartImage = loadImage("restart.png")
  gameOverImage = loadImage("gameOver.png")
 groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacleImage1 = loadImage("obstacle1.png")
  obstacleImage2 = loadImage("obstacle2.png")
  obstacleImage3 = loadImage("obstacle3.png")
  obstacleImage4 = loadImage("obstacle4.png")
  obstacleImage5 = loadImage("obstacle5.png")
  obstacleImage6 = loadImage("obstacle6.png")
}

function setup() {
  createCanvas(400, 400);
 
  trex = createSprite(50,380,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("t2", trex_collided);
  gameOver = createSprite(200,200,10,10); 
  restart = createSprite(200,240,10,10);
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
LifetimeObstacles = new Group();
  LifetimeClouds = new Group();
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  cloudGroup = new Group();
   obstacleGroup = new Group();
  gameOver.addImage (gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false
  restart.addImage (restartImage);
  restart.scale = 0.5;
  restart.visible = false
    }

function draw() {
  background(0);
  
  text("Score: "+ count, 250, 100);
  if(gameState==PLAY){
     count = count+ Math.round(getFrameRate()/60 );
     if(keyDown("space") && trex.y>=361.5) {
    trex.velocityY = -15;
  }
  
  trex.velocityY = trex.velocityY + 0.8
     ground.velocityX = -2-3*count/100  ;     
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if(obstacleGroup.isTouching(trex)){
       gameState=END  
       
       }
     spawnClouds();
  spawnObstacles(); 
   

     
     
     
     }
  else if(gameState==END){
          
        ground.velocityX=0;  
          trex.velocityX=0;
          obstacleGroup.setVelocityXEach(0);
   cloudGroup.setVelocityXEach(0);
    LifetimeObstacles.setLifetimeEach(-1);
    LifetimeClouds.setLifetimeEach(-1);
    trex.changeAnimation("t2",trex_collided);
    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
     reset();
 }
          }
  
  console.log(trex.y);   
  
  trex.collide(invisibleGround);
  
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if ( frameCount % 60 === 0) {
     cloud = createSprite(400,320,40,10);
    cloud.y = Math.round(random(280,320));
    cloud.addImage("C1",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    LifetimeClouds.add(cloud);
     //assign lifetime to the variable
    cloud.lifetime = 134;
    cloudGroup.add(cloud)
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
}
  function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -6;
     obstacleGroup.add(obstacle);
    //generate random obstacles
    var rand = Math.round(random(1,6));
    //obstacle.setAnimation("obstacle" + rand);
    
    
    switch(rand){
      case 1:obstacle.addImage(obstacleImage1) ;
        break;
   case 2:obstacle.addImage(obstacleImage2) ;
        break;
    case 3:obstacle.addImage(obstacleImage3) ;
        break;
        case 4:obstacle.addImage(obstacleImage4) ;
       break;
        case 5:obstacle.addImage(obstacleImage5) ;
        break;
        case 6:obstacle.addImage(obstacleImage6) ;
        break;
        default:break;
        
    }
    
    LifetimeObstacles.add(obstacle);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 134;
  }
}
function reset(){
  gameState = PLAY;
  LifetimeObstacles.destroyEach();
  LifetimeClouds.destroyEach();
  trex.changeAnimation("running",trex_running)
  gameOver.visible= false
  restart.visible = false
 count= 0;
}