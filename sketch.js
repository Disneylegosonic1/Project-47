var ninja, enemy, ground, inground, boss, poison, star, edges, spikes;
var ninjaimg, enemyimg, gameState, snakeimg, spikeimg;
var ninjaStand, ninjaStar;
var skeletonGroup, starGroup, spikeGroup;
var starSound, bossSound, winSound;
var backgroundimg;
var flag = 1;
var score = 0;
var bosshealth = 5;

function preload(){
  ninjaimg = loadAnimation("Ninja1.png", "Ninja2.png","Ninja3.png","Ninja4.png","Ninja5.png","Ninja6.png");
  ninjaStand = loadAnimation("NinjaStand.png");
  enemyimg = loadImage("Skeleton.png");
  ninjaStar = loadImage("NinjaStar.png");
  snakeimg = loadImage("Snake.png");
  poisonimg = loadImage("Poison.png");
  spikeimg = loadImage("Spike.png");

  starSound = loadSound("Star Throw.mp3");
  bossSound = loadSound("Monster Roar sound effect.mp3");
  winSound = loadSound("Celebration Sound Effect.mp3");

  backgroundimg = loadImage("AsianVillage.jpg");


}

function setup() {
  createCanvas(displayWidth,300);
  gameState = 0;
  ninja = createSprite(200, 300, 50, 50);
  ninja.addAnimation("standing",ninjaStand);
  ninja.addAnimation("running",ninjaimg);
  ninja.scale = 0.4;

  skeletonGroup = new Group();
  starGroup = new Group();
  poisonGroup = new Group();
  spikeGroup = new Group();

  boss = createSprite(displayWidth-80, 150);
  boss.visible = false;
  boss.addImage("snake", snakeimg);
  boss.scale = 0.2;

 
  ground = createSprite(displayWidth/2, 305, width, 5);

  

}


function draw() {
  background(0);  
  if(gameState != 0){
    background(backgroundimg);  
  }
  edges = createEdgeSprites();
  if(gameState == 0){
    stroke("darkblue");
    text("Welcome to Ambush", width/2 - 50, 150);
    textSize(9)
    text("You are a ninja in a peaceful village, the sole defender of the land, and are ensuring the peace for future generations. However, one day, an evil snake wishes to wreak havoc on the people and their homes, and attacks with his evil army of skeletons. You must use your weapons to vanquish your foes, and restore the peace to your village.",  width/2 - 750, 130);
    text("The rules are simple: Press the right arrow to start and the up arrow to jump. Press space to shoot projectiles to defeat enemies. Kill the snake to win!", displayWidth/3.5, 165)
    if(keyWentDown("right")){
      gameState = 1;
      ninja.changeAnimation("running",ninjaimg);
      
    
      
    }
  }

  ninja.collide(ground);

  if (gameState == 1)
  {
    if(keyWentDown("space")){
      starSound.play();
    }
    if(score <= 300){
  createEnemy();
  createSpikes();
  }
  else{
    if(score > 300 && score <= 320){
      bossSound.play();
    }
    if(keyWentDown("space")&&score >= 300){
      createStar2();
  
    }
    skeletonGroup.destroyEach();
    boss.visible = true;
    createPoison();
    stroke("purple");
    text(bosshealth, displayWidth-150, 50);

    if (flag == 1){
    boss.velocityY = -5;
    }
    if(boss.y < 0){boss.velocityY=7; flag = 0;}
    else if(boss.y > 300){boss.velocityY=-7;}
    // if(boss.isTouching(edges[2])||boss.isTouching(edges[3])){
    //   boss.bounceOff();
    // }

  }
  console.log(ninja.y);
  
  if(keyWentDown("up")&&ninja.y >= 200 && gameState != 0){
    ninja.velocityY = -13.5;
  }
  ninja.velocityY = ninja.velocityY + 0.5;

  if(keyWentDown("space") && score <= 300){
    createStar();

  }


  for(var i = 0; i < skeletonGroup.length; i++)
  {
    if(skeletonGroup.get(i).isTouching(starGroup))
    {
      skeletonGroup.get(i).destroy();
      starGroup.destroyEach();
      score += 10;
    }
  }
  for(var i = 0; i < poisonGroup.length; i++){
  if(poisonGroup.get(i).isTouching(starGroup))
  {
    poisonGroup.get(i).destroy();
    starGroup.destroyEach();
    score += 10;
  }
}
  if(ninja.isTouching(skeletonGroup) || ninja.isTouching(poisonGroup) || ninja.isTouching(spikeGroup)){
    gameState = 2;
    ninja.y=300;
    ninja.velocityY=0;
    ninja.changeAnimation("standing",ninjaStand);
    skeletonGroup.setVelocityXEach(0);
    starGroup.setVelocityXEach(0);
    spikeGroup.setVelocityXEach(0);
    
  }
  }




  if(starGroup.isTouching(boss)){
    starGroup.destroyEach();
    bosshealth -= 1;
    if(bosshealth == 0){
      ninja.x = width/2;
      ninja.y=300;
      ninja.velocityY=0;
      gameState = 3;
      boss.destroy();
      winSound.play();
    
    }
     
  }

  


  drawSprites();

  if(gameState == 2){
  stroke("red");
  textSize(30);
  text("GAME OVER!", displayWidth/2, 150);
  }
  else if (gameState == 3){
  stroke("green");
  textSize(30);
  textFont("Georgia");
  text("YOU WIN!", displayWidth/2, 150);
  createStar3();
  //winSound.play();
  }

  stroke("grey");
  text(score, displayWidth-100, 50);

}

function createEnemy() {
   if(frameCount % 35 == 0){
    enemy = createSprite(displayWidth, Math.round(random(60,250)), 50, 50);
    skeletonGroup.add(enemy);
    enemy.addImage("skeleton",enemyimg);
    enemy.scale = 0.5;
    enemy.velocityX = -20;
    enemy.lifetime = (displayWidth/10)+10;
   }
}

function createStar() {
    star = createSprite(200, ninja.y, 10, 10);
    star.addImage("ninjastar", ninjaStar);
    starGroup.add(star);
    star.scale = 0.05;
    star.velocityX = 15;
    star.lifetime = (displayWidth/10)+10;
}

function createStar2() {
  star = createSprite(200, ninja.y, 10, 10);
  star.addImage("ninjastar", ninjaStar);
  starGroup.add(star);
  star.scale = 0.04;
  star.velocityX = 45;
  star.lifetime = (displayWidth/10)+10;
}

function createStar3() {
  star = createSprite(Math.round(random(width/2-400,width/2+400)), 300, 10, 10);
  star.addImage("ninjastar", ninjaStar);
  starGroup.add(star);
  star.scale = 0.04;
  star.velocityY = -5;
  star.lifetime = (displayWidth/10)+10;
}


function createPoison() {
  if(frameCount % 40 == 0){
  poison = createSprite(boss.x, boss.y, 10, 10);
  poison.addImage("poison", poisonimg);
  poisonGroup.add(poison);
  poison.scale = 0.15;
  poison.velocityX = -9;
  poison.lifetime = (displayWidth/10)+10;
  }
}

function createSpikes() {
  if(frameCount % 100 == 0){
   spikes = createSprite(displayWidth, 300, 50, 50);
   spikes.setCollider("rectangle", 0, 0, 20, 30);
   spikeGroup.add(spikes);
   spikes.addImage("spikes",spikeimg);
   spikes.scale = 0.3;
   spikes.velocityX = -10;
   spikes.lifetime = (displayWidth/10)+10;
  }
}