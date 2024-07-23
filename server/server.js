const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Update the connection string with the correct database name
const uri = "mongodb+srv://tksomar:oSFHSfv3xzt2AlCg@cluster0.c3medvz.mongodb.net/yourdatabase?retryWrites=true&w=majority";

// Connect to MongoDB using mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a MongoDB schema and model for your items
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  image: String,
});

const Item = mongoose.model('Item', itemSchema);

// Fetch Items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create Item
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
