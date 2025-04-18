import React, { useState } from "react";
import axios from "axios";
import { BiBookAdd, BiDetail, BiEdit, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";

const BookList = ({
  books,
  setBookToEdit,
  toggleModal,
  setBooks,
  authorId,
}) => {
  const [orderInputs, setOrderInputs] = useState({});
  const [bookOrders, setBookOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("adminToken");
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const handleOrderInputChange = (bookId, field, value) => {
    setOrderInputs((prev) => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [field]: value,
      },
    }));
  };

  const handleAddOrder = async (bookId) => {
    try {
      const order = orderInputs[bookId];
      await axios.post(`${baseURL}/api/orders/add-order`, {
        bookId,
        authorId,
        ...order,
      });
      toast.success("Order added");
      setOrderInputs((prev) => ({ ...prev, [bookId]: {} }));
    } catch (err) {
      toast.error(err);
    }
  };

  const handleEditClick = (book) => {
    setBookToEdit(book);
    toggleModal();
  };

  const handleDeleteClick = async (bookId) => {
    try {
      const response = await axios.delete(
        `${baseURL}/api/books/delete-book/${bookId}`
      );
      if (response.status === 200) {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );
        toast.success("Book deleted successfully!");
      }
    } catch (error) {
      toast.error("Error deleting book:", error);
    }
  };

  const fetchOrdersForBook = async (bookId) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/orders/get-orders-by-book/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookOrders(response.data);
      setSelectedBookId(bookId);
      setShowModal(true);
    } catch (error) {
      toast.error("Failed to fetch orders:", error);
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const res = await fetch(
          `${baseURL}/api/orders/delete-order/${orderId}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to delete order");
        }

        setBookOrders((prev) => prev.filter((order) => order._id !== orderId));
        toast.success("Order deleted successfully");
      } catch (error) {
        toast.error("Failed to delete order");
        console.error(error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setBookOrders([]);
  };

  return (
    <div>
      {books.length > 0 ? (
        books.map((book) => (
          <div className="card mb-3" key={book._id}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 col-sm-6">
                  <h5 className="card-title">{book.title}</h5>
                  <h6>{book.author}</h6>
                  <p>Sub Title: {book.subtitle}</p>
                  <p>ISBN: {book.isbn}</p>
                  <p>SKU: {book.sku}</p>
                </div>
                <div className="col-md-3 col-sm-6">
                  <p>Paper Size: {book.size}</p>
                  <p>No of Pages: {book.pages}</p>
                  <p>Paper Color: {book.color}</p>
                  <p>Cover: {book.cover}</p>
                </div>
                <div className="col-md-3 col-sm-6">
                  <p>Paper Back MRP: {book.paperMrp}</p>
                  <p>E-Book MRP: {book.eMrp}</p>
                  <p>Hardbound MRP: {book.hardMrp}</p>
                  <p>Rank Store MRP: {book.rankMrp}</p>
                </div>
                <div className="col-md-2 d-flex justify-content-around align-items-center">
                  <div className="book-cover-container">
                    <img
                      src={`${baseURL}/uploads/${book.cover_image}`}
                      alt={book.title}
                      className="img-fluid book-cover"
                    />
                  </div>
                  <div className="d-flex flex-column align-items-start gap-2">
                    <button
                      className="btn btn-info btn-sm mt-2"
                      onClick={() => fetchOrdersForBook(book._id)}
                    >
                      <BiDetail />
                    </button>
                    {userRole === "admin" && (
                      <>
                        <button
                          className="btn btn-warning btn-sm mt-2"
                          onClick={() => handleEditClick(book)}
                        >
                          <BiEdit />
                        </button>
                        <button
                          className="btn btn-danger btn-sm mt-2"
                          onClick={() => handleDeleteClick(book._id)}
                        >
                          <BiTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {userRole === "admin" && (
                <>
                  <div className="row mt-3">
                    <div className="col-md-3 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Order ID"
                        value={orderInputs[book._id]?.orderId || ""}
                        onChange={(e) =>
                          handleOrderInputChange(
                            book._id,
                            "orderId",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-md-3 col-6 mb-2">
                      <select
                        className="form-control"
                        value={orderInputs[book._id]?.channel || ""}
                        onChange={(e) =>
                          handleOrderInputChange(
                            book._id,
                            "channel",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select Channel</option>
                        <option value="Amazon">Amazon</option>
                        <option value="Flipkart">Flipkart</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-2 col-6 mb-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Qty"
                        value={orderInputs[book._id]?.qty || ""}
                        onChange={(e) =>
                          handleOrderInputChange(
                            book._id,
                            "qty",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-md-3 col-6 mb-2">
                      <input
                        type="date"
                        className="form-control"
                        value={orderInputs[book._id]?.createdAt || ""}
                        onChange={(e) =>
                          handleOrderInputChange(
                            book._id,
                            "createdAt",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-md-1 col-6 mb-2">
                      <button
                        className="btn btn-success w-100"
                        onClick={() => handleAddOrder(book._id)}
                      >
                        <BiBookAdd />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No books found.</p>
      )}

      {showModal && (
        <div
          className="modal show"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {books.find((book) => book._id === selectedBookId)?.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Channel</th>
                      <th>Qty</th>
                      <th>Created At</th>
                      {userRole === "admin" && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {bookOrders.length > 0 ? (
                      bookOrders.map((order) => (
                        <tr key={order._id}>
                          <td>{order.orderId}</td>
                          <td>{order.channel}</td>
                          <td>{order.qty}</td>
                          <td>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          {userRole === "admin" && (
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(order._id)}
                              >
                                <BiTrash />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No orders found for this book.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
