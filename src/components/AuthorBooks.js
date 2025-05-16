import React, { useState, useEffect } from "react";
import BookModal from "./BookModal";
import BookList from "./BookList";
import axios from "axios";
import { BiArrowBack, BiBook } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
const token = localStorage.getItem("adminToken"); 
const baseURL = process.env.REACT_APP_API_BASE_URL;

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { authorId } = useParams();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const url = authorId
          ? `${baseURL}/api/books?authorId=${authorId}`
          : `${baseURL}/api/books`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [authorId]);

  const toggleModal = () => setShowModal(!showModal);

  const addBook = (newBook) => {
    setBooks((prevBooks) => {
      if (bookToEdit) {
        return prevBooks.map((book) =>
          book._id === newBook._id ? newBook : book
        );
      }
      return [...prevBooks, newBook];
    });
    setBookToEdit(null);
  };

  return (
    <main className="main-wrapper">
      <ToastContainer />
      <div className="main-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <div className="breadcrumb-title pe-3 text-uppercase">
              Book List
            </div>
            {userRole === "admin" && (
              <a onClick={toggleModal} className="btn btn-primary btn-sm">
                <BiBook />
              </a>
            )}
          </div>
          <button
            className="btn btn-danger rounded-circle"
            onClick={() => window.history.back()}
          >
            <BiArrowBack />
          </button>
        </div>
        <div>
          <BookList
            books={books}
            setBookToEdit={setBookToEdit}
            toggleModal={toggleModal}
            authorId={authorId}
          />
          {showModal && (
            <BookModal
              toggleModal={toggleModal}
              addBook={addBook}
              bookToEdit={bookToEdit}
              authorId={authorId}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default BookManagement;
