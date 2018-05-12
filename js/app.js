/*****Memory Game***/
const deck = document.querySelector(".deck");
let cards = document.querySelectorAll(".card");
let cardsArr =[...cards];
const listOpen = [];
let moves=0;
let nMoves=document.querySelector(".moves");
let matchedCards= document.getElementsByClassName("match");
const third_star=document.querySelector(".third_star");
const scnd_star=document.querySelector(".scnd_star");
const fst_star=document.querySelector(".fst_star");
let timer = document.querySelector(".timer");
let secs = 0, mins = 0, hrs = 0;
let interval;
let finalTime;
let f_time= document.querySelector(".f_time");
let playAgain_btn=document.querySelector("#playAgain");

/* Suffle Function*/
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*timer */

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = mins+":"+secs;
        secs++;
        if(secs == 60){
            mins++;
            secs=0;
        }
        if(mins == 60){
            hrs++;
            mins = 0;
        }
    },1000);
}
deck.addEventListener('click',startTimer);

/***reset timer***/////

function resetTimer(){
  secs = 0, mins = 0, hrs = 0;
  timer.innerHTML = "0:0";
  clearInterval(interval);
}

/* Function that starts on loading the Game*/
function startGame(){
    listOpen.length=0;
    cardsArr = shuffle(cardsArr);
    for (let i = 0; i < cardsArr.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cardsArr, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
        moves=0;
        nMoves.innerHTML=0;
        third_star.style.display="inline-block";
        scnd_star.style.display="inline-block";
        fst_star.style.display="inline-block";

    }
  }
  /////////////////////////////////////////////////////

document.querySelector(".restart").addEventListener('click',startGame);
document.querySelector(".restart").addEventListener('click',resetTimer);
document.body.onload = startGame();

/*moves increment function*/
function movesInc(){
  moves++;
  nMoves.innerHTML=moves;
  stars();
}

/*stars function*/
function stars(){
  if(moves>=25){
    third_star.style.display="none";
  }
  if(moves>=35){
    scnd_star.style.display="none";
  }

}
// event listeners for clicking on cards
for(let i =0 ; i<cards.length ; i++)
{
  cardsArr[i].addEventListener('click',flip);
  cardsArr[i].addEventListener('click',insertOpen);
  cardsArr[i].addEventListener('click',movesInc);
  cardsArr[i].addEventListener('click',congratulations);
}

//flip function
function flip(evt){
  evt.target.classList.add("show","open","disabled");
}

//insertOpen function that inserts a clicked card to an array of length 2

function insertOpen(evt){
  listOpen.push(evt.target);
  const lengthOfList=listOpen.length;
  if(lengthOfList===2){
    if(listOpen[0].type===listOpen[1].type){
      matching();
      listOpen.length = 0;
    }
    else{
      unmatching();

    }
  }
}

//Matching function
function matching()
{
  listOpen[0].classList.add("match");
  listOpen[1].classList.add("match");
}

/*hideCard function that flips the cards closed again after being unmatched*/

function hideCard(){
    listOpen[0].classList.remove("show","open","unmatched","disabled");
    listOpen[1].classList.remove("show","open","unmatched","disabled");
    for(let i =0 ; i<cards.length ; i++)
    {
      cardsArr[i].classList.remove("disabled");
    }
    listOpen.length = 0;
}
/////////////////////////////////////

/*Unmatching Function*/
function unmatching(){
    listOpen[0].classList.add("unmatched");
    listOpen[1].classList.add("unmatched");
    for(let i =0 ; i<cards.length ; i++)
    {
      cardsArr[i].classList.add("disabled");
    }

    setTimeout(hideCard,500);
}
//////////////////////////////////
/******** when all cards match*********/
function congratulations(){
  if(matchedCards.length==16){
    clearInterval(interval);
    displayModal();
    f_stars();
    fin_time();
  }

}



/******modal********/
let modal = document.getElementById('Congrats');
playAgain_btn.addEventListener('click',playAgain_btn_fn)

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// displayModal function
function displayModal() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/****final stars****/
let f_third_star=document.querySelector(".f_third_star");
let f_scnd_star=document.querySelector(".f_scnd_star");
let f_fst_star=document.querySelector(".f_fst_star");
function f_stars(){
  if(moves>=25){
    f_third_star.style.display="none";
  }
  if(moves>=35){
    f_scnd_star.style.display="none";
  }
}
function fin_time(){
  finalTime = timer.innerHTML;
  f_time.innerHTML=finalTime;
}
/****function for play again button****/
 function playAgain_btn_fn(){
   modal.style.display="none";
   startGame();
   resetTimer();
 }
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
