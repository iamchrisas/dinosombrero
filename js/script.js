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
