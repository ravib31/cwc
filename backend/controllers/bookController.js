// controllers/bookController.js
const Book = require('../models/Book');

// Create a new book
exports.createBook = async (req, res) => {
  // Log headers and body for debugging
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);

  const { title, author, genre, publishedDate } = req.body;

  // Validate incoming data
  if (!title || !author || !genre || !publishedDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new book with the provided data
    const newBook = new Book({ title, author, genre, publishedDate });
    await newBook.save();

    // Respond with the created book
    res.json(newBook);
  } catch (error) {
    console.error('Error creating book:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


// Fetch all books with search and pagination
// controllers/bookController.js


exports.getBooks = async (req, res) => {
  const { search, page = 1, limit = 5 } = req.query;

  const query = {};

  // If there's a search term, search across title, author, and genre
  if (search) {
    const regex = { $regex: search, $options: 'i' };  // Case-insensitive regex
    query.$or = [
      { title: regex },    // Search by title
      { author: regex },   // Search by author
      { genre: regex }     // Search by genre
    ];
  }

  try {
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Book.countDocuments(query);

    res.json({
      books,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Fetch a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a book
// controllers/bookController.js
exports.updateBook = async (req, res) => {
  const { title, author, genre, publishedDate } = req.body;
  try {
    // Find the book by ID and update it
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publishedDate },
      { new: true, runValidators: true }  // Ensure new document is returned and validators are run
    );

    // Check if the book exists
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Respond with the updated book data
    res.json(book);
  } catch (error) {
    console.error('Error updating book:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete a book
// controllers/bookController.js
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

