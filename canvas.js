class CanvasEntity {
    constructor(x, y, color, velocity) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity
        this.isDead = false;
    }
    move() {
        this.y += this.velocity;
    }
    draw(surface) {
        surface.beginPath();
        surface.fillStyle = this.color;
        surface.fillRect(this.x, this.y, 25, 25)
        surface.stroke();
    }
}


var drawer = document.getElementById('canvas');
var surface = drawer.getContext('2d');
var game = new Controller();
var colors = ['red', 'green', 'blue', 'white', 'pink']

drawer.addEventListener('mousedown', (event) => {
    console.log(event.offsetX, event.offsetY, 'canvas click');
    collisionCheck(event, game)
});

Array.prototype.sample = function() {
    return this[Math.floor(Math.random() * this.length)];
}

surface.globalCompositeOperation = 'destination-over';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ruleMoveEntites() {
    if (game.isRunning) {
        game.entities.forEach(item => item.move())
    }
}

function ruleSpawnEntites() {
    if (game.isRunning) {
        game.entities.push(new CanvasEntity(getRandomInt(0, 615), -25, colors.sample(), getRandomInt(1, 5)))
    }
}

function ruleCollectGarbage() {
    if (game.isRunning) {
        game.entities = game.entities.filter(item => item.y < 525)
    }
}

function collisionCheck(event) {
    game.entities.forEach(function(item) {
        if (item.x <= event.offsetX &&
            item.x + 25 >= event.offsetX &&
            item.y <= event.offsetY &&
            item.y + 25 >= event.offsetY) {
            game.score += 1
            item.isDead = true;
        }
    })
    game.entities = game.entities.filter(item => !item.isDead)
}

function draw() {
    surface.clearRect(0, 0, canvas.width, canvas.height)
    game.animate(surface)
    document.getElementById('score').innerHTML = game.score;
    window.requestAnimationFrame(function() {
        draw()
    });
}

setInterval(ruleMoveEntites, 15)
setInterval(ruleSpawnEntites, 250)
setInterval(ruleCollectGarbage, 1000)
window.requestAnimationFrame(function() {
    draw()
});