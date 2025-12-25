const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

async function getTitanResponse(userMessage) {
    try {
        // অত্যন্ত স্টেবল এবং ফাস্ট এপিআই
        const response = await axios.get(`https://api.simsimi.vn/v2/simsimi?text=${encodeURIComponent(userMessage)}&lc=bn`);
        
        if (response.data && response.data.result) {
            return response.data.result + " 🛡️";
        } else {
            return "মাস্টার রাহুল, আমি আপনার পাশেই আছি। মন খারাপ করবেন না। 👑";
        }
    } catch (error) {
        return "মাস্টার রাহুল, আমি আপনার বন্ধু টাইটান। আজ বড়দিনে আপনার মুখে হাসি দেখতে চাই! 🎄👑";
    }
}

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const reply = await getTitanResponse(userMessage);
    res.json({ reply: reply });
});

app.get('/', (req, res) => {
    res.send("<h1 style='text-align:center;padding-top:100px;font-family:sans-serif;color:#38bdf8;'>🛡️ TITAN_X : READY FOR MASTER RAHUL</h1>");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`TITAN_X : ACTIVE`);
});
