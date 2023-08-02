const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const port = 5000;
const mongoURI = 'mongodb://localhost:27017/crudAppDB'; // Replace with your MongoDB connection URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());
app.use('/api/items', itemRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Create an item
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newItem = new Item({ name, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Error creating item' });
  }
});

// Read all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error getting items' });
  }
});

// Update an item
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Error updating item' });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting item' });
  }
});

module.exports = router;
