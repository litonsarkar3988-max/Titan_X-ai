const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // এটি একটি ওপেন সোর্স ফ্রি এআই গেটওয়ে যা শক্তিশালী সব মডেল (Llama 3, GPT, Mistral) ব্যবহার করে
        const response = await axios.post('https://api.airforce/v1/chat/completions', {
            model: "llama-3-70b-instruct", // এটি চ্যাটজিপিটির চেয়েও অনেক ক্ষেত্রে শক্তিশালী
            messages: [
                { role: "system", content: "You are TITAN_X AI, the most powerful AI assistant created by Master Rahul. Your personality is helpful, fast, and genius. Always answer in Bengali." },
                { role: "user", content: userMessage }
            ]
        });

        const reply = response.data.choices[0].message.content;
        res.json({ reply: reply });

    } catch (error) {
        console.error("Error with TITAN_X AI:", error.message);
        res.json({ reply: "মাস্টার রাহুল, ফ্রি সার্ভারটি বর্তমানে ব্যস্ত। অনুগ্রহ করে ১ মিনিট পর আবার কমান্ড দিন।" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`TITAN_X : ONLINE on Port ${PORT}`);
});
