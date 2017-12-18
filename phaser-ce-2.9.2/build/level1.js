
var game = new Phaser.Game(1500,600,Phaser.AUTO,'gameContainer',{
    preload: preload,
    create: create,
    update: update

});

var player;
var cursors;
var shoot;
var enemy;
var background;
var bullet;
var weapon;
var blocks;
var level2background;
var level3background;
var gunsound;

var trump1;

var enemy1;
var enemy2;
var enemy3;
var enemy4;
var enemy5;
var enemy6;
var enemy7;
var enemy8;
var enemy9;

var enemy10;
var enemy11;
var enemy12;
var enemy13;
var enemy14;
var enemy15;
var enemy16;
var enemy17;
var enemy18;
var enemy19;
var hurt;

function preload() {



    game.load.crossOrigin = 'anonymous';

    game.load.spritesheet('player', 'assets/images/bernie.png',70,147);
    game.load.image('background', 'assets/images/level1.png');
    game.load.image('bullet',"assets/images/bullet.png");
    game.load.image('block',"assets/images/block.png");
    game.load.image('level2',"assets/images/level2.png");
    game.load.image('level3',"assets/images/level3.png");
    game.load.spritesheet('enemy',"assets/images/enemy.png",70,125);
    game.load.spritesheet('trumpEnemy',"assets/images/trump.png",90,200);
    game.load.audio('gun',"assets/audio/Spit_Splat-Mike_Koenig-1170500447.mp3");
    game.load.audio('music',"assets/audio/Darude - Sandstorm.mp3" );
    game.load.audio('hurt',"assets/audio/Pain-SoundBible.com-1883168362.mp3");
    game.stage.backgroundColor = 'background';
}


function obsticle1(){
    blocks = game.add.physicsGroup();

    for(var i=1;i<19;i ++){
        i+=1;
        blocks.create((i*1000), 500, 'block');
        blocks.create((i*1000)+100, 500, 'block');
        blocks.create((i*1000)+100, 400, 'block');
    }


    blocks.setAll('body.immovable', true);

}

function Enemy(index,game,x,y) {
    this.Enemy = game.add.sprite(x, y, "enemy", 4);
    this.Enemy.animations.add('walk', [5, 6, 7], 8, true);
    this.Enemy.animations.add('walkBack', [3, 2, 1], 8, true);
    this.Enemy.animations.add('punchForwards', [7,8], 2, true);
    this.Enemy.animations.add('punchBack', [0,1], 2, true);
    this.Enemy.anchor.setTo(0.5, 0.5);
    this.Enemy.name = index.toString();
    game.physics.enable(this.Enemy, Phaser.Physics.ARCADE);
    this.Enemy.body.collideWorldBounds = true;
    this.Enemy.scale.setTo(1.75, 1.75);
    return this.Enemy;
}

function Trump(index,game,x,y) {
    this.Trump = game.add.sprite(x, y, "trumpEnemy", 4);
    this.Trump.animations.add('walk', [4, 5, 6], 10, true);
    this.Trump.animations.add('walkBack', [1, 2, 3], 10, true);
    this.Trump.animations.add('punchForwards', [7], 10, true);
    this.Trump.animations.add('punchBack', [0], 10, true);
    this.Trump.anchor.setTo(0.5, 0.5);
    this.Trump.name = index.toString();
    game.physics.enable(this.Trump, Phaser.Physics.ARCADE);
    this.Trump.body.collideWorldBounds = true;
    this.Trump.scale.setTo(2.5, 1.75);
    this.Trump.setHealth(1000);
    return this.Trump;
}


