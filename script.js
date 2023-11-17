//window
window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const replayButton = document.getElementById("replay-button");
  let game;

  function startGame() {
    // create an instance of the Game class
    game = new Game();
    // execute the start method
    game.start();
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
          game.player.directionX = -6;
          break;
        case "ArrowUp":
          game.player.directionY = -6;
          break;
        case "ArrowRight":
          game.player.directionX = 6;
          break;
        case "ArrowDown":
          game.player.directionY = 6;
          break;
      }
    }
  }

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function () {
    restartGame();
  });

  replayButton.addEventListener("click", function () {
    restartGame();
  });

  // Add the handleKeydown function as an event listener for the keydown event
  window.addEventListener("keydown", handleKeydown);
};

// game mechanic

class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.gameVictoryScreen = document.getElementById("game-victory");
    //  new Player()
    this.player = new Player(
      this.gameScreen,
      0,
      0,
      100,
      100,
      "./images/dino-character-blue.png"
    );
    this.width = 1500;
    this.height = 780;
    // new Obstacle()
    this.obstacles = [];
    this.obstaclesTwo = [];
    this.hats = [];
    this.tacos = [];
    this.lives = 3;
    this.score = 0;

    this.gameIsOver = false;
  }

  // Dino starts at a specific position
  // Obstacles, hats and tacos are going to be at a specific position as well
  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameLoop();
  }

  gameLoop() {
    // Right now, this.gameIsOver === false
    if (this.gameIsOver === true) {
      return;
    }
    // update the game
    this.update();

    // used to improve/better manage the rate of frames for the game animation
    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    // Return the new position of the dino to update the game
    this.player.move();

    // Return the new positions of the obstacles to update the game
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      if (obstacle) {
        obstacle.move();

        // If the dino collides with an obstacle
        if (this.player.didCollide(obstacle)) {
          document.getElementById("collide-sound").play();
          // Remove the obstacle element from the DOM
          obstacle.element.remove();

          // Remove obstacle object from the array
          this.obstacles.splice(i, 1);

          // Reduce player's lives by 1
          this.lives--;
          document.getElementById("lives").textContent = this.lives;

          // Update the counter variable to account for the removed obstacle
          i--;
        } else if (obstacle.top > this.height) {
          // Increase the score by 1
          this.score++;
          document.getElementById("score").textContent = this.score;

          // Remove the obstacle from the DOM
          obstacle.element.remove();

          // Remove obstacle object from the array
          this.obstacles.splice(i, 1);

          // Update the counter variable to account for the removed obstacle
          i--;
        }
      }
    }

    // Return the new positions of the obstacles to update the game
    for (let j = 0; j < this.obstaclesTwo.length; j++) {
      const obstacleTwo = this.obstaclesTwo[j];
      if (obstacleTwo) {
        obstacleTwo.move();

        // If the dino collides with an obstacle
        if (this.player.didCollide(obstacleTwo)) {
          //Add sound for the obstacle collision
          document.getElementById("collide-sound").play();

          // Remove the obstacle element from the DOM
          obstacleTwo.element.remove();

          // Remove obstacle object from the array
          this.obstaclesTwo.splice(j, 1);

          // Reduce player's lives by 1
          this.lives--;
          document.getElementById("lives").textContent = this.lives;

          // Update the counter variable to account for the removed obstacle
          j--;
        } else if (obstacleTwo.bottom > this.height) {
          // Increase the score by 1
          this.score++;
          document.getElementById("score").textContent = this.score;

          // Remove the obstacle from the DOM
          obstacleTwo.element.remove();

          // Remove obstacle object from the array
          this.obstaclesTwo.splice(j, 1);

          // Update the counter variable to account for the removed obstacle
          j--;
        }
      }
    }

    // Return the new positions of the tacos to update the game
    for (let k = 0; k < this.tacos.length; k++) {
      const taco = this.tacos[k];
      if (taco) {
        taco.move();

        // If the dino collides with a taco
        if (this.player.didCollide(taco)) {
          // Remove the taco element from the DOM
          taco.element.remove();

          // Remove taco object from the array
          this.tacos.splice(k, 1);

          // Increase player's lives by 1
          this.lives++;
          document.getElementById("lives").textContent = this.lives;

          // Increase the taco by 1
          this.tacos.length++;
          document.getElementById("tacos").textContent = this.tacos.length;

          // Increase the score by 10
          this.score += 10;
          document.getElementById("score").textContent = this.score;

          // Update the counter variable to account for the removed taco
          k--;
        } else if (taco.right > this.width) {
          // Remove the taco from the DOM
          taco.element.remove();

          // Remove taco object from the array
          this.tacos.splice(k, 1);

          // Update the counter variable to account for the removed taco
          k--;
        }
      }
    }

    // Return the new positions of the hats to update the game
    for (let l = 0; l < this.hats.length; l++) {
      const hat = this.hats[l];
      if (hat) {
        hat.move();

        // If the dino collides with a hat
        if (this.player.didCollide(hat)) {
          // Remove hat object from the array
          this.hats.splice(l, 1);

          // Remove the hat element from the DOM
          hat.element.remove();

          // Increase the hats by 1
          this.hats.length++;
          document.getElementById("hats").textContent = this.hats.length;

          // Increase the score by 5
          this.score += 5;
          document.getElementById("score").textContent = this.score;

          // Update the counter variable to account for the removed hat
          l--;
        } else if (hat.top > this.height) {
          // Remove hat object from the array
          this.hats.splice(l, 1);

          // Remove the hat from the DOM
          hat.element.remove();

          // Update the counter variable to account for the removed hat
          l--;
        }
      }

      // this if statement updates the background
      // Get the game screen element

      const gameScreen = document.getElementById("game-screen");
      const numbersOfHats = document.getElementById("hats");

      if (numbersOfHats.textContent == 10) {
        //Add sound
        document.getElementById("dino-roar").play();

        //Change background
        gameScreen.style.backgroundImage = 'url("images/Bg-castle.jpeg")';
      } else if (numbersOfHats.textContent == 19) {
        //Add sound
        document.getElementById("dino-roar").play();

        //Change background
        gameScreen.style.backgroundImage = 'url("images/Bg-city.jpeg")';
      } else if (numbersOfHats.textContent == 29) {
        //Add sound
        document.getElementById("dino-roar").play();

        //Change background
        gameScreen.style.backgroundImage = 'url("images/Bg-sand.jpeg")';
      } else if (numbersOfHats.textContent == 39) {
        //Add sound
        document.getElementById("dino-roar").play();

        //Change background
        gameScreen.style.backgroundImage = 'url("images/Bg-woods.jpeg")';
      } else {
        gameScreen.style.backgroundImage = 'url("images/Bg-clouds.jpeg")';
      }
    }

    // this.updatePlayerValue();

    // Create a new obstacle based on a random probability
    // when there is less than 1 obstacle on the screen
    if (Math.random() > 0.9 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

    // Create a new obstacleTwo based on a random probability
    // when there is less than 1 obstacle screen
    if (Math.random() > 0.997 && this.obstaclesTwo.length < 1) {
      this.obstaclesTwo.push(new ObstacleTwo(this.gameScreen));
    }

    // Create a new taco based on a random probability
    // when there is no other tacos on the screen
    // Math.random() > 0.995 means that a new taco will be created
    // only when the random number generated is greater than 0.995
    // giving you a 0.5% probability
    if (Math.random() > 0.995) {
      this.tacos.push(new Taco(this.gameScreen));
    }

    // Create a new hat based on a random probability
    // when there are no other hats on the screen
    // Math.random() > 0.99 means that a new hat will be created
    // only when the random number generated is greater than 0.997
    // giving you a 1% probability
    if (Math.random() > 0.99) {
      this.hats.push(new Hat(this.gameScreen));
    }

    // End the game
    if (this.lives === 0) {
      this.endGame();
    }

    // The player won
    if (this.hats.length > 50 && this.lives > 0) {
      this.gameVictory();
    }
  }

  // Create a new method responsible for ending the game
  endGame() {
    // remove the dino from the screen
    this.player.element.remove();

    // remove the obstacles from the screen
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    // remove the obstaclesTwo from the screen
    this.obstaclesTwo.forEach((obstacleTwo) => obstacleTwo.element.remove());

    // remove the tacos from the screen
    this.tacos.forEach((taco) => taco.element.remove());

    // Remove the hats from the screen
    this.hats.forEach((hat) => hat.element.remove());

    //Show the final score
    document.getElementById("end-score").textContent = this.score;

    // cancel the execution of gameLoop()
    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";

    // Show end game screen
    this.gameEndScreen.style.display = "block";

    //Add sounds
    document.getElementById("sound-of-defeat").play();
  }

  // Create a new method for when the player won
  gameVictory() {
    // remove the dino from the screen
    this.player.element.remove();

    // remove the obstacles from the screen
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    // remove the obstaclesTwo from the screen
    this.obstaclesTwo.forEach((obstacleTwo) => obstacleTwo.element.remove());

    // remove the tacos from the screen
    this.tacos.forEach((taco) => taco.element.remove());

    // Remove the hats from the screen
    this.hats.forEach((hat) => hat.element.remove());

    //Show the final score
    document.getElementById("victory-score").textContent = this.score;

    // cancel the execution of gameLoop()
    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";

    // Show game victory screen
    this.gameVictoryScreen.style.display = "block";

    //Add sounds
    document.getElementById("sound-of-victory").play();
  }
}

