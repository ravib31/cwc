// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import ProtectedRoute from './components/ProtectedRoute';  // Import the ProtectedRoute component

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<ProtectedRoute element={BookList} />} /> {/* Protect this route */}
          <Route path="/book/:id?" element={<ProtectedRoute element={BookForm} />} /> {/* Protect this route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
