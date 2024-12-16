const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

// Middleware
app.use(express.json());
app.use(cors());

// Database Setup
const db = new sqlite3.Database(":memory:");
db.serialize(() => {
  // Create Tables
  db.run(`CREATE TABLE Authors (
    AuthorID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE Genres (
    GenreID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT
  )`);

  db.run(`CREATE TABLE Books (
    BookID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    AuthorID INTEGER,
    GenreID INTEGER,
    Pages INTEGER,
    PublishedDate TEXT,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID),
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
  )`);

  // Insert Sample Data
  db.run(
    "INSERT INTO Authors (Name) VALUES ('J.K. Rowling'), ('George R.R. Martin')"
  );
  db.run(
    "INSERT INTO Genres (Name, Description) VALUES ('Fantasy', 'Fantasy Books'), ('Science Fiction', 'Sci-Fi Books')"
  );
});

// RESTful API Endpoints

// Get All Books
app.get("/books", (req, res) => {
  db.all(
    `SELECT Books.*, Authors.Name as Author, Genres.Name as Genre FROM Books 
          LEFT JOIN Authors ON Books.AuthorID = Authors.AuthorID 
          LEFT JOIN Genres ON Books.GenreID = Genres.GenreID`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Add New Book
app.post("/books", (req, res) => {
  const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
  db.run(
    `INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate) VALUES (?, ?, ?, ?, ?)`,
    [Title, AuthorID, GenreID, Pages, PublishedDate],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ BookID: this.lastID });
    }
  );
});

// Update Book
app.put("/books/:id", (req, res) => {
  const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
  db.run(
    `UPDATE Books SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ? WHERE BookID = ?`,
    [Title, AuthorID, GenreID, Pages, PublishedDate, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// Delete Book
app.delete("/books/:id", (req, res) => {
  db.run(`DELETE FROM Books WHERE BookID = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Server Setup
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
