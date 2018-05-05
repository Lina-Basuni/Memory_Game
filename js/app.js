/*****Memory Game***/
const deck = document.querySelector(".deck");
let cards = document.querySelectorAll(".card");
let cards_arr =[...cards];
/* Suffle Function*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Function that starts on loading the Game*/
function startGame(){
    cards_arr = shuffle(cards_arr);
    for (let i = 0; i < cards_arr.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards_arr, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
  }
  /////////////////////////////////////////////////////

document.querySelector(".restart").addEventListener('click',startGame);
document.body.onload = startGame();

// event listeners for clicking on cards
for(var i =0 ; i<cards.length ; i++)
{
  cards_arr[i].addEventListener('click',flip);
  cards_arr[i].addEventListener('click',insertOpen);
}

//flip function
function flip(evt){
  evt.target.classList.add("show","open","disabled");
}

//insertOpen function that inserts a clicked card to an array of length 2
const listOpen = [];
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
    listOpen.length = 0;
}
/////////////////////////////////////

/*Unmatching Function*/
function unmatching(){
    listOpen[0].classList.add("unmatched");
    listOpen[1].classList.add("unmatched");
    setTimeout(hideCard,500);
}
//////////////////////////////////

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
