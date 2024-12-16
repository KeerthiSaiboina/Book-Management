import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="app">
      <nav>
        <ul>
          <li>Home</li>
          <li>Contact</li>
          <li>About</li>
          <li>Add Book</li>
        </ul>
      </nav>
      <header>
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </header>
      <main>
        <h1>Book List</h1>
        <div className="book-grid">
          {books.map((book) => (
            <div className="book-card" key={book.BookID}>
              <h2>{book.Title}</h2>
              <p>Author: {book.Author}</p>
              <p>Genre: {book.Genre}</p>
              <p>Pages: {book.Pages}</p>
              <p>Published: {book.PublishedDate}</p>
              <div>
                <button>View Details</button>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
