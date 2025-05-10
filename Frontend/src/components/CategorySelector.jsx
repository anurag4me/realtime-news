import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/newsSlice";

const categories = ["All", "Sports", "Business", "Technology", "Entertainment"];

const CategorySelector = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.news.category);

  const handleCategoryChange = (e) => {
    const value = e.target.value === "All" ? null : e.target.value;
    dispatch(setCategory(value));
  };

  return (
    <div className="mb-6">
      <label htmlFor="category" className="block text-lg font-medium text-gray-700">
        Filter by Category
      </label>
      <select
        id="category"
        value={currentCategory || "All"}
        onChange={handleCategoryChange}
        className="mt-2 px-4 pr-10 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20fill%3D%22%23666%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat} className="text-gray-700">
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;