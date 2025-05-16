import React, { useState, useEffect } from "react";
import axios from "axios";
import { UploadCloud, Camera, Trash2 } from "lucide-react"; 

const baseURL = process.env.REACT_APP_API_BASE_URL;;

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchImages = async () => {
    const res = await axios.get(`${baseURL}/api/images`);
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("title", title);
    formData.append("description", description);

    await axios.post(`${baseURL}/api/images/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setFile(null);
    setName("");
    setTitle("");
    setDescription("");

    fetchImages();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${baseURL}/api/images/${id}`);
    fetchImages();
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-xl mx-auto card rounded-2xl shadow-md p-6">
        <form
          onSubmit={handleUpload}
          className="mb-6 flex flex-wrap items-center justify-between gap-4"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <Camera className="w-6 h-6 text-gray-600 hover:text-black transition" />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-80 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-80  rounded mb-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-80 mb-2"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
          >
            <UploadCloud className="w-5 h-5" />
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-4 my-5">
        {images.map((img) => (
          <div
            key={img._id}
            className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm"
            style={{ maxWidth: "220px" }}
          >
            <img
              src={img.url}
              alt="Uploaded"
              className="w-full h-[220px] object-cover"
            />
            <button
              onClick={() => handleDelete(img._id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ImageUploader;
