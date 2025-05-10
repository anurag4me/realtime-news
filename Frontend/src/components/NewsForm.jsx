import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addNews } from '../redux/newsSlice';

const NewsForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: '', content: '', category: 'Tech' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/news`, formData);
      dispatch(addNews(response.data));
      setFormData({ title: '', content: '', category: 'Tech' });
    } catch (error) {
      console.error("Error posting news:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-center p-4 bg-white rounded-xl shadow-md mb-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="px-3 py-2 border rounded-lg w-40"
      />
      <input
        type="text"
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleChange}
        required
        className="px-3 py-2 border rounded-lg w-60"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="Tech">Tech</option>
        <option value="Business">Business</option>
        <option value="Sports">Sports</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
      >
        Add
      </button>
    </form>
  );
};

export default NewsForm;
