const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // এটি রেন্ডারে দরকার হবে

const app = express();
app.use(cors());
app.use(bodyParser.json());

const GROQ_API_KEY = "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"; 

app.post('/chat', async (req, res) => {
    const userMsg = req.body.message;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", // এটি খুব দ্রুত কাজ করে
                messages: [
                    { role: "system", content: "তুমি টাইটান এক্স (TITAN_X) এআই। তোমার নির্মাতা মাস্টার রাহুল সরকার। তুমি খুব বিনয়ী এবং বুদ্ধিমান।" },
                    { role: "user", content: userMsg }
                ]
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;
        res.json({ reply: botReply });

    } catch (error) {
        console.error("Error:", error);
        res.json({ reply: "দুঃখিত মাস্টার রাহুল, আমার প্রসেসরে একটু সমস্যা হচ্ছে।" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Titan X logic running on port ${PORT}`));
