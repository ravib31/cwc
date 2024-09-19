// src/components/BookForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedDate: '',
  });

  // Ensure the token is available from context
  const { token } = useContext(AuthContext);  
  const navigate = useNavigate();  // For navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate the token and formData
      if (!token) {
        throw new Error('Token is missing or invalid.');
      }

      // Send data to backend
      await createBook(formData, token);
      toast.success('Book added successfully!'); 
      navigate('/books'); // Redirect to book list after submission
    } catch (error) {
      console.error('Error adding book:', error.response ? error.response.data : error.message);
      toast.error('Failed to add book');
    }
  };

  // Navigate to the Books page
  const handleGoToBooks = () => {
    navigate('/books');  // Redirect to the books page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Add a New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Genre"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input
              type="date"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Add Book
          </button>
        </form>

        {/* Button to navigate to the Books page */}
        <button 
          onClick={handleGoToBooks} 
          className="w-full mt-4 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Go to Books
        </button>
      </div>
    </div>
  );
};

export default BookForm;
