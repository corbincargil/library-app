let myLibrary = [];

//                                      To-do:
// - Display 'new book' form when add book button clicked
// - After user inputs info, get info when submit button is clicked
// - Pass info from each input as an argument in addBookToLibrary 
// - Add function to create a card for each book in the array
// - Display each card on the HTML page


//DOM elements
const submitButton = document.querySelector('#submit-btn');
const newTitle = document.querySelector('#title');
const newAuthor = document.querySelector('#author');
const newPageCount = document.querySelector('#page-count');
const hasRead = document.querySelector('#finished-reading');


//Book object
function Book(title, author, pages, finishedReading) {
    this.title = title
    this.author = author
    this.pages = pages
    this.finishedReading = finishedReading
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
const addBookToLibrary = (title, author, pages, finishedReading) => {
    if (!title) {alert('Please input a title for the new book!')};
    if (!author) {alert('Please input an author for the new book!')};
    if (!pages) {alert('Please input a page count for the new book!')};
    let newBook = new Book(title,author,pages,finishedReading);
    myLibrary.push(newBook);
    return myLibrary;
}

//when 'add book' button is clicked, display form
const displayForm = () => {

}

//Event Listeners
submitButton.addEventListener('click', () => {
    addBookToLibrary(newTitle.value, newAuthor.value, newPageCount.value, hasRead.value)
    
    console.log(myLibrary);
})



//Example books
addBookToLibrary('Mortification of Sin', 'John Owen', 250, false);
addBookToLibrary('Mere Christianity', 'C.S. Lewis', 150, true);