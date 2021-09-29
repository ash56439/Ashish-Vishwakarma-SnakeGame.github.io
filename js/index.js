
let grid =document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document. querySelector(".scoreDisplay");
let left = document.querySelector(".left");
let bottom = document.querySelector(".bottom");
let right = document.querySelector(".right");
let up = document.querySelector(".top");
let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2 , 1 , 0];
let  direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = 0;
let interval = 0;
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

//   Now let's start with the functions :

 document.addEventListener("DOMContentLoaded", function (){
     document.addEventListener("keyup", control);
     createBoard();
     startGame();
     playAgain.addEventListener("click",replay);

    //  There is an eventListener on the document object
    //   called DomContentLoaded and this event is fired off immediately
    //   once the HTML content is loaded on our screen.
 });

//  The createBoard function 

function createBoard() {
    popup.style.display = "none";
    for (let i= 0; i<100; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
        // The appendChild() method appends 
        // a node as the last child of a node.
    }
}

  //this is a 10 by 10 grid, 
  // meaning we are going to need 100 divs. So from above,
//    we close the div popup and we loop to 100 every time
 // we create  a new div and append it to the grid (gameboard).
  
//   *****************************************************
//  the  startGame function 

function startGame(){
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares);
    // random apple 
    direction = 1;
    // direction property sets or returns the text 
    // direction (reading order) of an element's content 
    scoreDisplay.innerHTML = score;
    musicSound.play();
    intervalTime = 1000;
    //  intervalTime sets the time
    //  it takes for the snake to move around
    musicSound.play();
    currentSnake = [2, 1, 0];
    musicSound.play();
    
    

//     currentSnake defines where exactly on the
//     grid the snake will be (note that the snake is
//    basic a couple of divs given a
//     particular type of color).

    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
     
     interval = setInterval(moveOutcome, intervalTime);
    // The moveOutcome runs every 1000ms (1s) 
    // and basically
    // defines what happens when you move the snake.
}
 
// the moveOutcome function 

  function moveOutcome(){
      let squares = document.querySelectorAll(".grid div");
      if (checkForHits(squares)){
          gameOverSound.play();
          musicSound.pause();
          alert("you hit something");
          
          popup.style.display = "flex";
         return clearInterval(interval);
      } else {
          moveSnake(squares);
      }
  
    }

    // The moveSnake function 
    // The moveSnake function receives 
    // an argument called squares so that
    //  we don't have to get the .
    // grid div again in this function. 

    function moveSnake(squares) {
        let tail = currentSnake.pop();
        squares[tail].classList.remove("snake");
        currentSnake.unshift(currentSnake[0] + direction);
        eatApple(squares, tail);
        squares[currentSnake[0]].classList.add("snake");
    }


//    The checkForHits function 
    function checkForHits(squares) {
        if(
            (currentSnake[0] + width >= width * width && direction === width ) ||
            (currentSnake[0] % width === width - 1 && direction === 1 ) ||
            (currentSnake[0] % width === 0 && direction === -1) ||
            (currentSnake[0] - width <= 0 && direction === -width ) ||
          squares[currentSnake[0] + direction].classList.contains("snake")
          
        )  {
            return true;
        } else {
            return false;
        }
    }

    // function 
           
     function eatApple(squares, tail){
         if (squares[currentSnake[0]].classList.contains("apple")){
             squares[currentSnake[0]].classList.remove("apple");
             foodSound.play();
             squares[tail].classList.add("snake");
             currentSnake.push(tail);
             randomApple(squares);
             score++;
             scoreDisplay.textContent=score;
             clearInterval(interval);
             intervalTime = intervalTime * speed ;
             interval = setInterval(moveOutcome,intervalTime);
          
            // popup means suddenly watch some  
         }
     }

    //  the random apple function 

    function randomApple(squares)  {
        do {
            appleIndex = Math.floor(Math.random() * squares.length);

        } while (squares[appleIndex].classList.contains("snake"));
          squares[appleIndex].classList.add("apple");
    }


//   set up controls 
function control(e){
    if (e.keycode === 39) {
        direction = 1; // right 
    } else if (e.keycode === 38) {
        direction = -width; 
        // if we press the up arrow , the snake  will 
        // go ten divs up 
        
    } else if (e.keycode === 37) {
        direction = -1; // left 
        // the snake will go left one div 
    } else if (e.keycode === 40){
        direction = +width; 
        // Down the snake head will instantly appear 
        // 10 divs below from the current div 
    }
}

//   Now each button on the keyboard has a value 
//   called keycode(numbers) which we have access to and 
//   let us know which number was clicked .
//   Basically we will be watching for the
//   arrow keys  with their respective keycodes .
//   with that we make changes to the 
//   direction , for ex: -1,10 and so on.


// Next, this set of buttons is for mobile devices 
//    and we are basically doing the same thing :


 up.addEventListener("click", () => (direction = - width));
 bottom.addEventListener("click", () => (direction = + width));
 left.addEventListener("click", () => (direction = -1));
 right.addEventListener("click", () => (direction = 1));


//    the final thing we need to do is create the replay
//    div which will popup when the snake hits 
//    something . the button helps us reset the game .

    //   the replay function 

    function replay() {
        grid.innerHTML = "";
        createBoard();
        startGame();
        popup.style.display = "none";
    }








  

      
  

