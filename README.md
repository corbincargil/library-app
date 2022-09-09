# library-app

## Aug. 2022 Update:

Integrated firebase so the user can sign in with Google and all changes made are saved if the app is closed. Only books added by the user will be displayed. 

## Description:

A library web-app where users can input & track book information for books they have read, are currently reading, or want to read. The primary goal of this project was to practice creating objects using object constructors, adding them to arrays, and manipulating the data set to display relevant information on the UI. 


## Live Preview:

Use this link to access a live demo:
https://corbincargil.github.io/library-app/

## Lessons Learned: 

* Practiced using Firebase to allow user sign-in, adding/editing/deleting documents and saving docs to firestore database.
* Used firebase to display books based on if the user is signed in and only display books that the user has added. 
* Practiced OOP principles by creating objects with object constructors (creating 'book' objects based on user input and then adding the objects to the 'library' array)
* Practiced using Javascript array methods to manipulate and sort through an array of objects to display them on the user interface based on specific information (whether their status is 'not started', 'in progress', or 'finished')
* Practiced using forms to receive user inputs and validate information before submitting
* Further practice with CSS styling
* Practice creating a project from scratch and wrtiting clean, readable code

## Project Features: 
* Book info saved to database
* View book information (title, author, and page count)
* Books categorized by completion status (not started, reading, or finished)
* Book progress can be updated in real-time using the interface

### `The Library:`
![Screen Shot 2022-08-20 at 1 21 36 PM](https://user-images.githubusercontent.com/100732012/185761201-09771657-74b0-406b-9174-5197f6bd1ac0.png)

### `Adding a new book:`
![Screen Shot 2022-08-20 at 1 22 07 PM](https://user-images.githubusercontent.com/100732012/185761211-a628ccbe-be39-4793-bae4-ed0ad0322e6e.png)

### `Updating book progress:`
![Screen Shot 2022-08-20 at 1 28 26 PM](https://user-images.githubusercontent.com/100732012/185761354-74a73409-7d56-402d-b8ba-abb917a05d0f.png)
