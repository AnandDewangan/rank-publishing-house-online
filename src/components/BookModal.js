import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BiBookAdd, BiEdit } from "react-icons/bi";

const BookModal = ({ toggleModal, addBook, bookToEdit, authorId }) => {
  const [formData, setFormData] = useState({
    sku: "",
    isbn: "",
    author: "",
    authorId: authorId,
    title: "",
    subtitle: "",
    size: "",
    pages: "",
    color: "",
    cover: "",
    paperMrp: "",
    eMrp: "",
    hardMrp: "",
    rankMrp: "",
    cover_image: null,
  });
  const baseURL = "http://localhost:5000";

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        sku: bookToEdit.sku || "",
        isbn: bookToEdit.isbn || "",
        author: bookToEdit.author || "",
        authorId: authorId,
        title: bookToEdit.title || "",
        subtitle: bookToEdit.subtitle || "",
        size: bookToEdit.size || "",
        pages: bookToEdit.pages || "",
        color: bookToEdit.color || "",
        cover: bookToEdit.cover || "",
        paperMrp: bookToEdit.paperMrp || "",
        eMrp: bookToEdit.eMrp || "",
        hardMrp: bookToEdit.hardMrp || "",
        rankMrp: bookToEdit.rankMrp || "",
        cover_image: null,
      });
    }
  }, [bookToEdit]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        cover_image: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // ✅ Skip empty file if not selected
    Object.keys(formData).forEach((key) => {
      if (key === "cover_image" && !formData[key]) return;
      data.append(key, formData[key]);
    });

    const url = bookToEdit
      ? `${baseURL}/api/books/update-book/${bookToEdit._id}`
      : `${baseURL}/api/books/add-book`;

    const method = bookToEdit ? "put" : "post";

    try {
      const response = await axios({
        method,
        url,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      addBook(response.data.newBook);
      toggleModal();
      toast.success(`Book ${bookToEdit ? "updated" : "added"} successfully!`);
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error(`Error ${bookToEdit ? "updating" : "adding"} book.`);
    }
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog modal-lg">
        {" "}
        {/* Large Modal */}
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {bookToEdit ? "Edit Book" : "Add New Book"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={toggleModal}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* First Column */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      name="sku"
                      className="form-control"
                      placeholder="SKU"
                      value={formData.sku}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="isbn"
                      className="form-control"
                      placeholder="ISBN"
                      value={formData.isbn}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="author"
                      className="form-control"
                      placeholder="Author"
                      value={formData.author}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="subtitle"
                      className="form-control"
                      placeholder="Sub Title"
                      value={formData.subtitle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="size"
                      className="form-control"
                      placeholder="Size"
                      value={formData.size}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="pages"
                      className="form-control"
                      placeholder="No of Pages"
                      value={formData.pages}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Second Column */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      name="color"
                      className="form-control"
                      placeholder="Paper Color"
                      value={formData.color}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="cover"
                      className="form-control"
                      placeholder="Cover Lamination"
                      value={formData.cover}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="paperMrp"
                      className="form-control"
                      placeholder="Paper Back MRP"
                      value={formData.paperMrp}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="eMrp"
                      className="form-control"
                      placeholder="E-Book MRP"
                      value={formData.eMrp}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="hardMrp"
                      className="form-control"
                      placeholder="Hardbound MRP"
                      value={formData.hardMrp}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="rankMrp"
                      className="form-control"
                      placeholder="Rank Store MRP"
                      value={formData.rankMrp}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="file"
                      name="cover_image"
                      className="form-control"
                      placeholder="Cover Image"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />

                    {/* Show preview for editing */}
                    {bookToEdit && bookToEdit.cover_image && (
                      <div className="mt-2">
                        <img
                          src={bookToEdit.cover_image} // ✅ direct URL (from DB, e.g., Cloudinary or static)
                          alt={bookToEdit.title}
                          width="100"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100">
                {bookToEdit ? <BiEdit /> : <BiBookAdd />}{" "}
                {bookToEdit ? "Update Book" : "Add Book"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
