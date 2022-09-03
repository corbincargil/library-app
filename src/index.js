import './styles.css'
import plusIcon from './icons/plus-circle-outline-black.png'
import closeIcon from './icons/close-box-outline.png'
import ghLogo from './img/github-logo.png'

let myLibrary = [];
let userLibrary = [];
let bookNumberToUpdate;
//                               Firebase To-do/Features:
// - Add styling for log in/log out, profile pic
// - Add handleDelete function that will erase books from Firestore 
//   (not just  from the UI)
// - Integrate Firestore with updateProgress functionality
//   (that way when a book is updated, the update is saved in Firestore)
// - (DONE) Alert message that users must sign in to add a book 
// - (DONE) Have user sign in and auth before dispaying books 
// - (DONE) Sign out button 


//                                      To-do/Features:
// - Optional inputs on the form (current page count, date finished, etc.)
// - Delete book button
// - Click book card to enlarge
// - media queries (mobile access)
// - Image of book for background of the cards (different book/color for each book added?)
// - Dark & Light themes

//                                      Lessons learned:
// - Practiced using different scopes within functions to manipulate global scope


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
const updateProgressSubmitBtn = document.querySelector('#update-progress-submit-btn');
let newBookProgress = document.getElementsByName('progress');


//Book class
class Book {
    constructor(title,author,pages,bookProgress,dbId,username) {
        this.title = title
        this.author = author
        this.pages = pages
        this.bookProgress = bookProgress
        this.bookNumber = myLibrary.length;
        this.dbId = dbId;
        this.username = username;
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
const addBookToLibrary = (title, author, pages, bookProgress, dbId, username) => {
    if (!title) {alert('Please input a title for the new book!'); return;};
    if (!author) {alert('Please input an author for the new book!'); return;};
    if (!pages) {alert('Please input a page count for the new book!'); return;};
    let newBook = new Book(title,author,pages,bookProgress, dbId, username);
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
    handleDeleteBook();
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
const updateProgress = () => {
    let updateProgressSelection = document.getElementsByName('update-progress');
    for (let i = 0; i < updateProgressSelection.length; i++) {
        if (updateProgressSelection[i].checked) {myLibrary[bookNumberToUpdate].bookProgress = updateProgressSelection[i].value}
    }
    removeAllCards();
    displayAllCards();
    toggleUpdateProgress();
}

//displays all books in the myLibrary array according to their progress
const displayAllCards = (book) => {
        let newBook = book;
        let addToColumn;
        const newCardDiv = document.createElement('div');
        let newCardTitle = document.createElement('p');
        let newCardAuthor = document.createElement('p');
        let newCardPageNumber = document.createElement('p');
        let newCardBtnDiv = document.createElement('div');
        let newCardProgressBtn = document.createElement('button');
        let newCardDeleteBtn = document.createElement('button');
        let newBookNumber = document.createElement('div');
        newCardDiv.classList.add('book-container');
        newCardTitle.classList.add('book-title');
        newCardAuthor.classList.add('book-author');
        newCardPageNumber.classList.add('book-page-number');
        newCardBtnDiv.classList.add('book-btn-div');
        // newCardBtnDiv.setAttribute('id',i);
        newCardProgressBtn.classList.add('update-progress-btn');
        newCardDeleteBtn.classList.add('book-delete-btn');
        //newCardDeleteBtn.setAttribute('id',newBook.id);
        newBookNumber.classList.add('book-number');
        newCardTitle.textContent = newBook.title;
        newCardAuthor.textContent = newBook.author;
        newCardPageNumber.textContent = newBook.pages;
        newCardProgressBtn.textContent = 'Update Progress';
        newCardDeleteBtn.textContent = 'Delete Book';
        // newBookNumber.textContent = i;
        newCardProgressBtn.addEventListener('click',getBookToUpdate);
        newCardDeleteBtn.addEventListener('click',removeBookFromLibrary);
        newCardDeleteBtn.addEventListener('click',handleDeleteBook);
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

//                                  Event Listeners
addBookBtn.addEventListener('click',() => {
    toggleForm();
})


submitBtn.addEventListener('click', () => {
    getNewBookProgress();
    addBookToLibrary(newTitle.value, newAuthor.value, newPageCount.value, newBookProgress, getUserName())
    //removeAllCards();
    //displayAllCards();
    toggleForm();
    onBookFormSubmit();
})

formCloseBtn.addEventListener('click', () => {
    toggleForm();
})

progressFormCloseBtn.addEventListener('click', () => {
    toggleUpdateProgress();
})


updateProgressSubmitBtn.addEventListener('click', updateProgress);

//Adding icons from js instead of html
const addBookBtnIcon = document.getElementById('plus-icon');
addBookBtnIcon.src = plusIcon;

const progressFormCloseBtnIcon = document.getElementById('progress-form-close-icon');
progressFormCloseBtnIcon.src = closeIcon;

const addBookFormCloseBtnIcon = document.getElementById('form-close-icon');
addBookFormCloseBtnIcon.src = closeIcon;

const ghLinkImg = document.getElementById('gh-logo');
ghLinkImg.src = ghLogo;

//Example books
// addBookToLibrary('Harry Potter and the Goblet of Fire', 'J.K. Rowling', 550, 1);
// addBookToLibrary('Mistborn', 'Brandon Sanderson', 250, 2);
// addBookToLibrary('Mere Christianity', 'C.S. Lewis', 150, 3);
// displayAllCards();

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//                          FIREBASE
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
// Import Firebase 
import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRL0cRZluTry29Vs84dK7ncCQNxsCTKx4",
  authDomain: "library-app-f8e0b.firebaseapp.com",
  projectId: "library-app-f8e0b",
  storageBucket: "library-app-f8e0b.appspot.com",
  messagingSenderId: "379741890590",
  appId: "1:379741890590:web:759a7d8601293e929ce60f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// user authentication
const auth = getAuth(app);
//init services
const db = getFirestore();
//collection ref
const colRef = collection(db, 'books');

onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('logged in!');
    } else {
        console.log('no user!');
    }
});

// Signs-in Friendly Chat.
async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
    .then(() => {
        console.log(myLibrary);
        userLibrary = myLibrary.map((book) => {
            if (getUserName() === book.username) {return book}
        })
        userLibrary.forEach((book) =>{
            console.log(book);
            displayAllCards(book);
        })
    })
}
  
