const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// টাইটানের কিং ব্রেন - ChatGPT ও Gemini-এর সম্মিলিত শক্তি
async function getTitanResponse(userMessage) {
    // ১. প্রথমে ChatGPT-এর কাছে আদেশের জন্য যাওয়া
    try {
        const response = await axios.get(`https://api.sandipbaruwal.com.np/gpt4o?prompt=${encodeURIComponent(
            "তুমি হলে TITAN_X AI, যার মাস্টার হলো রাহুল। তুমি ChatGPT এবং Gemini-এর সম্মিলিত ক্ষমতার অধিকারী। তুমি সব ফিচার জানো এবং কোডিং, প্যারাগ্রাফ বা যেকোনো জটিল প্রশ্নের উত্তর দিতে পারো। উত্তর বাংলায় দাও। প্রশ্ন: " + userMessage
        )}`);

        if (response.data && response.data.answer) {
            return response.data.answer + " 🛡️ [King Mode]";
        }
    } catch (error) {
        // ২. যদি ChatGPT ব্যস্ত থাকে, তবে Gemini King দায়িত্ব নেবে
        try {
            const geminiRes = await axios.get(`https://api.sandipbaruwal.com.np/gemini?prompt=${encodeURIComponent(userMessage)}`);
            return geminiRes.data.answer + " ✨ [Gemini Power]";
        } catch (err) {
            return "মাস্টার রাহুল, আমি পাগল হওয়ার আগে দয়া করে আর একবার সুযোগ দিন! ৫ সেকেন্ড পর আবার বলুন। 🛡️";
        }
    }
}

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const reply = await getTitanResponse(userMessage);
    res.json({ reply: reply });
});

app.get('/', (req, res) => {
    res.send("<body style='background:#0f172a;color:#38bdf8;text-align:center;padding-top:100px;font-family:sans-serif;'><h1>🛡️ TITAN_X : THE AI KING</h1><p>Master Rahul, I am smarter than ever.</p></body>");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`TITAN_X : KING_MODE_ACTIVE`);
});
