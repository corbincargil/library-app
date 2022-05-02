let myLibrary = [];
let newBook;
let addToColumn;

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
// - Dark & Light themes



//DOM elements
const screenCover = document.querySelector('#screen-cover');
const formContainer = document.querySelector('#form-container');
const pageTitle = document.querySelector('#page-title');
const libraryContainer = document.querySelector('.library-container');
const addBookBtn = document.querySelector('#add-book-btn');
const submitBtn = document.querySelector('#submit-btn');
const formCloseBtn = document.querySelector('#form-close-btn');
const newTitle = document.querySelector('#new-title');
const newAuthor = document.querySelector('#new-author');
const newPageCount = document.querySelector('#new-page-count');
const notStartedColumn = document.querySelector('#not-started-column');
const inProgressColumn = document.querySelector('#in-progress-column');
const finishedColumn = document.querySelector('#finished-column');
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
    newBook = new Book(title,author,pages,bookProgress);
    myLibrary.push(newBook);
    return myLibrary;
}

//when 'add book' button is clicked, display form
const toggleForm = () => {
    formContainer.classList.toggle('hidden');
    formContainer.classList.toggle('showing');
    screenCover.classList.toggle('hidden');
    screenCover.classList.toggle('showing');
    libraryContainer.classList.toggle('blur');
    pageTitle.classList.toggle('blur');
    addBookBtn.classList.toggle('blur');
}

//get radio btn values for newBookProgress
const getNewBookProgress = () => {
    newBookProgress = document.getElementsByName('progress');
    for (let i = 0; i < newBookProgress.length; i++) {
        if (newBookProgress[i].checked){ newBookProgress = newBookProgress[i].value}
    }
}

//create a book card and add it to the page
const createCard = () => {
    const newCardDiv = document.createElement('div');
    let newCardTitle = document.createElement('p');
    let newCardAuthor = document.createElement('p');
    let newCardPageNumber = document.createElement('p');
    newCardDiv.classList.add('book-container');
    newCardTitle.classList.add('book-title');
    newCardAuthor.classList.add('book-page-number');
    newCardTitle.textContent = newBook.title;
    newCardAuthor.textContent = newBook.author;
    newCardPageNumber.textContent = newBook.pages;
    newCardDiv.appendChild(newCardTitle);
    newCardDiv.appendChild(newCardAuthor);
    newCardDiv.appendChild(newCardPageNumber);
    if (newBook.bookProgress == 3) {addToColumn = finishedColumn}
    else if (newBook.bookProgress == 2) {addToColumn = inProgressColumn}
    else {addToColumn = notStartedColumn}
    addToColumn.appendChild(newCardDiv); 
}

//                                  Event Listeners
submitBtn.addEventListener('click', () => {
    getNewBookProgress();
    addBookToLibrary(newTitle.value, newAuthor.value, newPageCount.value, newBookProgress)
    console.log(myLibrary);
    createCard();
    toggleForm();
})

addBookBtn.addEventListener('click',() => {
    toggleForm();
})

formCloseBtn.addEventListener('click', () => {
    toggleForm();
})



//Example books
addBookToLibrary('Mortification of Sin', 'John Owen', 250, false);
addBookToLibrary('Mere Christianity', 'C.S. Lewis', 150, true);