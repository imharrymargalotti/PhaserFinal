
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
    enemy.kill();
    // bullet.kill();
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



    weapon = game.add.weapon(100,'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    weapon.bulletSpeed = 1000;
    weapon.trackSprite(player, 80,125);
    weapon.fireRate = 100;

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

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 1000;

    player.animations.add('walk', [5,6,7], 10, true);
    player.animations.add('walkBack',[1,2,3],10, true);

    cursors = game.input.keyboard.createCursorKeys();
    shoot = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    game.camera.follow(player);

    obsticle1();

}function update () {
    this.myHealthBar.setPercent(player.health);
    this.trumpBar.setPercent(trump1.health);
    this.trumpBar.setPosition(trump1.x,200);
    game.physics.arcade.collide(player, blocks);
    game.physics.arcade.collide(bullet, blocks);


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
        } else if (player.frame == 5 || player.frame == 6 || player.frame == 7) {
            weapon.fireAngle = Phaser.ANGLE_RIGHT;
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

    //TRUMP1--------------------------------------------------------------------------------------------------------------
    game.physics.arcade.collide(trump1, blocks);
    game.physics.arcade.collide(trump1, player);
    game.physics.arcade.collide(trump1, weapon.bullet);

    if((trump1.x<=player.x+50 && trump1.x>=player.x-50 || trump1.x>= player.x-50 && trump1.x<=player.x+50)&&player.y<145){
        if(trump1.body.velocity.x>0){
            //enemy1.body.velocity.x=0;
            trump1.animations.play('punchForwards');
            player.health-=25;
        }
        else if(trump1.body.velocity.x<0){
            // enemy1.body.velocity.x=0;
            trump1.animations.play('punchBack');
            player.health-=25;
        }
    }
    if (trump1.x < player.x + 500){
        trump1.body.velocity.x=-225;
    }
    if(trump1.x <= player.x){
        trump1.body.velocity.x*=-1;

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
}function render () {
    weapon.debug();
}