function hitEnemy (enemy,bullet) {
    hurt.play();
    // bullet.kill();
    enemy.kill();
    bullet.x=-100;
    bullet.y=0;

    enemy.x=-100;
    enemy.y=0;
    console.log("Hit");
}
function create() {

    background = game.add.tileSprite(0, 0, 10000, 600, 'background');
    level2background = game.add.tileSprite(10000,0,10000,600,'level2');
    level3background = game.add.tileSprite(20000,0,3000,600,'level3');
    player = game.add.sprite(200, 200, 'player',4);
    player.scale.setTo(1.5,1.5);

    var music = game.add.audio('music');


    music.play();


    //TRUMP
    trump1 = new Trump(1,game, 21000,1600);

    //ENEMY1
    enemy1 = new Enemy(1,game,1500, 500);
    //END ENEMY 1
    enemy2 = new Enemy(2,game,2500, 500);

    enemy3 = new Enemy(3,game,3500, 500);

    enemy4 = new Enemy(4,game,4500, 500);

    enemy5 = new Enemy(5,game,5500, 500);

    enemy6 = new Enemy(6,game,6500, 500);

    enemy7 = new Enemy(6,game,7500, 500);

    enemy8 = new Enemy(6,game,8500, 500);

    enemy9 = new Enemy(6,game,9500, 500);
    //end level 1
    enemy10 = new Enemy(7,game,10500, 500);

    enemy11 = new Enemy(8,game,11500, 500);

    enemy12 = new Enemy(9,game,12500, 500);

    enemy13 = new Enemy(10,game,13500, 500);

    enemy14 = new Enemy(11,game,14500, 500);

    enemy15 = new Enemy(12,game,15500, 500);

    enemy16 = new Enemy(13,game,16500, 500);

    enemy17 = new Enemy(14,game,17500, 500);

    enemy18 = new Enemy(15,game,18500, 500);

    enemy19 = new Enemy(16,game,19500, 500);



    weapon = game.add.weapon(100,'bullet');
    weapon.bulletSpeed = 1000;
    weapon.trackSprite(player, 80,125);
    weapon.fireRate = 1000;

    weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;


    game.physics.arcade.enable(player);
    player.setHealth(300);
    var barConfig = {x: 200, y: 100};
    this.myHealthBar = new HealthBar(this.game, barConfig);
    this.myHealthBar.setFixedToCamera(true);
    this.myHealthBar.setBarColor('#008000');

    var trumpConfig = {x: trump1.x, y: 200};
    this.trumpBar = new HealthBar(this.game, trumpConfig);
    this.trumpBar.setBarColor('#FF0000');

    game.physics.enable([player], Phaser.Physics.ARCADE);

    game.world.setBounds(0,0,23000,600);

    gunsound = game.add.audio('gun');
    hurt = game.add.audio("hurt");

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 1000;

    player.animations.add('walk', [5,6,7], 10, true);
    player.animations.add('walkBack',[1,2,3],10, true);

    cursors = game.input.keyboard.createCursorKeys();
    shoot = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    game.camera.follow(player);

    obsticle1();

}
function killPlayer() {
    player.kill();
    //bmpText = game.add.bitmapText(10, 100, 'carrier_command','YOU LOSE',34);
    // bmpText.inputEnabled = true;
    // bmpText.input.enableDrag();
}

