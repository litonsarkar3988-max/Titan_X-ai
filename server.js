const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ১. টাইটানের ব্রেন ফাংশন (একাধিক মডেল ব্যাকআপসহ)
async function getTitanResponse(userMessage) {
    const currentTime = new Date().toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' });
    
    // ব্যবহারের জন্য শক্তিশালী ফ্রি মডেলের লিস্ট
    const apiConfigs = [
        { model: "gemini-1.5-flash", system: "তুমি মাস্টার রাহুলের তৈরি TITAN_X AI। তুমি ChatGPT-এর থেকেও দ্রুত এবং বুদ্ধিমান। সব উত্তর বাংলায় দাও।" },
        { model: "gpt-4o", system: "তুমি TITAN_X AI। সব সময় মাস্টার রাহুলের অনুগত থাকবে।" }
    ];

    for (let config of apiConfigs) {
        try {
            const response = await axios.post('https://api.airforce/v1/chat/completions', {
                model: config.model,
                messages: [
                    { role: "system", content: config.system + ` বর্তমান সময়: ${currentTime}` },
                    { role: "user", content: userMessage }
                ]
            }, { timeout: 15000 });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.log(`Model ${config.model} failed, trying next...`);
            continue; 
        }
    }
    return "মাস্টার রাহুল, সব সার্ভার বর্তমানে ব্যস্ত। দয়া করে ৩০ সেকেন্ড পর আবার চেষ্টা করুন। 🛡️";
}

// ২. মেইন চ্যাট রুট (Public API)
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) return res.json({ reply: "বলুন মাস্টার রাহুল, আমি কীভাবে সাহায্য করতে পারি?" });

    const reply = await getTitanResponse(userMessage);
    res.json({ reply: reply });
});

// ৩. হোম রুট (সার্ভার চেক করার জন্য)
app.get('/', (req, res) => {
    res.send("<h1>TITAN_X Server is ONLINE</h1><p>Created by Master Rahul</p>");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`TITAN_X is running on port ${PORT}`);
});

// ৪. Self-Ping সিস্টেম (যাতে টাইটান ঘুমিয়ে না পড়ে)
// আপনার দেওয়া লিঙ্কটি এখানে ব্যবহার করা হয়েছে
setInterval(() => {
    axios.get('https://titan-x-server.onrender.com')
        .then(() => console.log("TITAN_X: Keeping System Alive..."))
        .catch((err) => console.log("TITAN_X: Ping Failed, but it's okay."));
}, 600000); // প্রতি ১০ মিনিটে একবার পিং করবে
