import React, { useState } from "react";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const AddTransactionForm = ({ onAdd }) => {
  const [data, setData] = useState({
    amount: "",
    type: "income",
    reference: "Anand",
    description: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.amount) return;
    const res = await axios.post(`${baseURL}/api/transactions`, data);
    onAdd(res.data);
    setData({ ...data, amount: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 card p-4 rounded shadow">
      <input
        type="number"
        name="amount"
        value={data.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full border p-2 rounded"
      />
      <select
        name="type"
        value={data.type}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select
        name="reference"
        value={data.reference}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option>Anand</option>
        <option>Ranu</option>
        <option>Rakesh</option>
        <option>Kalap</option>
      </select>
      <input
        type="text"
        name="description"
        value={data.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransactionForm;
