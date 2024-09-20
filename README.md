1-Introduction
This Book Management application is a web-based system built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application allows users to perform CRUD operations on a collection of books, with user authentication implemented via JWT (JSON Web Tokens). The app also includes filtering, search, pagination, and protected routes to ensure that only logged-in users can add, edit, or delete books.


2-Key Features
User Authentication:
Users can register and log in with secure authentication using JWT tokens.
Only logged-in users can access specific routes (e.g., book list, add, edit, delete).


Book Management (CRUD Operations):
Create: Users can add new books.
Read: Users can view a list of books and search/filter through them.
Update: Users can update existing books.
Delete: Users can remove books from the list.


Search, Filtering & Pagination:
Users can search for books by title, author, or genre.
Users can filter books based on genres.
Pagination ensures efficient browsing of large lists.

Responsive Design:
The app is fully responsive, ensuring a seamless experience across devices.

Toasts Notifications:
Provides feedback on actions (e.g., book added, book updated, errors) using react-toastify.


3-Tech Stack
Frontend: React.js, TailwindCSS, React Router, React Icons, Toastify
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Authentication: JWT (JSON Web Tokens)
REST API: Axios (for making API calls)


4-Application Architecture

Frontend Directory Structure:
src/
│
├── components/               # React components for UI
│   ├── BookList.js           # Component for listing books
│   ├── BookForm.js           # Component for adding/editing books
│   ├── Register.js           # Component for registering a new user
│   ├── Login.js              # Component for user login
│   ├── Header.js             # Header component
│   ├── Footer.js             # Footer component
│   └── Modal.js              # Modal component for editing books
│
├── context/                  
│   └── AuthContext.js        # Context for managing authentication state
│
├── services/
│   └── api.js                # Axios API services for handling HTTP requests
│
├── App.js                    # Main App component
└── index.js                  # Entry point of the React app

5-Key Components
1. Authentication Context (AuthContext.js)
   Purpose: Provides global state for user authentication (managing JWT tokens, login/logout functionalities).
2. Book List (BookList.js)
   Purpose: Displays a paginated list of books with search, filtering (genre), and CRUD functionalities.
3. Book Form (BookForm.js)
   Purpose: Handles adding and updating books.
4. Protected Route (ProtectedRoute.js) 
   Purpose: Restricts access to certain routes if the user is not authenticated.

Backend (API)
Backend Directory Structure:

backend/
│
├── controllers/
│   └── bookController.js     # Handles CRUD operations for books
├── models/
│   └── Book.js               # Mongoose model for Book
├── routes/
│   └── bookRoutes.js         # Routes for handling book-related requests
├── middleware/
│   └── authMiddleware.js     # JWT authentication middleware
└── server.js                 # Entry point for the Node.js backend


6-Book API Endpoints:
Method	  Endpoint	               Description	                            Authentication Required
GET	       /api/books       Fetch all books (supports search, 
                              genre filtering, and pagination)	                          No
POST	       /api/books	      Add a new book	                                            Yes
PUT	       /api/books/:id	Update an existing book	                                   Yes
DELETE	    /api/books/:id	Delete a book	                                            Yes



7-Step to Run Locally
  1. Clone the Repository
  2. Navigate to the Project Directory
  3. Install Dependencies
  4. Set Up Environment Variables
  5. Run Backend Server
  6. Run Frontend Server
  7. Access the Application
  8. Login & Registration


8-Access the Application
  Once both the backend and frontend servers are running, you can access the application in your browser:
  Frontend: http://localhost:3000
  Backend API (for testing): http://localhost:5000/api

9-Login & Registration
Register a new user by navigating to /register.
After registration, log in with the credentials you used on the /login page.
Once logged in, you will be redirected to the protected pages, where you can start managing your books.