import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  BiArrowBack,
  BiSolidArrowToTop,
  BiSolidArrowToBottom,
  BiSkipPrevious,
  BiSkipNext,
  BiListUl,
  BiMoneyWithdraw,
  BiUser
} from "react-icons/bi";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const token = localStorage.getItem("adminToken");
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/authors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuthors(res.data);
      } catch (err) {
        toast.error("Failed to fetch authors.");
      }
    };
  
    fetchAuthors();
  }, []);   

  // 🔹 Image Click Handler
  const openImageModal = (image) => {
    setModalImage(image);
    setModalIsOpen(true);
  };

  // 🔹 Filter Data Based on Search Input
  const filteredAuthors = useMemo(() => {
    return authors.filter((author) => {
      return (
        (author?.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (author?.first_book_name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (author?.sku || "").toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search, authors]);

  // 🔹 Table Columns
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "SNo", cell: ({ row }) => row.index + 1 },
      // { accessorKey: "sku", header: "SKU Code" },
      {
        accessorKey: "image_path",
        header: "Profile",
        cell: ({ getValue }) => {
          const imageSrc = getValue()
            ? getValue()
            : "assets/images/avatars/01.png";

          return (
            <img
              src={imageSrc}
              width="50"
              height="50"
              style={{ borderRadius: "50%", cursor: "pointer" }}
              alt="Profile"
              onClick={() => openImageModal(imageSrc)} // Click to Open Modal
            />
          );
        },
      },      
      {
        accessorKey: "name",
        header: "Author Name",
        cell: ({ getValue }) => (
          <span className="truncate-text" title={getValue()}>
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => (
          <a href={`mailto:${getValue()}`} className="nav-link">
            {getValue()}
          </a>
        ),
      },
      {
        accessorKey: "contact_no",
        header: "Contact",
        cell: ({ getValue }) => (
          <a href={`tel:+91${getValue()}`} className="nav-link">
            {getValue()}
          </a>
        ),
      },
      {
        accessorKey: "first_book_name",
        header: "First Book",
        cell: ({ getValue }) => (
          <span className="truncate-text" title={getValue()}>
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "password",
        header: "Password",
        cell: ({ getValue }) => (
          <span className="truncate-text" title={getValue()}>
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "_id",
        header: "Actions",
        cell: ({ getValue }) => {
          const authorId = getValue();
          return (
            <div className="d-flex gap-2">
              <Link to={`/authors/${authorId}`} className="btn btn-warning">
                <BiSkipNext />
              </Link>
              <Link to={`/books/${authorId}`} className="btn btn-primary">
                <BiListUl />
              </Link>
              <Link to={`/transactions/${authorId}`} className="btn btn-success">
                <BiMoneyWithdraw />
              </Link>
            </div>
          );
        },
      },      
    ],
    []
  );

  const table = useReactTable({
    data: filteredAuthors,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 25 }, // 🔹 Default 30 authors per page
    },
  });

  return (
    <main className="main-wrapper">
      <div className="main-content">
        {/* ✅ Toast Notification Container */}
        <ToastContainer />
        <div className="page-breadcrumb d-sm-flex align-items-center justify-content-between mb-3">
          {/* Left Side: Author List & Home */}
          <div className="d-flex align-items-center">
            <div className="breadcrumb-title pe-3 text-uppercase">
              Author List
            </div>
            <a href="/add-author" className="btn btn-primary btn-sm"><BiUser /></a>
          </div>

          {/* Right Side: Search & Back Button */}
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control me-3"
              placeholder="Search Author Name, SKU Code, Email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "250px" }}
            />
            <button
              className="btn btn-danger rounded-circle"
              onClick={() => window.history.back()}
            >
              <BiArrowBack />
            </button>

          </div>
        </div>

        {/* 🔹 Author Table */}
        <div className="card mt-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-primary">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          style={{ cursor: "pointer" }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getIsSorted() === "asc" ? (
                            <BiSolidArrowToTop />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <BiSolidArrowToBottom />
                          ) : (
                            ""
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 🔹 Pagination Controls */}
            <div className="d-flex justify-content-between mt-3">
              <button
                className={`btn btn-sm ${
                  table.getCanPreviousPage() ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <BiSkipPrevious /> Back
              </button>
              <span>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
              <button
                className={`btn btn-sm ${
                  table.getCanNextPage() ? "btn-success" : "btn-secondary"
                }`}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next <BiSkipNext />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="image-modal"
        overlayClassName="overlay-modal"
      >
        <div className="modal-content">
          <img src={modalImage} alt="Profile Large" className="modal-image" />
          <button
            className="btn btn-danger close-btn"
            onClick={() => setModalIsOpen(false)}
          >
            X
          </button>
        </div>
      </Modal>
    </main>
  );
}
