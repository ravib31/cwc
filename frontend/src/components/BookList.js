import React, { useState, useEffect, useContext } from 'react';
import { getBooks, deleteBook, updateBook, getBookById } from '../services/api'; // Added getBookById
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Modal from './Modal'; 
import { IoAdd } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { toast } from 'react-toastify';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);
  const [totalBooks, setTotalBooks] = useState(0); 
  const [editFormData, setEditFormData] = useState({
    title: '',
    author: '',
    genre: '',
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = { search: searchTerm, page, limit: 5 };
        const res = await getBooks(params);
        setBooks(res.data.books || []);
        setTotalBooks(res.data.totalBooks);
        setHasMoreBooks(res.data.books.length === 5); 
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, [searchTerm, page]);

  const handleNextPage = () => {
    if (hasMoreBooks) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNewBook = () => {
    navigate('/book'); 
  };

  const handleLogout = () => {
    logout(); 
    toast.success("Logout Successful")
    navigate('/login'); 
   
  };

  const handleDeleteBook = async (id) => {
    const token = localStorage.getItem('token'); 
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id, token);
        setBooks(books.filter((book) => book._id !== id)); 
        toast.success('Book deleted successfully.');
      } catch (error) {
        console.error('Error deleting book:', error.response ? error.response.data : error.message);
        toast.error('Failed to delete the book.');
      }
    }
  };

  const handleEditBook = async (id) => {
    const token = localStorage.getItem('token'); 
    try {
      const res = await getBookById(id, token); 
      const book = res.data;
      setSelectedBook(book); 
      setEditFormData({ title: book.title, author: book.author, genre: book.genre }); 
      setIsModalOpen(true); 
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  const handleUpdateBook = async () => {
    const token = localStorage.getItem('token'); 
  
    try {
      await updateBook(selectedBook._id, editFormData, token); 
      toast.success('Book updated successfully.');
      setIsModalOpen(false); 
      setBooks(
        books.map((book) =>
          book._id === selectedBook._id ? { ...book, ...editFormData } : book
        )
      );
    } catch (error) {
      console.error('Error updating book:', error.response ? error.response.data : error.message);
      toast.error('Failed to update the book.');
    }
  };

  const handleFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="container mx-auto">
        <div className="mb-8 flex justify-end space-x-4">
          <button
            onClick={handleAddNewBook}
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
           <IoAdd />
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Logout
          </button>
        </div>

        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title, author, or genre"
            value={searchTerm}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul className="divide-y divide-gray-200">
            {Array.isArray(books) && books.length > 0 ? (
              books.map((book) => (
                <li key={book._id} className="py-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
                    <h5 className="text-sm font-semibold text-gray-700">by {book.author}</h5>
                    <p className="text-gray-600">Genre: {book.genre}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditBook(book._id)} 
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded-lg transition duration-300"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg transition duration-300"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="py-4 text-gray-500">No books found</li>
            )}
          </ul>
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className={`${
              page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-semibold py-2 px-4 rounded-lg transition duration-300`}
          >
            <FaAngleLeft />
          </button>
          <span className="text-gray-600">Page {page}</span>
          <button
            onClick={handleNextPage}
            disabled={!hasMoreBooks} 
            className={`${
              !hasMoreBooks ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-semibold py-2 px-4 rounded-lg transition duration-300`}
          >
           <FaAngleRight />
          </button>
        </div>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
            <form className="space-y-4">
              <div>
                <input
                  name="title"
                  value={editFormData.title}
                  onChange={handleFormChange}
                  placeholder="Title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <input
                  name="author"
                  value={editFormData.author}
                  onChange={handleFormChange}
                  placeholder="Author"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <input
                  name="genre"
                  value={editFormData.genre}
                  onChange={handleFormChange}
                  placeholder="Genre"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-between">
              <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateBook}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                  Update
                </button>
                
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default BookList;
