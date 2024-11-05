const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint to handle OpenAI requests
app.post('/api/voice', async (req, res) => {
    try {
        const { audioBase64 } = req.body;

        // Access your OPEN_API_KEY repository secret as an environment variable
        const openAiApiKey = process.env.OPEN_API_KEY;

        const response = await fetch('https://api.openai.com/v1/realtime/voice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openAiApiKey}`
            },
            body: JSON.stringify({
                audio: audioBase64,
                content_type: 'audio/wav'
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
