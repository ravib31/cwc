import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  // const { token } = useContext(AuthContext);
  // console.log(token);
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute element={BookList} />} />
          <Route
            path="/book/:id?"
            element={<ProtectedRoute element={BookForm} />}
          />
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </AuthProvider>
  );
};

export default App;
