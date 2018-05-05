/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/*function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}*/

const cards = document.querySelectorAll(".card");
const cards_arr =[...cards];
for(var i =0 ; i<cards.length ; i++)
{
  cards_arr[i].addEventListener('click',flip);
  cards_arr[i].addEventListener('click',insertOpen);
}

//flip function
function flip(evt){
  evt.target.classList.add("show","open");
}
//insertOpen function
const listOpen = [];
function insertOpen(evt){
  listOpen.push(evt.target);
  const lengthOfList=listOpen.length;
  if(lengthOfList===2){
    if(listOpen[0].title===listOpen[1].title){
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

function hideCard(){
    listOpen[0].classList.remove("show","open","unmatched");
    listOpen[1].classList.remove("show","open","unmatched");
    listOpen.length = 0;
}

function unmatching(){
    listOpen[0].classList.add("unmatched");
    listOpen[1].classList.add("unmatched");

    setTimeout(hideCard,500);
}

// If Matching

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
