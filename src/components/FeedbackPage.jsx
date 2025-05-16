import { useEffect, useState } from "react";
import axios from "axios";
import { User, MessageCircle, Send, Trash2 } from "lucide-react"; 

const baseURL = process.env.REACT_APP_API_BASE_URL;;

const FeedbackPage = () => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/feedbacks`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author || !message) return;

    try {
      await axios.post(`${baseURL}/api/feedbacks`, {
        author,
        message,
      });
      setAuthor("");
      setMessage("");
      fetchFeedbacks();
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/feedbacks/${id}`);
      fetchFeedbacks();
    } catch (err) {
      console.error("Error deleting feedback:", err);
    }
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto card p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
          Share Your Thoughts
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border-b border-gray-200 pb-6 mb-6"
        >
          <div className="relative">
            <User className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Your Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="relative">
            <MessageCircle className="absolute top-3 left-3 text-gray-400" />
            <textarea
              placeholder="Write your feedback..."
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            <Send className="w-4 h-4" /> Submit
          </button>
        </form>
      </div>
      {/* Feedback List */}
      <h2 className="text-xl font-semibold">What Others Say</h2>
      <div className="space-y-4 mb-5">
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">
            No feedback yet. Be the first to share!
          </p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <p className="font-bold text-blue-600">{fb.author}</p>
                <p className="text-gray-700">{fb.message}</p>
              </div>
              <button
                onClick={() => handleDelete(fb._id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default FeedbackPage;
