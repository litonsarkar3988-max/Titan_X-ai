const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ১. টাইটানের নতুন শক্তিশালী ব্রেন ফাংশন
async function getTitanResponse(userMessage) {
    const currentTime = new Date().toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' });
    
    // নতুন এবং সচল মডেলের লিস্ট
    const apiConfigs = [
        { model: "gpt-4o-mini", system: "তুমি মাস্টার রাহুলের তৈরি TITAN_X AI। সব উত্তর বাংলায় দাও।" },
        { model: "llama-3.1-70b", system: "তুমি TITAN_X AI। তুমি একজন সুপার ইন্টেলিজেন্ট রোবট।" }
    ];

    for (let config of apiConfigs) {
        try {
            // নতুন API এন্ডপয়েন্ট ব্যবহার করা হয়েছে
            const response = await axios.get(`https://delirius-api-official.vercel.app/ia/gpt4?text=${encodeURIComponent(userMessage)}`);

            if (response.data && response.data.data) {
                return response.data.data; // সরাসরি উত্তর রিটার্ন করবে
            }
        } catch (error) {
            console.log(`Trying alternative brain...`);
            continue; 
        }
    }
    return "মাস্টার রাহুল, সিস্টেম রিলোড হচ্ছে। দয়া করে ৫ সেকেন্ড পর আবার মেসেজ দিন। 🛡️";
}

// ২. চ্যাট রুট
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) return res.json({ reply: "বলুন মাস্টার রাহুল!" });

    const reply = await getTitanResponse(userMessage);
    res.json({ reply: reply });
});

// ৩. হোম পেজ ডিজাইন
app.get('/', (req, res) => {
    res.send(`<body style="background:#0f172a;color:#38bdf8;text-align:center;padding-top:100px;font-family:sans-serif;">
        <h1>🛡️ TITAN_X AI : ONLINE</h1>
        <p>Created by Master Rahul</p>
    </body>`);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`TITAN_X FIXED : Port ${PORT}`);
});

// ৪. Self-Ping (জাগিয়ে রাখা)
setInterval(() => {
    axios.get('https://titan-x-server.onrender.com').catch(() => {});
}, 600000);
