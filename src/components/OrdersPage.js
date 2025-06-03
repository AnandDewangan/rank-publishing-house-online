import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/payment`);
        setOrders(res.data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdate = async (orderId, status, trackingId) => {
    try {
      const res = await axios.put(`${baseURL}/api/payment/${orderId}`, {
        status,
        trackingId,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status, trackingId } : order
        )
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <div className="page-breadcrumb d-none d-sm-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <div className="breadcrumb-title pe-3 text-uppercase">
            Store Order
          </div>
        </div>
        <button
          className="btn btn-danger rounded-circle"
          onClick={() => window.history.back()}
        >
          <BiArrowBack />
        </button>
      </div>
      {orders.length === 0 && <p>No orders found.</p>}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Mobile</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Book(s)</th>
              <th style={thStyle}>Payment</th>
              <th style={thStyle}>QTY</th>
              <th style={thStyle}>View</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => { 
              const isExpanded = expandedOrderIds.includes(order._id);
              return (
                <React.Fragment key={order._id}>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={tdStyle}>{order.formData.name}</td>
                    <td style={tdStyle}>{order.formData.contact}</td>
                    <td style={tdStyle}>
                      {order.formData.address}, {order.formData.pincode}
                    </td>
                    <td style={tdStyle}>
                      {order.cartItems.map((item) => item.title).join(", ")}
                    </td>
                    <td style={tdStyle}>
                      {order.cartItems
                        .map((item) => `₹${item.rankMrp}`)
                        .join(", ")}
                    </td>
                    <td style={tdStyle}>
                      {order.cartItems.map((item) => item.quantity).join(", ")}
                    </td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => toggleExpand(order._id)}
                        style={{
                          padding: "5px 10px",
                          cursor: "pointer",
                          borderRadius: "4px",
                          border: "1px solid #007bff",
                          backgroundColor: isExpanded ? "#007bff" : "white",
                          color: isExpanded ? "white" : "#007bff",
                        }}
                      >
                        {isExpanded ? "Hide Details" : "View Details"}
                      </button>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr>
                      <td colSpan={7} style={{ padding: "1rem" }}>
                        <h4>Order Details</h4>
                        <p>
                          <strong>Order Date:</strong>{" "}
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <h5>Cart Items:</h5>
                        <ul>
                          {order.cartItems.map((item, idx) => (
                            <li key={idx}>
                              <strong>{item.title}</strong> by {item.author} —
                              Quantity: {item.quantity} — Price: ₹{item.rankMrp}
                            </li>
                          ))}
                        </ul>

                        <div style={{ marginTop: "1rem" }}>
                          <label>
                            <strong>Status:</strong>{" "}
                            <select
                              value={order.status || "Pending"}
                              onChange={(e) =>
                                handleUpdate(
                                  order._id,
                                  e.target.value,
                                  order.trackingId || ""
                                )
                              }
                              style={{ marginLeft: "10px" }}
                              className="bg-success rounded-md p-2"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </label>
                        </div>

                        <div style={{ marginTop: "0.5rem" }}>
                          <label>
                            <strong>Tracking ID:</strong>{" "}
                            <input
                              type="text"
                              value={order.trackingId || ""}
                              onChange={(e) =>
                                handleUpdate(
                                  order._id,
                                  order.status || "Pending",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Tracking ID"
                              className="bg-purple-500 rounded-md p-2"
                            />
                          </label>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    style={paginationBtnStyle}
  >
    Previous
  </button>

  {[...Array(totalPages)].map((_, index) => {
    const page = index + 1;
    return (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        style={{
          ...paginationBtnStyle,
          backgroundColor: currentPage === page ? "#007bff" : "white",
          color: currentPage === page ? "white" : "#007bff",
        }}
      >
        {page}
      </button>
    );
  })}

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    style={paginationBtnStyle}
  >
    Next
  </button>
</div>

      </div>
    </div>
  );
};

const thStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #ccc",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
  verticalAlign: "top",
};

const paginationBtnStyle = {
  padding: "6px 12px",
  margin: "0 4px",
  border: "1px solid #007bff",
  borderRadius: "4px",
  backgroundColor: "white",
  color: "#007bff",
  cursor: "pointer",
};


export default OrdersPage;
