// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import ProtectedRoute from './components/ProtectedRoute';  // Import the ProtectedRoute component
import Header from './components/Header';
import Footer from './components/Footer';

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
        <Footer/>
      </Router>
    </AuthProvider>
  );
};

export default App;
