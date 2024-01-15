import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';


const Main = ({ onCategoryAdded, onCategoryUpdated, selectedCategory, setSelectedCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.categoryName);
    } else {
      setCategoryName('');
    }
  }, [selectedCategory]);

  const handleSave = async () => {
    try {
      if (selectedCategory) {
        // Update category
        await axios.put(
          `${API_BASE_URL}/category/${selectedCategory._id}`,
          { categoryName },
          { headers: { Authorization: localStorage.getItem('token') } }
        );
        onCategoryUpdated();
      } else {
        // Add new category
        await axios.post(
          `${API_BASE_URL}/category`,
          { categoryName },
          { headers: { Authorization: localStorage.getItem('token') } }
        );
        onCategoryAdded();
      }
      setCategoryName('');
      setSelectedCategory(null);
    } catch (error) {
      console.error('Failed to save category:', error.message);
    }
  };

  return (
    <div>
      <h2>{selectedCategory ? 'Update Category' : 'Add New Category'}</h2>
      <input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button onClick={handleSave}>{selectedCategory ? 'Update' : 'Add'}</button>
    </div>
  )
}

export default Main;


