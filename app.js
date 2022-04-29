let myLibrary = [];

//                                      Algo:
// - Display 'new book' form when add book button clicked
// - After user inputs info, get info when submit button is clicked
// - Pass info from each input as an argument in addBookToLibrary 
// - Add function to create a card for each book in the array
// - Delete card button and ability to change progress status whenever to move the card to a different column
// - Display each card on the HTML page

//                                      To-do/Features:
// - Optional inputs on the form (current page count, date finished, etc.)
// - Delete book button
// - Click book card to enlarge
// - media queries (mobile access)
// - Image of book for background of the cards (different book/color for each book added?)



//DOM elements
const submitButton = document.querySelector('#submit-btn');
const newTitle = document.querySelector('#title');
const newAuthor = document.querySelector('#author');
const newPageCount = document.querySelector('#page-count');
let newBookProgress = document.getElementsByName('progress');


//Book object
function Book(title, author, pages, bookProgress) {
    this.title = title
    this.author = author
    this.pages = pages
    this.bookProgress = bookProgress
    this.info = function() {
        if (finishedReading == true) {
            return `${title} by ${author} is ${pages} pages long. Has been read.`;
        } else {
            return `${title} by ${author}, ${pages} pages long. Has not been read.`;
        }
    }
}

//                                  Functions
//add book to library
const addBookToLibrary = (title, author, pages, bookProgress) => {
    if (!title) {alert('Please input a title for the new book!')};
    if (!author) {alert('Please input an author for the new book!')};
    if (!pages) {alert('Please input a page count for the new book!')};
    let newBook = new Book(title,author,pages,bookProgress);
    myLibrary.push(newBook);
    return myLibrary;
}

//when 'add book' button is clicked, display form
const displayForm = () => {

}

//get radio btn values for newBookProgress
const getNewBookProgress = () => {
    for (let i = 0; i < newBookProgress.length; i++) {
        if (newBookProgress[i].checked){ newBookProgress = newBookProgress[i].value}
    }
}

//                                  Event Listeners
submitButton.addEventListener('click', () => {
    getNewBookProgress();
    addBookToLibrary(newTitle.value, newAuthor.value, newPageCount.value, newBookProgress)
    
    console.log(myLibrary);
})



//Example books
addBookToLibrary('Mortification of Sin', 'John Owen', 250, false);
addBookToLibrary('Mere Christianity', 'C.S. Lewis', 150, true);