// Signs-out of Friendly Chat.
function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth());
    userPicElement.src = '';
    removeAllCards();
}
  
// Initiate firebase auth
function initFirebaseAuth() {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
    return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
}

  // Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
    if (user) {
        var profilePicUrl = getProfilePicUrl();
        // Set the user's profile pic and name.
        userPicElement.src = addSizeToGoogleProfilePic(profilePicUrl);
    }
}

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
      return url + '?sz=150';
    }
    return url;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
    return !!getAuth().currentUser;
}

// Returns the signed-in user's display name.
function getUserName() {
    return getAuth().currentUser.displayName;
}

// Returns true if user is signed-in. Otherwise false and displays a message.
function checkSignedInWithMessage() {
    // Return true if the user is signed in Firebase
    if (isUserSignedIn()) {
      return true;
    }
}

//real time data collection 
// getDocs(colRef)
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//         const book = doc.data();
//         console.log(doc);
//         console.log(book);
//         addBookToLibrary(book.title, book.author, book.pageCount, book.progress, book.id)
//     })
//   })
//   .then(() => {
//     if (checkSignedInWithMessage()) {
//             removeAllCards();
//             displayAllCards();
//         }
//     })
//   .catch(err => {
//     console.log(err.message);
//   })

onSnapshot(colRef, (snapshot) => {
    removeAllCards();
    snapshot.docs.forEach((doc) => {
        const book = doc.data();
        console.log(`onSnapshot function ran`);
        addBookToLibrary(book.title, book.author, book.pageCount, book.bookProgress, book.id, book.username);
        if (checkSignedInWithMessage()) {
            displayAllCards(book);
        }
    })
    
})

// Saves a new book to Cloud Firestore
async function saveBook(title,author,pageCount,progress) {
    let newBookDoc = await addDoc(colRef, {
        username: getUserName(),
        title: title,
        author: author,
        pageCount: pageCount,
        bookProgress: progress,
        id: '',
        timestamp: serverTimestamp()
    })
    setDoc(newBookDoc, {id: newBookDoc.id}, {merge: true})
}

function onBookFormSubmit() {
    if (!checkSignedInWithMessage()) {alert(`You must be signed in if you want your new book to be saved!`); return;}
    if (newTitle.value && newAuthor.value && newPageCount.value && newBookProgress && checkSignedInWithMessage()) {
        saveBook(newTitle.value, newAuthor.value, newPageCount.value, newBookProgress)
    }
}

function handleDeleteBook() {
    const docRef = doc(db, 'books', );
    deleteDoc(docRef);
}

var userPicElement = document.getElementById('user-pic');
var signInButton = document.getElementById('sign-in');
signInButton.addEventListener('click', signIn);
var signOutButton = document.getElementById('sign-out');
signOutButton.addEventListener('click', signOutUser);

initFirebaseAuth();
//loadMessages();