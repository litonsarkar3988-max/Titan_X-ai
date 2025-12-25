const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    // শক্তিশালী ফ্রি মডেলের তালিকা (একটি কাজ না করলে অন্যটি চলবে)
    const models = [
        "gpt-4o", 
        "llama-3.1-70b-chat", 
        "mixtral-8x7b-instruct"
    ];

    let success = false;
    let reply = "";

    for (let modelName of models) {
        try {
            const response = await axios.post('https://api.airforce/v1/chat/completions', {
                model: modelName,
                messages: [
                    { role: "system", content: "তুমি মাস্টার রাহুলের পার্সোনাল এআই TITAN_X। তুমি অত্যন্ত বুদ্ধিমান এবং বিনয়ী। সব সময় বাংলায় উত্তর দাও।" },
                    { role: "user", content: userMessage }
                ]
            }, { timeout: 10000 }); // ১০ সেকেন্ড সময়সীমা

            reply = response.data.choices[0].message.content;
            success = true;
            break; // উত্তর পেয়ে গেলে লুপ বন্ধ হবে
        } catch (error) {
            console.log(`Model ${modelName} failed, trying next...`);
        }
    }

    if (success) {
        res.json({ reply: reply });
    } else {
        res.json({ reply: "মাস্টার রাহুল, সব ফ্রি সার্ভার বর্তমানে ব্যস্ত। অনুগ্রহ করে ৩০ সেকেন্ড পর আবার চেষ্টা করুন। 🛡️" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`TITAN_X : ONLINE`);
});
