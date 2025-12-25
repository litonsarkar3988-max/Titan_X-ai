const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// টাইটানের মূল চ্যাট রুট
app.post('/chat', async (req, res) => {
    const userMsg = req.body.message;
    
    // আপাতত একটি সাধারণ উত্তর (পরে এখানে Gemini AI যোগ করা যাবে)
    let botReply = "মাস্টার রাহুল, আমি আপনার মেসেজটি পেয়েছি। আপনার সার্ভার এখন কাজ করছে!";
    
    res.json({ reply: botReply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
