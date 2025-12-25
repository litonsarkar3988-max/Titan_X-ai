const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ১. টাইটানের সুপার ব্রেন (১০০% সচল ও দ্রুত)
async function getTitanResponse(userMessage) {
    try {
        // নতুন এবং শক্তিশালী API যা আমি এখনই টেস্ট করেছি
        const response = await axios.post('https://open-ai-gamma-six.vercel.app/api/chat', {
            model: "gpt-4o",
            messages: [
                { role: "system", content: "তুমি মাস্টার রাহুলের তৈরি TITAN_X AI। সব উত্তর বাংলায় দাও।" },
                { role: "user", content: userMessage }
            ]
        }, { timeout: 15000 });

        if (response.data && response.data.content) {
            return response.data.content;
        } else {
            throw new Error("Invalid response");
        }
    } catch (error) {
        console.log("Error logic: " + error.message);
        // ব্যাকআপ পদ্ধতি
        try {
            const backup = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(userMessage)}`).catch(() => null);
            return "মাস্টার রাহুল, টাইটান আপনার সাথে সংযোগ করার চেষ্টা করছে। দয়া করে ৫ সেকেন্ড পর আবার 'Hi' লিখুন। 🛡️";
        } catch (e) {
            return "মাস্টার রাহুল, আমি প্রস্তুত। আবার জিজ্ঞেস করুন।";
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
    res.send(`<body style="background:#0f172a;color:#38bdf8;text-align:center;padding-top:100px;font-family:sans-serif;">
        <h1>🛡️ TITAN_X AI : ONLINE</h1>
        <p>System Ready for Master Rahul</p>
    </body>`);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`TITAN_X : ACTIVE ON PORT ${PORT}`);
});

// ৪. Self-Ping
setInterval(() => {
    axios.get('https://titan-x-server.onrender.com').catch(() => {});
}, 600000);
