import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

export const getBooks = (searchParams) =>
  API.get("/books", { params: searchParams });
export const getBookById = (id) => API.get(`/books/${id}`);

export const createBook = (bookData, token) => {
  return API.post("/books", bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBook = (id, bookData, token) => {
  return API.put(`/books/${id}`, bookData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBook = (id, token) => {
  return API.delete(`/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
