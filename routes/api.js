const express = require('express');
const router = express.Router();
// You might import your Mongoose models here, e.g., const MyModel = require('../models/MyModel');

// Example API endpoint
router.get('/message', (req, res) => {
  res.json({ message: 'Hello from the backend API!' });
});

// Example API endpoint to get data from MongoDB (after setting up a model)
router.get('/data', async (req, res) => {
    try {
        // Replace with your actual Mongoose model query
        // const data = await MyModel.find({});
        // res.json(data);
        res.json({ status: 'success', message: 'Data endpoint hit. Connect to MongoDB to fetch real data.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Server error fetching data.' });
    }
});

module.exports = router;