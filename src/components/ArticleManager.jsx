 import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseURL}/api/articles`;

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    topic: "",
    date: "",
    description: "",
    image: null,
  }); 

  const fetchArticles = async () => {
    const res = await axios.get(API_URL);
    setArticles(res.data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("topic", formData.topic);
    data.append("date", formData.date);
    data.append("description", formData.description);
    data.append("image", formData.image);

    await axios.post(API_URL, data);
    setFormData({ topic: "", date: "", description: "", image: null });
    fetchArticles();
  };

  const deleteArticle = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchArticles();
  };

  return (
    <main className="main-wrapper">
      <div className="main-content">
        <div className="container mt-4">
          <h2>Add New Article</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label>Topic</label>
              <input
                type="text"
                name="topic"
                className="form-control"
                value={formData.topic}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label>Image</label>
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={handleChange}
                accept="image/*"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Article
            </button>
          </form>

          <hr />
          <h3>All Articles</h3>
          <div className="row">
            {articles.map((article) => (
              <div key={article._id} className="col-md-4 mb-4">
              <div className="card position-relative">
                <div style={{ position: "relative" }}>
                  <img
                    src={article.image}
                    className="card-img-top"
                    alt={article.topic}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <h5
                    className="position-absolute top-0 start-0 bg-slate-500 text-white p-2 m-2 rounded"
                    style={{ fontSize: "1rem" }}
                  >
                    {article.topic}
                  </h5>
                  <FaTrash
                    className="position-absolute top-0 end-0 text-white bg-danger p-2 m-2 rounded"
                    style={{ cursor: "pointer", fontSize: "2rem" }}
                    onClick={() => deleteArticle(article._id)}
                    title="Delete Article"
                  />
                </div>
                <div className="card-body">
                  <p className="card-text">{article.description}</p>
                  <small>{new Date(article.date).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArticleManager;
