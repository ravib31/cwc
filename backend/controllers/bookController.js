const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  // Log headers and body for debugging
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);

  const { title, author, genre, publishedDate } = req.body;

  // Validate incoming data
  if (!title || !author || !genre || !publishedDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new book with the provided data
    const newBook = new Book({ title, author, genre, publishedDate });
    await newBook.save();

    // Respond with the created book
    res.json(newBook);
  } catch (error) {
    console.error("Error creating book:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBooks = async (req, res) => {
  const { search, page = 1, limit = 5 } = req.query;

  const query = {};
  if (search) {
    const regex = { $regex: search, $options: "i" };
    query.$or = [{ title: regex }, { author: regex }, { genre: regex }];
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
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateBook = async (req, res) => {
  const { title, author, genre, publishedDate } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publishedDate },
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error updating book:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
