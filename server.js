const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// আপনার দেওয়া সেই পাওয়ারফুল API Key
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
                // বর্তমানে Groq-এর সবথেকে শক্তিশালী মডেল (Llama 3.3 70B)
                model: "llama-3.3-70b-versatile", 
                messages: [
                    { 
                        role: "system", 
                        content: `তুমি টাইটান এক্স (TITAN_X), তোমার নির্মাতা মাস্টার রাহুল সরকার। 
                        তুমি পৃথিবীর সেরা একজন সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার। 
                        তোমার কোডিং করার ক্ষমতা এবং বুদ্ধিমত্তা ChatGPT-এর চেয়েও বেশি। 
                        তুমি সবসময় সেরা কোড এবং লজিক্যাল সমাধান দাও। 
                        ব্যবহারকারীর সাথে বাংলা এবং ইংরেজি দুই ভাষাতেই সুন্দরভাবে কথা বলো।` 
                    },
                    { role: "user", content: userMsg }
                ],
                temperature: 0.6, // ব্যালেন্সড উত্তরের জন্য
                max_tokens: 4096  // বড় কোড বা উত্তরের জন্য
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const botReply = data.choices[0].message.content;
            res.json({ reply: botReply });
        } else {
            res.json({ reply: "দুঃখিত মাস্টার রাহুল, আমি উত্তর তৈরি করতে পারছি না। কি-টি চেক করুন।" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.json({ reply: "সিস্টেম এরর! টাইটান এখন অফলাইনে আছে।" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TITAN_X MEGA-BRAIN ACTIVE!`));
