import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/items')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
import React, { useState } from 'react';
import axios from 'axios';

const AddItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/items', { name, description })
      .then((response) => {
        console.log('Item added:', response.data);
        setName('');
        setDescription('');
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditItemForm = ({ itemId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`/api/items/${itemId}`)
      .then((response) => {
        const { name, description } = response.data;
        setName(name);
        setDescription(description);
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
      });
  }, [itemId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/items/${itemId}`, { name, description })
      .then((response) => {
        console.log('Item updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  return (
    <div>
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name
