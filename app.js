// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI(){}

  // ADD BOOK TO LIST
  UI.prototype.addBookToList = function(book){

  const list = document.getElementById('book-list');

  // create a tr element
  const row = document.createElement('tr');

  // insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="" class="delete">X</a></td>
  `;
  list.appendChild(row);
  }

  // SHOW ALERTS
  UI.prototype.showAlert = function(message, className){
      // create div
      const div = document.createElement('div');

      // add classes
      div.className = `alert ${className}`;
  
      // add text
      div.appendChild(document.createTextNode(message));
  
      // get parent
      const container = document.querySelector('.book-container-content');
  
      const form = document.getElementById('book-form');
  
      container.insertBefore(div, form);

      // Timeout after 3seconds
      setTimeout(function(){
        document.querySelector('.alert').remove();
      },3000);
  };

  // DELETE BOOK
  UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
      target.parentElement.parentElement.parentElement.remove();
    }
  };

  // CLEAR FIELDS
  UI.prototype.clearInput = function(){
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
    document.querySelector('.isbn').value = '';
  };



// Add Event Listeners
document.getElementById('book-form').addEventListener('submit', loadBooks);

function loadBooks(e){
  // Get Form Values
  const title = document.querySelector('.title').value,
        author = document.querySelector('.author').value,
        isbn = document.querySelector('.isbn').value;

  // Instantiate a book
  const book = new Book(title, author, isbn);
  console.log(book)
  
  // Instantiate UI
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn ==='' ){
    // Show alert
    ui.showAlert('Please fill all fields', 'error')
  }else{
    // Add Book to List
    ui.addBookToList(book);

    // Show Alert
    ui.showAlert('Book added succesfully', 'success')

    // Clear Input
    ui.clearInput();

  }

  e.preventDefault();

}

// ADD EVENT LISTENER FOR DELETE
document.getElementById('book-list').addEventListener('click', deleteItem);

function deleteItem(e){
  console.log('Item deleted...')

  // Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);
  console.log(e.target)


  // Show Message
  ui.showAlert('Book removed', 'success')

  e.preventDefault();
}

