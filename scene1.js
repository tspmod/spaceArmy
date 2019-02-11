// var myText;
// var enemy;
// var space;
// var player;
// var group;
// var bullet;
// var lives = 3;
// var score = 0;
// var scoreText;
// var livesText;
// var gameoverText;
// var restartGame;
// var gameOver = false;

class scene1 extends Phaser.Scene {
	constructor() {
		super ({key:"scene1"});
	}

	preload() {
		//background//
		this.load.image('background', 'assets/spc.png');
		//player
		this.load.image('player', 'assets/player1.png');
		// laser bullet
		this.load.image('bullet', 'assets/bullet22.png');
		//enemy
		this.load.image('enemy', 'assets/enemy.png');
		// bomb
		// this.load.image('bomb','assets/bomb.png')
	}

	create() {
		//background//
		this.space = this.add.tileSprite(400,300,800,600,'background');

		//player//
		this.player = this.physics.add.sprite(400,500,'player').setScale(0.1);
		this.player.setImmovable();

		//boundary//
		this.player.setCollideWorldBounds(true);

		//player movement//
	 this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);//right movement
	 this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);// Left movement
	 this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);// down button
	 this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);// up button

	 bullet = this.physics.add.group();

	 // Shooting button
	 this.input.keyboard.on('keyup_P', function(event) {
		 var physicsImage = bullet.create(this.player.x, this.player.y, "bullet");
		 physicsImage.setVelocity(0,-1000);
		},this);

		//enemies
		group = this.physics.add.group({
        key: 'enemy',
		frameQuantity: 210,
        gridAlign: {
            x: 65,
            y: -1500,
            width: 10,
            height: 25,
            cellWidth: 70,
						cellHeight: 70
		},
		collideWorldBounds: false
    });



		Phaser.Actions.Call(group.getChildren(), function(go) {
            go.setVelocityY(Phaser.Math.Between(75,25))
          });



//collion of player and enemies
this.physics.add.collider(this.player, group, PlayerEnemyCollision,null,this);

	//collison between bullets and enemies
	this.physics.add.overlap(bullet, group, BulletsEnemyCollision,null,this);


					//displays score
           scoreText = this.add.text(25,50,'SCORE: ' + score,{
            fontSize: '16px',
            fill: '#FFF'
          });

          //Displays lives
          livesText = this.add.text(25, 25, 'LIVES: ' + lives,{
              fontSize: '16px',
              fill: '#fff'
          });

          gameoverText = this.add.text(250,200,'',{
            fontSize: '40px',
            fill: '#fff'
          });

					restartGame = this.add.text(300,250,'',{
            fontSize: '15px',
            fill: '#fff'
          }).setInteractive().on('pointerdown', startGameplay);




	}


	update() {



		if(gameOver){
			return;
		}

		this.space.tilePositionY-= 5;

		if (score >= 2000){
			restartLevel();
			// gameoverText.setText('Mission Complete!!!');
			// restartGame.setText('Refresh to start over');
			score = 0;
			var mission = gameoverText.setText('Mission Complete!!!').setInteractive();
			mission.on('pointerdown',function(event){
					next();
					console.log('clicked')
			},this);

		}



		//player movement
		if (this.key_A.isDown)
			this.player.x-=5;
		else if (this.key_D.isDown)
			this.player.x+=5;
		else if (this.key_S.isDown)
			this.player.y+=5;
		else if (this.key_W.isDown)
			this.player.y-=5;
	}

}


// collision between player and enemies
function PlayerEnemyCollision(player, group){
    group.disableBody(true, true);

		lives -=1;
livesText.setText('LIVE: ' + lives)
 if(lives == 0){
    restartLevel();
    gameoverText.setText('GAME OVER!!!').setInteractive().on('pointerdown', startGameplay);
		restartGame.setText('Refresh to start over').setInteractive().on('pointerdown', startGameplay);


 }
}

function restartLevel(player) {
    console.log("in restartLevel");
    gameOver = true;


    gameOver = false;
    lives = 3;
    livesText.setText('LIVE: ' + lives);
		game.scene.pause('scene1');

}

//collision between bullets and the enemy
function BulletsEnemyCollision(bullet, group){
    score +=10;
    console.log("score: "+ score)
    scoreText.setText('Score: ' + score)
    group.disableBody(true, true);
    bullet.disableBody(true, true);

}

function startGameplay() {
    game.scene.stop('scene1');
    game.scene.start('scene1');
}

// function next() {
//     game.scene.stop('scene1');
//     game.scene.start('scene2');
// }
