import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const BookModal = ({ toggleModal, addBook, bookToEdit, authorId }) => {
  const [formData, setFormData] = useState({
    sku: "",
    isbn: "",
    author: "",
    authorId: authorId || "",
    title: "",
    subtitle: "",
    size: "",
    pages: "",
    color: "",
    cover: "",
    paperMrp: "",
    eMrp: "",
    rankMrp: "",
    paperBackRoyalty: "",
    rankStoreRoyalty: "",
    eRoyalty: "",
    cover_image: null,
    description: "",
    cat: "",
  });

  const [productionCost, setProductionCost] = useState(0);
  const [minimumSellingPrice, setMinimumSellingPrice] = useState(0);
  const [manualRoyaltyEdit, setManualRoyaltyEdit] = useState({
    paperBackRoyalty: false,
    rankStoreRoyalty: false,
    eRoyalty: false,
  });

  function useDebouncedValue(value, delay = 500) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebounced(value);
      }, delay);

      return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
  }

  const debouncedPaperMrp = useDebouncedValue(formData.paperMrp);
  const debouncedEMrp = useDebouncedValue(formData.eMrp);
  const debouncedPages = useDebouncedValue(formData.pages);
  const debouncedSize = useDebouncedValue(formData.size);

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
        rankMrp: bookToEdit.rankMrp || "",
        cover_image: null,
        description: bookToEdit.description || "",
        cat: bookToEdit.cat || "",
      });
    }
  }, [bookToEdit]);

  const getProductionCost = (size, pages, format = "Paperback") => {
    const pageCount = parseInt(pages);
    if (!size || !pageCount) return 0;

    let sizeKey = size.split("*")[0];
    let cost = 0;

    if (format === "Paperback") {
      if (sizeKey === "5") cost = 0.64 * pageCount + 9.5;
      else if (sizeKey === "6") cost = 0.78 * pageCount + 9.5;
      else if (sizeKey === "8") cost = 0.86 * pageCount + 9.5;
    }

    // Add more formats if needed

    return Math.round(cost);
  };

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (
      name === "paperBackRoyalty" ||
      name === "rankStoreRoyalty" ||
      name === "eRoyalty"
    ) {
      setManualRoyaltyEdit((prev) => ({
        ...prev,
        [name]: true,
      }));
    }
  };

  useEffect(() => {
    const pages = parseInt(debouncedPages);
    const size = debouncedSize;

    if (!size || !pages) return;

    const cost = getProductionCost(size, pages);
    const msp = cost * 2.3;

    setProductionCost(cost);
    setMinimumSellingPrice(Math.round(msp));

    if (debouncedPaperMrp) {
  const paperMrp = parseFloat(debouncedPaperMrp);

  // ✅ Rank Store Royalty logic (same as before)
  if (!manualRoyaltyEdit.rankStoreRoyalty) {
    const rankRoyalty = paperMrp - (paperMrp * 0.1 + cost);
    setFormData((prev) => ({
      ...prev,
      rankStoreRoyalty: Math.round(rankRoyalty),
    }));
  }

  // ✅ Corrected Paperback Royalty logic
  if (!manualRoyaltyEdit.paperBackRoyalty) {
    const paperBackRoyalty = paperMrp - (paperMrp * 0.4 + cost);
    setFormData((prev) => ({
      ...prev,
      paperBackRoyalty: Math.round(paperBackRoyalty),
    }));
  }
}


    if (debouncedEMrp && !manualRoyaltyEdit.eRoyalty) {
      const eRoyalty = parseFloat(debouncedEMrp) * 0.3;
      setFormData((prev) => ({
        ...prev,
        eRoyalty: Math.round(eRoyalty),
      }));
    }
  }, [
    debouncedPages,
    debouncedSize,
    debouncedPaperMrp,
    debouncedEMrp,
    manualRoyaltyEdit,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "cover_image" && !formData[key]) return;
      data.append(key, formData[key]);
    });
    data.append("productionCost", productionCost);
    data.append("minimumSellingPrice", minimumSellingPrice);

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
                      placeholder="RPH"
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
                    <select
                      name="size"
                      className="form-control"
                      value={formData.size}
                      onChange={handleChange}
                    >
                      <option value="">Select Size</option>
                      <option value="5*8">5*8</option>
                      <option value="6*9">6*9</option>
                      <option value="8*11">8*11</option>
                    </select>
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

                  <div className="mb-3">
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <select
                      name="cat"
                      className="form-control"
                      value={formData.cat}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Non-Fiction">Non-Fiction</option>
                      <option value="General">General</option>
                      <option value="Education">Education</option>
                      <option value="Biography">Biography</option>
                      <option value="Academic">Academic</option>
                      <option value="Poetry">Poetry</option>
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                      <option value="Comics">Comics</option>
                      <option value="Social">Social</option>
                      <option value="Others">Others</option>
                    </select>
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
                      name="paperBackRoyalty"
                      className="form-control"
                      placeholder="Paper Back Royalty"
                      value={formData.paperBackRoyalty}
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
                      type="number"
                      name="eRoyalty"
                      className="form-control"
                      placeholder="Ebook Royalty"
                      value={formData.eRoyalty}
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
                      type="number"
                      name="rankStoreRoyalty"
                      className="form-control"
                      placeholder="Rank Store Royalty"
                      value={formData.rankStoreRoyalty}
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
                          src={bookToEdit.cover_image}
                          alt={bookToEdit.title}
                          width="100"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <p>
                      <strong>Production Cost:</strong> ₹{productionCost}
                    </p>
                    <p>
                      <strong>Minimum Selling Price (MSP):</strong> ₹
                      {minimumSellingPrice}
                    </p>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100">
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
