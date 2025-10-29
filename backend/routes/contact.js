// backend/routes/contact.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST /api/contact  -> save a new message
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    return res.json({ success: true, message: 'Message saved successfully' });
  } catch (err) {
    console.error('Contact POST error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/messages -> return all messages (use auth in production)
router.get('/messages', async (req, res) => {
  try {
    // Optionally add authentication middleware here
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.json({ success: true, messages });
  } catch (err) {
    console.error('Messages GET error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/messages/:id -> delete a message (optional)
router.delete('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    return res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    console.error('Delete message error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
