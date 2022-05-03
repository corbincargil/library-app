let myLibrary = [];
let newBook;
let addToColumn;
let bookNumberToUpdate;

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
const progressForm = document.querySelector('#update-progress-form-contaner');
const progressFormCloseBtn = document.querySelector('#progress-form-close-btn');
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
const updateProgressSubmitBtn = document.querySelector('#update-progress-submit-btn');


//Book object
function Book(title, author, pages, bookProgress) {
    this.title = title
    this.author = author
    this.pages = pages
    this.bookProgress = bookProgress
    this.bookNumber = myLibrary.length;
    this.info = function() {
        if (finishedReading == true) {
            return `${title} by ${author} is ${pages} pages long. Has been read.`;
        } else {
            return `${title} by ${author}, ${pages} pages long. Has not been read.`;
        }
    }
}

//                                  Functions
//display the form and blur the background by toggling on/off different classes
const toggleForm = () => {
    formContainer.classList.toggle('hidden');
    formContainer.classList.toggle('showing');
    screenCover.classList.toggle('hidden');
    screenCover.classList.toggle('showing');
    libraryContainer.classList.toggle('blur');
    pageTitle.classList.toggle('blur');
    addBookBtn.classList.toggle('blur');
}
//add book to library
const addBookToLibrary = (title, author, pages, bookProgress) => {
    if (!title) {alert('Please input a title for the new book!'); return;};
    if (!author) {alert('Please input an author for the new book!'); return;};
    if (!pages) {alert('Please input a page count for the new book!'); return;};
    newBook = new Book(title,author,pages,bookProgress);
    myLibrary.push(newBook);
}
//get radio btn values for newBookProgress
const getNewBookProgress = () => {
    newBookProgress = document.getElementsByName('progress');
    for (let i = 0; i < newBookProgress.length; i++) {
        if (newBookProgress[i].checked){ newBookProgress = newBookProgress[i].value}
    }
}
//remove all books from display
const removeAllCards = () => {
    let currentBooksDisplayed = document.querySelectorAll('.book-container');
    currentBooksDisplayed.forEach(book => {
        book.remove();
    });
}
//remove book from library
const removeBookFromLibrary = (btnClicked) => {
    let bookNumberToRemove = btnClicked.target.parentElement.id;
    myLibrary.splice(bookNumberToRemove,1);
    removeAllCards();
    displayAllCards();
}
//toggle update progress form
const toggleUpdateProgress = () => {
    progressForm.classList.toggle('hidden');
    progressForm.classList.toggle('showing');
    screenCover.classList.toggle('showing');
    screenCover.classList.toggle('hidden');
    libraryContainer.classList.toggle('blur');
    pageTitle.classList.toggle('blur');
    addBookBtn.classList.toggle('blur');
}
//update progress of existing book in array
const getBookToUpdate = (butnClicked) => {
    toggleUpdateProgress();
    bookNumberToUpdate = butnClicked.target.parentElement.id;
}
//update the progress of the selected book using bookToUpdate variable
const updateProgress = (bookBeingUpdated) => {
    bookBeingUpdated = bookNumberToUpdate;
    let updateProgressSelection = document.getElementsByName('update-progress');
    for (let i = 0; i < updateProgressSelection.length; i++) {
        if (updateProgressSelection[i].checked) {myLibrary[bookBeingUpdated].bookProgress = updateProgressSelection[i].value}
    }
    removeAllCards();
    displayAllCards();
    toggleUpdateProgress();
}

//displays all books in the myLibrary array according to their progress
const displayAllCards = () => {
    for (let i = 0; i < myLibrary.length; i++) {
        newBook = myLibrary[i];
        const newCardDiv = document.createElement('div');
        let newCardTitle = document.createElement('p');
        let newCardAuthor = document.createElement('p');
        let newCardPageNumber = document.createElement('p');
        let newCardBtnDiv = document.createElement('div');
        let newCardProgressBtn = document.createElement('button');
        let newCardDeleteBtn = document.createElement('button');
        let newBookNumber = document.createElement('div');
        newCardDiv.classList.add('book-container',i);
        newCardTitle.classList.add('book-title');
        newCardAuthor.classList.add('book-author');
        newCardPageNumber.classList.add('book-page-number');
        newCardBtnDiv.classList.add('book-btn-div');
        newCardBtnDiv.setAttribute('id',i);
        newCardProgressBtn.classList.add('update-progress-btn');
        newCardDeleteBtn.classList.add('book-delete-btn');
        newBookNumber.classList.add('book-number');
        //newCardDeleteBtn.setAttribute('id',i);
        newCardTitle.textContent = newBook.title;
        newCardAuthor.textContent = newBook.author;
        newCardPageNumber.textContent = newBook.pages;
        newCardProgressBtn.textContent = 'Update Progress';
        newCardDeleteBtn.textContent = 'Delete Book';
        newBookNumber.textContent = i;
        newCardProgressBtn.addEventListener('click',getBookToUpdate);
        newCardDeleteBtn.addEventListener('click',removeBookFromLibrary);
        newCardDiv.appendChild(newBookNumber);
        newCardDiv.appendChild(newCardTitle);
        newCardDiv.appendChild(newCardAuthor);
        newCardDiv.appendChild(newCardPageNumber);
        newCardDiv.appendChild(newCardBtnDiv);
        newCardBtnDiv.appendChild(newCardProgressBtn);
        newCardBtnDiv.appendChild(newCardDeleteBtn);
        if (newBook.bookProgress == 3) {addToColumn = finishedColumn}
        else if (newBook.bookProgress == 2) {addToColumn = inProgressColumn}
        else {addToColumn = notStartedColumn}
        addToColumn.appendChild(newCardDiv); 
    }
}

//                                  Event Listeners
addBookBtn.addEventListener('click',() => {
    toggleForm();
})

submitBtn.addEventListener('click', () => {
    getNewBookProgress();
    addBookToLibrary(newTitle.value, newAuthor.value, newPageCount.value, newBookProgress)
    console.log(myLibrary);
    removeAllCards();
    displayAllCards();
    toggleForm();
})

formCloseBtn.addEventListener('click', () => {
    toggleForm();
})

progressFormCloseBtn.addEventListener('click', () => {
    toggleUpdateProgress();
})

updateProgressSubmitBtn.addEventListener('click', updateProgress);

//Example books
addBookToLibrary('Harry Potter and the Goblet of Fire', 'J.K. Rowling', 550,1);
addBookToLibrary('Mistborn', 'Brandon Sanderson', 250,2);
addBookToLibrary('Mere Christianity', 'C.S. Lewis', 150,3);
displayAllCards();