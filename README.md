### Book Management Application
Objective:
 Design and implement a Book Management System that allows users to search for books, view details, and manage book records efficiently.

Requirements
User Interface (UI):
Home Page:


Include a navigation bar with links: Home, Contact, About, and Add Book.
Provide a search section with filters (e.g., genres, authors) and a search button.
Search Results Page:


Display books in a grid or list format with pagination.
Include options to view details, edit, or delete a book record.
Details Page:


Display detailed information about a selected book, including:
Title
Author
Genre
Pages
Published Date
Book Management Pages:


Provide forms for adding and editing book details with appropriate input validations.
Include a confirmation step for book deletion.

Database Schema:
Books Table:


Fields:
BookID (Primary Key)
Title
AuthorID (Foreign Key)
GenreID (Foreign Key)
Pages
PublishedDate
Genres Table:


Fields:
GenreID (Primary Key)
Name
Description
Authors Table:


Fields:
AuthorID (Primary Key)
Name

Development Plan:
Frontend:


Use a modern JavaScript framework like React.js.
Develop components for:
Home
Search Results
Book Details
Add/Edit Book
Delete Book
Integrate Fetch API for data communication with the backend.
Backend:


Develop RESTful API endpoints using Node.js with Express.js:
GET /books: Fetch all books.
POST /books: Add a new book.
PUT /books/:id: Update an existing book.
DELETE /books/:id: Delete a book.
Database:


Use a relational database like SQLite for data storage.


Testing Strategy:
Frontend Unit Testing:


Use Jest (for React) or Mocha/Chai.
Backend Unit Testing:


Implement test cases using Mocha or Jest.
Manual Testing:


Verify CRUD operations and UI functionality.

Submission Guidelines:
Submit the complete source code (frontend, backend, and database scripts).
Include instructions for setting up and running the application.
Attach screenshots of the UI and testing results.

