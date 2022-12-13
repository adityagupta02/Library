console.log("object");
displayBooks();
class book {
  constructor(name, author, genre) {
    this.name = name;
    this.author = author;
    this.genre = genre;
  }
}
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.querySelector("#bookName");
  let author = document.querySelector("#Author");
  let genre = "";
  let ScienceFiction = document.querySelector("#ScienceFiction");
  let Thriller = document.querySelector("#Thriller");
  let Mystery = document.querySelector("#Mystery");
  let Other = document.querySelector("#Other");
  if (ScienceFiction.checked) {
    genre = "Science Fiction";
    ScienceFiction.checked = false;
  } else if (Thriller.checked) {
    genre = "Thriller";
    Thriller.checked = false;
  } else if (Mystery.checked) {
    genre = "Mystery";
    Mystery.checked = false;
  } else if (Other.checked) {
    genre = "Other";
    Other.checked = false;
  }

  let books = localStorage.getItem("books");
  if (books == null) {
    books = [];
  } else {
    books = JSON.parse(books);
  }
  if (name.value.length < 2 || author.value.length < 2 || genre == "") {
    showMsg("danger", "Invalid Name, Author or Genre");
    return;
  }
  let newBook = new book(name.value, author.value, genre);
  name.value = "";
  author.value = "";
  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
  showMsg("success", "Book added successfully");
});

function showMsg(type, message) {
  html = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
  let msg = document.querySelector("#msg");
  msg.innerHTML = html;
  setInterval(() => {
    msg.innerHTML = "";
  }, 5000);
}

function displayBooks() {
  let books = localStorage.getItem("books");
  if (books == null) {
    books = [];
  } else {
    books = JSON.parse(books);
  }
  html = "";
  books.forEach((e, index) => {
    html += `<tr>
            <td>${index + 1}</td>
            <td>${e.name}</td>
            <td>${e.author}</td>
            <td>${e.genre}</td>
            <td><button class="btn btn-primary" id = "${index}" onClick = "deleteBook(this.id)"> Delete </button></td>
        </tr>`;
  });
  let tableBody = document.querySelector("#tableBody");
  tableBody.innerHTML = html;
}

function deleteBook(index){
  let books = localStorage.getItem("books");
  books = JSON.parse(books);
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}
