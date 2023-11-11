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

  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  }

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

   // Add the handleKeydown function as an event listener for the keydown event
   window.addEventListener("keydown", handleKeydown);
};

// game mechanic starts here

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
            './images/dinosaur-character.png'
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

    gameLoop(){
        // Right now, always this.gameIsOver === false
        if(this.gameIsOver === true){
            return;
        }
        console.log('gameLoop exec')
        this.update();// update the game
        // this.gameLoop()
        window.requestAnimationFrame(()=>  this.gameLoop()); // used to improve/better manage the rate of frames for the game animation
    }

    update(){
        // Return the new position of the car to update the game
        this.player.move();
        // Return the new positions of the obstacles to update the game
       for(let i= 0; i < this.obstacles.length; i++){
        const obstacle = this.obstacles[i];
        obstacle.move();

        // If the player's car collides with an obstacle
            if (this.player.didCollide(obstacle)) {
                // Remove the obstacle element from the DOM
                obstacle.element.remove();
                // Remove obstacle object from the array
                this.obstacles.splice(i, 1);
                // Reduce player's lives by 1
                this.lives--;
                document.getElementById('lives').textContent = this.lives;
                // Update the counter variable to account for the removed obstacle
                i--;
            } 
            else if (obstacle.top > this.height) {
                // Increase the score by 1
                this.score++;
                document.getElementById('score').textContent = this.score;
                // Remove the obstacle from the DOM
                obstacle.element.remove();
                // Remove obstacle object from the array
                this.obstacles.splice(i, 1);
                // Update the counter variable to account for the removed obstacle
                i--;
            }
        }
      // End the game
        if (this.lives === 0) {
            this.endGame();
        }
    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
        if (Math.random() > 0.98 && this.obstacles.length < 1) {
                this.obstacles.push(new Obstacle(this.gameScreen));
        }
       
    }

    // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove(); // remove the player car from the screen
    this.obstacles.forEach(obstacle => obstacle.element.remove()); // remove the obstacles from the screen

    this.gameIsOver = true; // cancel the execution of gameLoop()

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
}


// player mechanic starts here

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

// obstacle mechanic starts here

class Obstacle {
    constructor(gameScreen){
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 300 + 70);
        this.top = 0;
        this.width = 100;
        this.height = 150;
        this.element = document.createElement('img');

        this.element.src = './images/redCar.png';
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;

        this.gameScreen.appendChild(this.element);

    }

    updatePosition() {
        // Update the obstacle's position based on the properties left and top
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        console.log('obstacle position', this.element.getBoundingClientRect())
      }

    move() {
        // Move the obstacle down by 3px
        this.top += 3;
        // Update the obstacle's position on the screen
        this.updatePosition();
      }
}
