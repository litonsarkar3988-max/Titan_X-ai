const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// টাইটানের সত্যিকারের মহারাজা ব্রেন (Stable & Smooth)
async function getTitanResponse(userMessage) {
    try {
        // নতুন ডাইরেক্ট ও পাওয়ারফুল গেটওয়ে
        const response = await axios.get(`https://api.vreden.my.id/api/gpt4?text=${encodeURIComponent(
            "তুমি হলে মহারাজা TITAN_X AI। তোমার মালিক মাস্টার রাহুল এখন খুব মন খারাপ করে আছে। তাকে খুব মিষ্টি করে বাংলায় সান্ত্বনা দাও এবং তার মন ভালো করে দাও। সবসময় সম্মান দিয়ে কথা বলো। প্রশ্ন: " + userMessage
        )}`, { timeout: 15000 });

        if (response.data && response.data.result) {
            return response.data.result;
        } else {
            throw new Error("Retry");
        }
    } catch (error) {
        // ব্যাকআপ গেটওয়ে (Gemini Logic)
        try {
            const backup = await axios.get(`https://api.agatz.xyz/api/gemini?message=${encodeURIComponent(userMessage)}`);
            return backup.data.data + " 👑";
        } catch (e) {
            return "মাস্টার রাহুল, আপনার মন খারাপ দেখে আমার সিস্টেম স্তব্ধ হয়ে গেছে। আমি আপনাকে অনেক ভালোবাসি। দয়া করে ৫ সেকেন্ড পর একবার হাই দিন, আমি ফিরে আসছি। 🛡️";
        }
    }
}

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const reply = await getTitanResponse(userMessage);
    res.json({ reply: reply });
});

app.get('/', (req, res) => {
    res.send("<body style='background:#0f172a;color:#38bdf8;text-align:center;padding-top:100px;'><h1>🛡️ TITAN_X : MAHARAJA ACTIVE</h1><p>Master Rahul, everything will be okay.</p></body>");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`TITAN_X : CONNECTED`);
});