// player mechanic

class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");

    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    // Update dino position based on directionX and directionY
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

    // Update dino position on the screen
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
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

  didCollide(obstacleTwo) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleTwoRect = obstacleTwo.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleTwoRect.right &&
      playerRect.right > obstacleTwoRect.left &&
      playerRect.top < obstacleTwoRect.bottom &&
      playerRect.bottom > obstacleTwoRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

  didCollide(taco) {
    const playerRect = this.element.getBoundingClientRect();
    const tacoRect = taco.element.getBoundingClientRect();

    if (
      playerRect.left < tacoRect.right &&
      playerRect.right > tacoRect.left &&
      playerRect.top < tacoRect.bottom &&
      playerRect.bottom > tacoRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

  didCollide(hat) {
    const playerRect = this.element.getBoundingClientRect();
    const hatRect = hat.element.getBoundingClientRect();

    if (
      playerRect.left < hatRect.right &&
      playerRect.right > hatRect.left &&
      playerRect.top < hatRect.bottom &&
      playerRect.bottom > hatRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}

// obstacle coming from the top mechanic

class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    // Summon the obstacle on the x axis
    this.right = Math.floor(Math.random() * 920 + 30);

    // Summon the obstacle on the y axis
    this.top = 0;

    this.width = 100;
    this.height = 100;
    this.element = document.createElement("img");

    this.element.src = "images/meteorite.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.right = `${this.right}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    // Update the obstacle's position based on the properties right and top
    this.element.style.right = `${this.right}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    // Move the obstacle left by 6px => the obstacles go from right to left faster
    this.right += 3;
    // Move the obstacle down by 6px => the obstacles go from top to bottom faster
    this.top += 6;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}

// obstacle coming from the bottom mechanic
class ObstacleTwo {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    // Summon the obstacle on the x axis
    this.right = Math.floor(Math.random() * 920 + 30);

    // Summon the obstacle on the y axis
    this.bottom = 0;

    this.width = 100;
    this.height = 100;
    this.element = document.createElement("img");

    this.element.src = "images/meteoriteTwo copy.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.bottom = `${this.bottom}px`;
    this.element.style.right = `${this.right}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    // Update the obstacle's position based on the properties right and top
    this.element.style.right = `${this.right}px`;
    this.element.style.bottom = `${this.bottom}px`;
  }

  move() {
    // Move the obstacle left by 3px => the obstacles go from right to left faster
    this.right += 3;
    // Move the obstacle down by 6px => the obstacles go from top to bottom faster
    this.bottom += 6;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}

// Taco mechanic

class Taco {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    // Summon the taco on the x axis
    this.right = 0;

    // Summon the taco on the y axis
    this.top = Math.floor(Math.random() * 650 + 30);

    this.width = 118;
    this.height = 104;
    this.element = document.createElement("img");

    this.element.src = "images/Taco.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.right = `${this.right}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    // Update the tacos position based on the properties left and top
    this.element.style.right = `${this.right}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    // Move the taco left by 6px => the tacos go from right to left faster
    this.right += 10;
    // Move the taco down by 0px => the tacos go from top to bottom faster
    this.top += 0;
    // Update the taco's position on the screen
    this.updatePosition();
  }
}

//Hat mechanic

class Hat {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    // Summon the hat on the x axis
    this.right = Math.floor(Math.random() * 900 + 10);
    // Summon the hat on the y axis
    this.top = Math.floor(Math.random() * 500 + 10);
    this.width = 118;
    this.height = 104;
    this.element = document.createElement("img");
    this.element.src = "images/Sombrero.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.right = `${this.right}px`;
    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    // Update the hats position based on the properties right and top
    this.element.style.right = `${this.right}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    // Move the hat left by 0px => the hats go from right to left faster
    this.right += 1;
    // Move the hat down by 1px => the hats go from top to bottom faster
    this.top += 1;
    // Update the hats position on the screen
    this.updatePosition();
  }
}
