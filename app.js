// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI(){}

UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete">x</a></td>`;

  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className){
  // Create a div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // add Text
  div.appendChild(document.createTextNode(message));
  // Get a parent
  const container = document.querySelector('.container');
  // Get Form
  const form = document.querySelector('#book-form');
  // Insert Alerts
  container.insertBefore(div, form);
  // Timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000)
}

// Delete Book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
    return true;
  }
}
// Clear Field
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
} 
// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);

  // Create new ui
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === ''){
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  }else{
    
    // Add book to list
    ui.addBookToList(book);

    // show success
    ui.showAlert('Book Added!', 'success');
  
    // Clear Field
    ui.clearFields();
  }


  e.preventDefault();
})

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  
  const ui = new UI();
  // Delete Book
  const bookDeleted = ui.deleteBook(e.target);
  // Show message
  if(ui.deleteBook(e.target)){
    ui.showAlert('Book Removed!', 'success');
  }
  e.preventDefault();
})