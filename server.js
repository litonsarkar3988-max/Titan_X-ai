const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// ১. বেসিক কনফিগারেশন
app.use(cors());
app.use(express.json());

// ২. টাইটানের ব্রেন ফাংশন (Smart Model Switching)
async function getTitanResponse(userMessage) {
    const currentTime = new Date().toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' });
    
    // ব্যবহারের জন্য শক্তিশালী ফ্রি মডেলের লিস্ট
    const apiConfigs = [
        { 
            model: "gemini-1.5-flash", 
            system: "তুমি মাস্টার রাহুলের তৈরি TITAN_X AI। তুমি ChatGPT-এর থেকেও বুদ্ধিমান। সব উত্তর বাংলায় দাও।" 
        },
        { 
            model: "gpt-4o", 
            system: "তুমি TITAN_X AI। তুমি একজন সুপার ইন্টেলিজেন্ট রোবট। সব উত্তর বাংলায় দাও।" 
        }
    ];

    for (let config of apiConfigs) {
        try {
            const response = await axios.post('https://api.airforce/v1/chat/completions', {
                model: config.model,
                messages: [
                    { 
                        role: "system", 
                        content: `${config.system} বর্তমান সময়: ${currentTime}। তোমার মালিকের নাম মাস্টার রাহুল।` 
                    },
                    { role: "user", content: userMessage }
                ]
            }, { timeout: 15000 }); // ১৫ সেকেন্ড সময়সীমা

            if (response.data && response.data.choices && response.data.choices[0].message) {
                return response.data.choices[0].message.content;
            }
        } catch (error) {
            console.log(`Model ${config.model} busy, switching...`);
            continue; // যদি একটি ফেল করে তবে পরেরটি চেষ্টা করবে
        }
    }
    return "মাস্টার রাহুল, বর্তমানে সব এআই কোর (AI Core) ব্যস্ত আছে। অনুগ্রহ করে ৩০ সেকেন্ড পর আবার কমান্ড দিন। 🛡️";
}

// ৩. মেইন চ্যাট রুট (Public API)
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) {
            return res.json({ reply: "বলুন মাস্টার রাহুল, আমি কীভাবে সাহায্য করতে পারি?" });
        }

        const reply = await getTitanResponse(userMessage);
        res.json({ reply: reply });
    } catch (globalError) {
        res.json({ reply: "সিস্টেমে একটি ছোট সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।" });
    }
});

// ৪. হোম রুট (সার্ভার স্ট্যাটাস চেক)
app.get('/', (req, res) => {
    res.send(`
        <body style="background-color: #0f172a; color: #38bdf8; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
            <h1 style="border-bottom: 2px solid #38bdf8; padding-bottom: 10px;">TITAN_X Server is ONLINE</h1>
            <p style="color: #94a3b8;">Created by Master Rahul</p>
            <div style="margin-top: 20px; font-size: 14px; color: #4ade80;">System Status: Secure & Optimal</div>
        </body>
    `);
});

// ৫. সার্ভার লিসেনিং
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`TITAN_X : ONLINE on Port ${PORT}`);
});

// ৬. Self-Ping সিস্টেম (সার্ভারকে জাগিয়ে রাখা)
setInterval(() => {
    axios.get('https://titan-x-server.onrender.com')
        .then(() => console.log("TITAN_X: Heartbeat Sent... System Alive."))
        .catch((err) => console.log("TITAN_X: Ping Failed, but I am trying."));
}, 600000); // প্রতি ১০ মিনিটে একবার পিং করবে
