const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ১. টাইটানের নতুন শক্তিশালী ব্রেন (Tested & Fixed)
async function getTitanResponse(userMessage) {
    try {
        // এই API টি অনেক বেশি নির্ভরযোগ্য এবং দ্রুত
        const response = await axios.get(`https://api.sandipbaruwal.com.np/gemini?prompt=${encodeURIComponent(userMessage)}`);
        
        if (response.data && response.data.answer) {
            return response.data.answer;
        } else {
            throw new Error("API Response Error");
        }
    } catch (error) {
        console.log("Gemini failed, trying Llama...");
        try {
            // ব্যাকআপ হিসেবে দ্বিতীয় এআই
            const backupRes = await axios.get(`https://api.sandipbaruwal.com.np/gpt4o?prompt=${encodeURIComponent(userMessage)}`);
            return backupRes.data.answer || "মাস্টার রাহুল, আমি একটু ক্লান্ত। দয়া করে আবার মেসেজ দিন।";
        } catch (err) {
            return "মাস্টার রাহুল, সার্ভারে সমস্যা হচ্ছে। দয়া করে ৩০ সেকেন্ড পর চেষ্টা করুন। 🛡️";
        }
    }
}

// ২. চ্যাট রুট
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) return res.json({ reply: "বলুন মাস্টার রাহুল!" });

    const reply = await getTitanResponse(userMessage);
    res.json({ reply: reply });
});

// ৩. হোম পেজ
app.get('/', (req, res) => {
    res.send(`
        <body style="background:#0f172a;color:#38bdf8;text-align:center;padding-top:100px;font-family:sans-serif;">
            <h1>🛡️ TITAN_X AI : ONLINE</h1>
            <p>Master Rahul, System is ready to serve you.</p>
        </body>
    `);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`TITAN_X : RUNNING ON PORT ${PORT}`);
});

// ৪. Self-Ping (জাগিয়ে রাখা)
setInterval(() => {
    axios.get('https://titan-x-server.onrender.com').catch(() => {});
}, 600000);