function update () {
    this.myHealthBar.setPercent(player.health);
    this.trumpBar.setPercent(trump1.health);
    this.trumpBar.setPosition(trump1.x,200);
    game.physics.arcade.collide(player, blocks);
    game.physics.arcade.collide(bullet, blocks);

    if(player.health<0){
        killPlayer();
    }
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
        player.animations.play('walkBack');
    }
    else if (cursors.right.isDown && cursors.left.isUp)
    {
        player.body.velocity.x = 300;
        player.animations.play('walk');

    }
    else
    {
        player.animations.stop();
        if(player.frame == 5 || player.frame == 6 || player.frame == 7){
            player.frame = 6;
        }
        if(player.frame == 3 || player.frame == 2 || player.frame == 1){
            player.frame = 2;
        }
    }

    if (cursors.up.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -600;
    }



    if(shoot.isDown){
        if (player.frame == 3 || player.frame == 2 || player.frame == 1) {
            weapon.fireAngle = Phaser.ANGLE_LEFT;
            gunsound.play();
        } else if (player.frame == 5 || player.frame == 6 || player.frame == 7) {
            weapon.fireAngle = Phaser.ANGLE_RIGHT;
            gunsound.play();
        }
        weapon.fire();
    }

    //enemy1--------------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy1, blocks);
    game.physics.arcade.collide(enemy1, player);
    if(game.physics.arcade.collide(enemy1, weapon.bullets)){
        hitEnemy(enemy1,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy1.x<=player.x+200 && enemy1.x>=player.x-200 || enemy1.x>= player.x-200 && enemy1.x<=player.x+200)){
       if(enemy1.body.velocity.x>0){
           //enemy1.body.velocity.x=0;
           enemy1.animations.play('punchForwards');
           //enemy1.frame=8;
           player.health-=1;
       }
       else if(enemy1.body.velocity.x<0){
           // enemy1.body.velocity.x=0;
            enemy1.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
       }
    }
    if (enemy1.x < player.x + 500){
        enemy1.body.velocity.x=-225;
    }
    if(enemy1.x <= player.x){
        enemy1.body.velocity.x*=-1;

    }
    if(enemy1.body.velocity.x==0){
        enemy1.frame=4;
    }
    else if(enemy1.body.velocity.x>0){
        enemy1.animations.play("walk");
    }
    else{
        enemy1.animations.play("walkBack");
    }
    //enemy1END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy2, blocks);
    game.physics.arcade.collide(enemy2, player);
    if(game.physics.arcade.collide(enemy2, weapon.bullets)){
        hitEnemy(enemy2,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy2.x<=player.x+200 && enemy2.x>=player.x-200 || enemy2.x>= player.x-200 && enemy2.x<=player.x+200)){
        if(enemy2.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy2.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy2.body.velocity.x<0){
            // enemy1.body.velocity.x=0;
            enemy2.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy2.x < player.x + 500){
        enemy2.body.velocity.x=-225;
    }
    if(enemy2.x <= player.x){
        enemy2.body.velocity.x*=-1;

    }
    if(enemy2.body.velocity.x==0){
        enemy2.frame=4;
    }
    else if(enemy2.body.velocity.x>0){
        enemy2.animations.play("walk");
    }
    else{
        enemy2.animations.play("walkBack");
    }
    //enemy2END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy3, blocks);
    game.physics.arcade.collide(enemy3, player);
    if(game.physics.arcade.collide(enemy3, weapon.bullets)){
        hitEnemy(enemy3,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy3.x<=player.x+200 && enemy3.x>=player.x-200 || enemy3.x>= player.x-200 && enemy3.x<=player.x+200)){
        if(enemy3.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy3.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy3.body.velocity.x<0){
            // enemy1.body.velocity.x=0;
            enemy3.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy3.x < player.x + 500){
        enemy3.body.velocity.x=-225;
    }
    if(enemy3.x <= player.x){
        enemy3.body.velocity.x*=-1;

    }
    if(enemy3.body.velocity.x==0){
        enemy3.frame=4;
    }
    else if(enemy3.body.velocity.x>0){
        enemy3.animations.play("walk");
    }
    else{
        enemy3.animations.play("walkBack");
    }
    //enemy3END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy4, blocks);
    game.physics.arcade.collide(enemy4, player);
    if(game.physics.arcade.collide(enemy4, weapon.bullets)){
        hitEnemy(enemy4,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy4.x<=player.x+200 && enemy4.x>=player.x-200 || enemy4.x>= player.x-200 && enemy4.x<=player.x+200)){
        if(enemy4.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy4.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy4.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy4.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy4.x < player.x + 500){
        enemy4.body.velocity.x=-225;
    }
    if(enemy4.x <= player.x){
        enemy4.body.velocity.x*=-1;

    }
    if(enemy4.body.velocity.x==0){
        enemy4.frame=4;
    }
    else if(enemy4.body.velocity.x>0){
        enemy4.animations.play("walk");
    }
    else{
        enemy4.animations.play("walkBack");
    }
    //enemy3END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy5, blocks);
    game.physics.arcade.collide(enemy5, player);
    if(game.physics.arcade.collide(enemy5, weapon.bullets)){
        hitEnemy(enemy5,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy5.x<=player.x+200 && enemy5.x>=player.x-200 || enemy5.x>= player.x-200 && enemy5.x<=player.x+200)){
        if(enemy5.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy5.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy5.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy5.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy5.x < player.x + 500){
        enemy5.body.velocity.x=-225;
    }
    if(enemy5.x <= player.x){
        enemy5.body.velocity.x*=-1;

    }
    if(enemy5.body.velocity.x==0){
        enemy5.frame=4;
    }
    else if(enemy5.body.velocity.x>0){
        enemy5.animations.play("walk");
    }
    else{
        enemy5.animations.play("walkBack");
    }
    //------------------------------------------------------------
    //enemy4END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy6, blocks);
    game.physics.arcade.collide(enemy6, player);
    if(game.physics.arcade.collide(enemy6, weapon.bullets)){
        hitEnemy(enemy6,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy6.x<=player.x+200 && enemy6.x>=player.x-200 || enemy6.x>= player.x-200 && enemy6.x<=player.x+200)){
        if(enemy6.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy6.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy6.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy6.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy6.x < player.x + 500){
        enemy6.body.velocity.x=-225;
    }
    if(enemy6.x <= player.x){
        enemy6.body.velocity.x*=-1;

    }
    if(enemy6.body.velocity.x==0){
        enemy6.frame=4;
    }
    else if(enemy6.body.velocity.x>0){
        enemy6.animations.play("walk");
    }
    else{
        enemy6.animations.play("walkBack");
    }

    //enemy4END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy7, blocks);
    game.physics.arcade.collide(enemy7, player);
    if(game.physics.arcade.collide(enemy7, weapon.bullets)){
        hitEnemy(enemy7,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy7.x<=player.x+200 && enemy7.x>=player.x-200 || enemy7.x>= player.x-200 && enemy7.x<=player.x+200)){
        if(enemy7.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy7.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy7.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy7.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy7.x < player.x + 500){
        enemy7.body.velocity.x=-225;
    }
    if(enemy7.x <= player.x){
        enemy7.body.velocity.x*=-1;

    }
    if(enemy7.body.velocity.x==0){
        enemy7.frame=4;
    }
    else if(enemy7.body.velocity.x>0){
        enemy7.animations.play("walk");
    }
    else{
        enemy7.animations.play("walkBack");
    }
    //enemy4END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy8, blocks);
    game.physics.arcade.collide(enemy8, player);
    if(game.physics.arcade.collide(enemy8, weapon.bullets)){
        hitEnemy(enemy8,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy8.x<=player.x+200 && enemy8.x>=player.x-200 || enemy8.x>= player.x-200 && enemy8.x<=player.x+200)){
        if(enemy8.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy8.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy8.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy8.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy8.x < player.x + 500){
        enemy8.body.velocity.x=-225;
    }
    if(enemy8.x <= player.x){
        enemy8.body.velocity.x*=-1;

    }
    if(enemy8.body.velocity.x==0){
        enemy8.frame=4;
    }
    else if(enemy8.body.velocity.x>0){
        enemy8.animations.play("walk");
    }
    else{
        enemy8.animations.play("walkBack");
    }
    //enemy4END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy9, blocks);
    game.physics.arcade.collide(enemy9, player);
    if(game.physics.arcade.collide(enemy9, weapon.bullets)){
        hitEnemy(enemy9,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy9.x<=player.x+200 && enemy9.x>=player.x-200 || enemy9.x>= player.x-200 && enemy9.x<=player.x+200)){
        if(enemy9.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy9.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy9.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy9.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy9.x < player.x + 500){
        enemy9.body.velocity.x=-225;
    }
    if(enemy9.x <= player.x){
        enemy9.body.velocity.x*=-1;

    }
    if(enemy9.body.velocity.x==0){
        enemy9.frame=4;
    }
    else if(enemy9.body.velocity.x>0){
        enemy9.animations.play("walk");
    }
    else{
        enemy9.animations.play("walkBack");
    }

    //enemy9END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy10, blocks);
    game.physics.arcade.collide(enemy10, player);
    if(game.physics.arcade.collide(enemy10, weapon.bullets)){
        hitEnemy(enemy10,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy10.x<=player.x+200 && enemy10.x>=player.x-200 || enemy10.x>= player.x-200 && enemy10.x<=player.x+200)){
        if(enemy10.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy10.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy10.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy10.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy10.x < player.x + 500){
        enemy10.body.velocity.x=-225;
    }
    if(enemy10.x <= player.x){
        enemy10.body.velocity.x*=-1;

    }
    if(enemy10.body.velocity.x==0){
        enemy10.frame=4;
    }
    else if(enemy10.body.velocity.x>0){
        enemy10.animations.play("walk");
    }
    else{
        enemy10.animations.play("walkBack");
    }

    //enemy10END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy11, blocks);
    game.physics.arcade.collide(enemy11, player);
    if(game.physics.arcade.collide(enemy11, weapon.bullets)){
        hitEnemy(enemy11,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy11.x<=player.x+200 && enemy11.x>=player.x-200 || enemy11.x>= player.x-200 && enemy11.x<=player.x+200)){
        if(enemy11.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy11.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy11.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy11.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy11.x < player.x + 500){
        enemy11.body.velocity.x=-225;
    }
    if(enemy11.x <= player.x){
        enemy11.body.velocity.x*=-1;

    }
    if(enemy11.body.velocity.x==0){
        enemy11.frame=4;
    }
    else if(enemy11.body.velocity.x>0){
        enemy11.animations.play("walk");
    }
    else{
        enemy11.animations.play("walkBack");
    }

    //enemy11END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy12, blocks);
    game.physics.arcade.collide(enemy12, player);
    if(game.physics.arcade.collide(enemy12, weapon.bullets)){
        hitEnemy(enemy12,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy12.x<=player.x+200 && enemy12.x>=player.x-200 || enemy12.x>= player.x-200 && enemy12.x<=player.x+200)){
        if(enemy12.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy12.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy12.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy12.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy12.x < player.x + 500){
        enemy12.body.velocity.x=-225;
    }
    if(enemy12.x <= player.x){
        enemy12.body.velocity.x*=-1;

    }
    if(enemy12.body.velocity.x==0){
        enemy12.frame=4;
    }
    else if(enemy12.body.velocity.x>0){
        enemy12.animations.play("walk");
    }
    else{
        enemy12.animations.play("walkBack");
    }

    //enemy12END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy13, blocks);
    game.physics.arcade.collide(enemy13, player);
    if(game.physics.arcade.collide(enemy13, weapon.bullets)){
        hitEnemy(enemy13,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy13.x<=player.x+200 && enemy13.x>=player.x-200 || enemy13.x>= player.x-200 && enemy13.x<=player.x+200)){
        if(enemy13.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy13.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy13.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy13.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy13.x < player.x + 500){
        enemy12.body.velocity.x=-225;
    }
    if(enemy13.x <= player.x){
        enemy13.body.velocity.x*=-1;

    }
    if(enemy13.body.velocity.x==0){
        enemy13.frame=4;
    }
    else if(enemy13.body.velocity.x>0){
        enemy13.animations.play("walk");
    }
    else{
        enemy13.animations.play("walkBack");
    }

    //enemy13END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy14, blocks);
    game.physics.arcade.collide(enemy14, player);
    if(game.physics.arcade.collide(enemy14, weapon.bullets)){
        hitEnemy(enemy14,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy14.x<=player.x+200 && enemy14.x>=player.x-200 || enemy14.x>= player.x-200 && enemy14.x<=player.x+200)){
        if(enemy14.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy14.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy14.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy14.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy14.x < player.x + 500){
        enemy14.body.velocity.x=-225;
    }
    if(enemy14.x <= player.x){
        enemy14.body.velocity.x*=-1;

    }
    if(enemy14.body.velocity.x==0){
        enemy14.frame=4;
    }
    else if(enemy14.body.velocity.x>0){
        enemy14.animations.play("walk");
    }
    else{
        enemy14.animations.play("walkBack");
    }

    //enemy14END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy15, blocks);
    game.physics.arcade.collide(enemy15, player);
    if(game.physics.arcade.collide(enemy15, weapon.bullets)){
        hitEnemy(enemy15,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy15.x<=player.x+200 && enemy15.x>=player.x-200 || enemy15.x>= player.x-200 && enemy15.x<=player.x+200)){
        if(enemy15.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy15.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy15.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy15.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy15.x < player.x + 500){
        enemy15.body.velocity.x=-225;
    }
    if(enemy15.x <= player.x){
        enemy15.body.velocity.x*=-1;

    }
    if(enemy15.body.velocity.x==0){
        enemy15.frame=4;
    }
    else if(enemy15.body.velocity.x>0){
        enemy15.animations.play("walk");
    }
    else{
        enemy15.animations.play("walkBack");
    }

    //enemy15END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy16, blocks);
    game.physics.arcade.collide(enemy16, player);
    if(game.physics.arcade.collide(enemy16, weapon.bullets)){
        hitEnemy(enemy16,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy16.x<=player.x+200 && enemy16.x>=player.x-200 || enemy16.x>= player.x-200 && enemy16.x<=player.x+200)){
        if(enemy16.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy16.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy16.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy16.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy16.x < player.x + 500){
        enemy16.body.velocity.x=-225;
    }
    if(enemy16.x <= player.x){
        enemy16.body.velocity.x*=-1;

    }
    if(enemy16.body.velocity.x==0){
        enemy16.frame=4;
    }
    else if(enemy16.body.velocity.x>0){
        enemy16.animations.play("walk");
    }
    else{
        enemy16.animations.play("walkBack");
    }

    //enemy16END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy17, blocks);
    game.physics.arcade.collide(enemy17, player);
    if(game.physics.arcade.collide(enemy17, weapon.bullets)){
        hitEnemy(enemy17,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy17.x<=player.x+200 && enemy17.x>=player.x-200 || enemy17.x>= player.x-200 && enemy17.x<=player.x+200)){
        if(enemy17.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy17.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy17.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy17.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy17.x < player.x + 500){
        enemy17.body.velocity.x=-225;
    }
    if(enemy17.x <= player.x){
        enemy17.body.velocity.x*=-1;

    }
    if(enemy17.body.velocity.x==0){
        enemy17.frame=4;
    }
    else if(enemy17.body.velocity.x>0){
        enemy17.animations.play("walk");
    }
    else{
        enemy17.animations.play("walkBack");
    }

    //enemy17END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy18, blocks);
    game.physics.arcade.collide(enemy18, player);
    if(game.physics.arcade.collide(enemy18, weapon.bullets)){
        hitEnemy(enemy18,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy18.x<=player.x+200 && enemy18.x>=player.x-200 || enemy18.x>= player.x-200 && enemy18.x<=player.x+200)){
        if(enemy18.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy18.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy18.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy18.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy18.x < player.x + 500){
        enemy18.body.velocity.x=-225;
    }
    if(enemy18.x <= player.x){
        enemy18.body.velocity.x*=-1;

    }
    if(enemy18.body.velocity.x==0){
        enemy18.frame=4;
    }
    else if(enemy18.body.velocity.x>0){
        enemy18.animations.play("walk");
    }
    else{
        enemy18.animations.play("walkBack");
    }

    //enemy18END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(enemy19, blocks);
    game.physics.arcade.collide(enemy19, player);
    if(game.physics.arcade.collide(enemy19, weapon.bullets)){
        hitEnemy(enemy19,weapon.bullets);
    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((enemy19.x<=player.x+200 && enemy19.x>=player.x-200 || enemy19.x>= player.x-200 && enemy19.x<=player.x+200)){
        if(enemy19.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            enemy19.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=1;
        }
        else if(enemy19.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            enemy19.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=1;
        }
    }
    if (enemy19.x < player.x + 500){
        enemy19.body.velocity.x=-225;
    }
    if(enemy19.x <= player.x){
        enemy19.body.velocity.x*=-1;

    }
    if(enemy19.body.velocity.x==0){
        enemy19.frame=4;
    }
    else if(enemy19.body.velocity.x>0){
        enemy19.animations.play("walk");
    }
    else{
        enemy19.animations.play("walkBack");
    }

    //TRUMP1--------------------------------------------------------------------------------------------------------------
    //enemy18END-----------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(trump1, blocks);
    game.physics.arcade.collide(trump1, player);
    if(game.physics.arcade.collide(trump1, weapon.bullets)){
        hitTrump(trump1);

    }//this works
    //game.physics.arcade.overlap(bullet, enemy1);
    if((trump1.x<=player.x+200 && trump1.x>=player.x-200 || trump1.x>= player.x-200 && trump1.x<=player.x+200)){
        if(trump1.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            trump1.animations.play('punchForwards');
            //enemy1.frame=8;
            player.health-=15;
        }
        else if(trump1.body.velocity.x<0){
            // enemy3.body.velocity.x=0;
            trump1.animations.play('punchBack');
            //enemy1.frame=0;
            player.health-=15;
        }
    }
    if (trump1.x < player.x + 500){
        trump1.body.velocity.x=-225;
    }
    if(trump1.x <= player.x){
        trump1.body.velocity.x*=-15;

    }
    if(trump1.body.velocity.x==0){
        trump1.frame=2;
    }
    else if(trump1.body.velocity.x>0){
        trump1.animations.play("walk");
    }
    else{
        trump1.animations.play("walkBack");
    }

}
function hitTrump(enemy,bullet) {
    trump1.health-=5;
    if(trump1.health<=0){
        trump1.kill();
        trump1.x=-100;
    }
}
function render () {
    weapon.debug();
}
