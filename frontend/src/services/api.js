// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Set JWT in headers for authenticated requests
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// Authentication APIs
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

// Book APIs
export const getBooks = (searchParams) =>
  API.get("/books", { params: searchParams });
export const getBookById = (id) => API.get(`/books/${id}`);


export const createBook = (bookData, token) => {
  return API.post("/books", bookData, {
    headers: {
      Authorization: `Bearer ${token}`, // Pass token in the request headers
    },
  });
};

// src/services/api.js
export const updateBook = (id, bookData, token) => {
    return API.put(`/books/${id}`, bookData, {
      headers: {
        Authorization: `Bearer ${token}`,  // Ensure the token is passed in the headers
      },
    });
  };
  
 // src/services/api.js
export const deleteBook = (id, token) => {
    return API.delete(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Correct token format: Bearer <token>
      },
    });
  };
  