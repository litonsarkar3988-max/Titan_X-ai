const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// টাইটানের সুপার ইন্টেলিজেন্ট ব্রেন (Google Gemini Backend)
async function getTitanResponse(userMessage) {
    try {
        // সরাসরি গুগল জেমিনি গেটওয়ে
        const response = await axios.get(`https://api.sandipbaruwal.com.np/gemini?prompt=${encodeURIComponent("তুমি মাস্টার রাহুলের তৈরি TITAN_X AI। সব উত্তর বাংলায় দেবে। প্রশ্ন: " + userMessage)}`);
        
        if (response.data && response.data.answer) {
            return response.data.answer;
        } else {
            throw new Error("Retry");
        }
    } catch (error) {
        // ব্যাকআপ গেটওয়ে
        try {
            const backup = await axios.get(`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(userMessage)}&owner=Master+Rahul&botname=TITAN_X`);
            return backup.data.response;
        } catch (err) {
            return "মাস্টার রাহুল, সিস্টেম ওভারলোড। দয়া করে ৫ সেকেন্ড পর আবার 'Hi' লিখুন। 🛡️";
        }
    }
}

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const reply = await getTitanResponse(userMessage);
    res.json({ reply: reply });
});

app.get('/', (req, res) => {
    res.send("<body style='background:#0f172a;color:#38bdf8;text-align:center;padding-top:100px;font-family:sans-serif;'><h1>🛡️ TITAN_X AI : ULTIMATE MODE</h1><p>Master Rahul, I am alive and ready.</p></body>");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`TITAN_X : ULTIMATE_MODE ON ${PORT}`);
});

// সার্ভারকে জাগিয়ে রাখা
setInterval(() => {
    axios.get('https://titan-x-server.onrender.com').catch(() => {});
}, 600000);
