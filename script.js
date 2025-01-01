document.addEventListener('DOMContentLoaded', () => {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addBook();
    });
 
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
      for (const todo of data) {
        todos.push(todo);
      }
    }
   
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', (event) => {
        event.preventDefault();
        searchBook();
    });
 
    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        const formSection = document.getElementById('inputSection');
        formSection.classList.toggle('active');
    });
 
    if (isStorageExist()) {
        loadBooksFromStorage();
    }
});
 
const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';
 
function generateId() {
    return +new Date();
}
 
function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year: parseInt(year),
        isComplete
    };
}
 
function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;
 
    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, parseInt(bookYear), isComplete);
    books.push(bookObject);
 
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
    resetForm();
}
 
function resetForm() {
    document.getElementById('inputBook').reset();
    document.getElementById('inputSection').classList.remove('active');
}
 
document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    const completeBookshelfList = document.getElementById('completeBookshelfList');
 
    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';
 
    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete) {
            incompleteBookshelfList.append(bookElement);
        } else {
            completeBookshelfList.append(bookElement);
        }
    }
});
 
function makeBook(bookObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title;
 
    const textAuthor = document.createElement('p');
    textAuthor.innerText = `Author: ${bookObject.author}`;
 
    const textYear = document.createElement('p');
    textYear.innerText = `Year: ${bookObject.year}`;
 
    const container = document.createElement('div');
    container.classList.add('book_item');
    container.append(textTitle, textAuthor, textYear);
    container.setAttribute('id', `book-${bookObject.id}`);
 
    if (bookObject.isComplete) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('green');
        undoButton.innerText = 'Mark as Unread';
 
        undoButton.addEventListener('click', function () {
            undoBookFromComplete(bookObject.id);
        });
 
        const trashButton = document.createElement('button');
        trashButton.classList.add('red');
        trashButton.innerText = 'Delete book';
 
        trashButton.addEventListener('click', function () {
            removeBookFromComplete(bookObject.id);
        });
 
        container.append(undoButton, trashButton);
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('green');
        checkButton.innerText = 'Mark as Read';
 
        checkButton.addEventListener('click', function () {
            addBookToComplete(bookObject.id);
        });
 
        const trashButton = document.createElement('button');
        trashButton.classList.add('red');
        trashButton.innerText = 'Delete book';
 
        trashButton.addEventListener('click', function () {
            removeBookFromComplete(bookObject.id);
        });
 
        container.append(checkButton, trashButton);
    }
 
    return container;
}
 
function addBookToComplete(bookId) {
    const bookTarget = findBook(bookId);
 
    if (bookTarget == null) return;
 
    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}
 
function removeBookFromComplete(bookId) {
    const bookTargetIndex = findBookIndex(bookId);
 
    if (bookTargetIndex === -1) return;
 
    books.splice(bookTargetIndex, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();}
    
function undoBookFromComplete(bookId) {
    const bookTarget = findBook(bookId);
 
    if (bookTarget == null) return;
 
    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}
 
function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}
 
function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
 
    return -1;
}
 
function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}
 
function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}
 
function loadBooksFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);}
 
    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }
    function loadBooksFromStorage() {
        const serializedData = localStorage.getItem(STORAGE_KEY);
        let data = JSON.parse(serializedData);}
    
        if (data !== null) {
            for (const book of data) {
                // Pastikan tahun (year) disimpan sebagai number
                book.year = parseInt(book.year);
                books.push(book);
            
    document.dispatchEvent(new Event(RENDER_EVENT));
}}
 
function searchBook() {
    const searchBookTitle = document.getElementById('searchBookTitle').value.toLowerCase();
    const searchResults = books.filter(book => book.title.toLowerCase().includes(searchBookTitle));
 
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    const completeBookshelfList = document.getElementById('completeBookshelfList');
 
    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';
 
    for (const bookItem of searchResults) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete) {
            incompleteBookshelfList.append(bookElement);
        } else {
            completeBookshelfList.append(bookElement);
        }
    }
}