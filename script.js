// Variables for the form for adding books
const addBookModal = document.getElementById("addBookModal");
const addBookBtn = document.getElementById("addBookBtn");
const closeAddBookFormSpan = document.getElementById("closeAddBookFormSpan");
const addBookForm = document.getElementById('addBookForm');
const addBookSubmitBtn = document.getElementById('addBookSubmitBtn');

// Variables for the form for clearing all
const clearAllModal = document.getElementById("clearAllModal");
const clearAllBtn = document.getElementById("clearAllBtn");
const closeClearAllFormSpan = document.getElementById("closeClearAllFormSpan");
const clearAllForm = document.getElementById('clearAllForm');
const clearAllSubmitBtn = document.getElementById('clearAllSubmitBtn');

// Other variables
const libDiv = document.getElementById('libDiv');
let myLibrary = [];
let newBook;



////////////////////////////////////////////////// onclick for the form for adding books

// When the user clicks on the button, open the modal
addBookBtn.onclick = function() {
    addBookModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeAddBookFormSpan.onclick = function() {
    addBookModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(e) {
    if (e.target == addBookModal) {
        addBookModal.style.display = "none";
    } else if (e.target == clearAllModal) {
        clearAllModal.style.display = "none";
    }
}



////////////////////////////////////////////////// onclick for the form for clearing all

// When the user clicks on the button, open the modal
clearAllBtn.onclick = function() {
    clearAllModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeClearAllFormSpan.onclick = function() {
    clearAllModal.style.display = "none";
}



////////////////////////////////////////////////// Event listeners

window.addEventListener('keydown', processKeyboardInput);

function processKeyboardInput(e) {
    if(e.ctrlKey && e.shiftKey && (e.key === '1')) {
        addBookModal.style.display = "block";
    } else if (e.ctrlKey && e.shiftKey && (e.key === '2')) {
        clearAllModal.style.display = "block";
    }
}

addBookSubmitBtn.addEventListener('click', addBookToLib);
clearAllSubmitBtn.addEventListener('click', clearLib);


////////////////////////////////////////////////// Add book to library

class Book {
    constructor(title, author, pages, hasBeenRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasBeenRead = hasBeenRead;
    }
}

function addBookToLib() {
    event.preventDefault(); // If an action attribute is not mentioned in a form, the form will try to submit itself to the current URL it is in - so this default behavior needs to be blocked
    addBookModal.style.display = "none"; // Hide the modal display after the user clicks "submit"
    newBook = new Book(addBookForm.title.value, addBookForm.author.value, addBookForm.pages.value, addBookForm.hasBeenReadYes.checked);
    myLibrary.push(newBook);
    updateLocalStorage();
    renderLib();
    addBookForm.reset();
}

function renderLib() {
    const prevBookCollection = document.querySelectorAll('.bookDiv');
    prevBookCollection.forEach(book => libDiv.removeChild(book)); // Remove all books currently on screen
    for(let i=0; i < myLibrary.length; i++){
        createBook(myLibrary[i]); // Add each book to the screen
    }
}

function createBook(libArrayItem) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('bookDiv');
    bookDiv.setAttribute('id', myLibrary.indexOf(libArrayItem));

    const titleDiv = document.createElement('div');
    titleDiv.textContent = libArrayItem.title;
    titleDiv.classList.add('titleDiv');
    bookDiv.appendChild(titleDiv);

    const authorDiv = document.createElement('div');
    authorDiv.textContent = libArrayItem.author;
    authorDiv.classList.add('authorDiv');
    bookDiv.appendChild(authorDiv);

    const pagesDiv = document.createElement('div');
    pagesDiv.textContent = libArrayItem.pages + ' pg';
    pagesDiv.classList.add('pagesDiv');
    bookDiv.appendChild(pagesDiv);

    const hasBeenReadDiv = document.createElement('div');
    if(libArrayItem.hasBeenRead) {
        hasBeenReadDiv.style.color = 'darkGreen';
        hasBeenReadDiv.textContent = 'Status: Read';
    } else {
        hasBeenReadDiv.style.color = 'darkRed';
        hasBeenReadDiv.textContent = 'Status: Unread';
    }
    hasBeenReadDiv.classList.add('hasBeenReadDiv');
    bookDiv.appendChild(hasBeenReadDiv);

    const hasBeenReadBtn = document.createElement('button');
    hasBeenReadBtn.textContent = 'Change read status';
    hasBeenReadBtn.classList.add('hasBeenReadBtn');
    bookDiv.appendChild(hasBeenReadBtn);

    const removeBookBtn = document.createElement('button');
    removeBookBtn.textContent = 'Remove book';
    removeBookBtn.classList.add('removeBookBtn');
    bookDiv.appendChild(removeBookBtn);

    libDiv.appendChild(bookDiv);

    hasBeenReadBtn.addEventListener('click', () => {
        libArrayItem.hasBeenRead = !libArrayItem.hasBeenRead;
        updateLocalStorage();
        renderLib();
    });

    removeBookBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(libArrayItem), 1);
        updateLocalStorage();
        renderLib();
    });
}



////////////////////////////////////////////////// Clear library

function clearLib() {
    event.preventDefault(); // If an action attribute is not mentioned in a form, the form will try to submit itself to the current URL it is in - so this default behavior needs to be blocked
    clearAllModal.style.display = "none"; // Hide the modal display after the user clicks "submit"
    myLibrary = [];
    renderLib();
    clearAllForm.reset();
}



////////////////////////////////////////////////// Local storage

function updateLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

retrieveFromLocalStorage(); // This function is run at start and page refresh

function retrieveFromLocalStorage() {
    if(localStorage.myLibrary) { // If myLibrary already exists in localStorage, retrieve data
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    renderLib();
}