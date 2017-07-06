// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y) {
	// 要应用到每个敌人的实例的变量写在这里
	//虫子的位置
	this.x = x;
	this.y = y;
	//虫子的速度
	this.speed = Math.random() * 300+100;
	// 我们已经提供了一个来帮助你实现更多

	// 敌人的图片或者雪碧图，用一个我们提供 的工具函数来轻松的加载文件
	this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
	// 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
	// 都是以同样的速度运行的
	this.x += this.speed * dt;

	//这样就可以使得虫子源源不断的出现
	if(this.x > ctx.canvas.width) {
		this.x = -50;
	}
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
var Player = function() {
	this.x = 200;
	this.y = 321;
	this.sprite = 'images/char-boy.png';
};
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
Player.prototype.update = function(dt) {
	//当玩家到达河边则赢
	if(this.y<0) {
		this.x = 200;
		this.y = 321;
		alert("you win!");
	}

player.checkCollisions();
};
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(movement) {
	//使得玩家经过移动不要超过画布
	switch(movement) {
		case "left":
			if(this.x > 0) {
				this.x -= 101;
			}
			break;
		case "up":
			if(this.y >0) {
				this.y -= 83;
			}
			break;
		case "right":
			if(this.x <303) {
				this.x += 101;
			}
			break;
		case "down":
			if(this.y < 332)
				this.y += 83;
			break;
	}
};
//碰撞函数
//首先判断玩家和虫子的在不在同一列，再判断是否在同一行，若是则发生碰撞并复位
Player.prototype.checkCollisions = function() {
	for(var i = 0; i < allEnemies.length; i++) {
		//console.log(this.x,allEnemies[i].x);
		if(this.y === allEnemies[i].y) {
			if(Math.abs(this.x - allEnemies[i].x) < 72) {
				this.x = 200;
				this.y = 321;
			}
		}
	}
	
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];
//设置了三个敌人，分别放在三行中
for(i = 0; i < 3; i++) {
	var enemy = new Enemy(-50, 83 * (i % 3) + 72);
	allEnemies.push(enemy);
}

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});