//window 
window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    let game;
  
  
    function startGame() {
      console.log("start game");
      game = new Game(); // create an instance of the Game class
      game.start(); // execute the start method
    }
  
    function restartGame() {
      location.reload();
    }

startButton.addEventListener("click", function () {
    startGame();
  });

}

class Game {
    // code to be added
    constructor(){
        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end');
        this.player = new Player(
            this.gameScreen,
            10,
            550,
            100,
            100,
            './images/car.png'
        ); //  new Player()
        this.width = 600;
        this.height = 600;
        this.obstacles = []; // new Obstacle()
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
    }

    start(){
        
        this.gameScreen.style.width = `${this.width}px`;
        this.gameScreen.style.height = `${this.height}px`;
        this.startScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.gameLoop();
        // Car start at a specific position
        // Obstacles are going to be at a specific position as well
    }
}

class Player {
    // to be defined later on
    constructor(gameScreen, left, top, width, height, imgSrc){
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement('img');

        this.element.src = imgSrc;
        this.element.style.position = 'absolute';
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.top = `${top}px`;
        this.element.style.left = `${left}px`;
        
        this.gameScreen.appendChild(this.element);
    }

    move(){
        // Update player's car position based on directionX and directionY
    this.left += this.directionX;
    this.top += this.directionY;

    if (this.left < 10) {
        this.left = 10;
      }
  
      // handles top side
      if (this.top < 10) {
        this.top = 10;
      }
  
      // handles right hand side
      if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
        this.left = this.gameScreen.offsetWidth - this.width - 10;
      }
  
      // handles bottom side
      if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
        this.top = this.gameScreen.offsetHeight - this.height - 10;
      }

    // Update the player's car position on the screen
    this.updatePosition();
    }

    updatePosition(){
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        console.log('player position', this.element.getBoundingClientRect())
    }

    didCollide(obstacle) {
      const playerRect = this.element.getBoundingClientRect();
      const obstacleRect = obstacle.element.getBoundingClientRect();
  
      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
      ) {
        return true;
      } else {
        return false;
      }
    }
}
