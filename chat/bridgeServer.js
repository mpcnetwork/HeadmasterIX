const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000; // Je lokale poort voor de brugserver

// Zorg dat je JSON-verzoeken kunt verwerken
app.use(express.json());

// Serveer je HTML-bestand
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HeadmasterIXchat.html'));
});

// Endpoint voor communicatie met de AI-server
app.post('/ask-ai', async (req, res) => {
  try {
    const userInput = req.body.message;

    // Stuur het bericht door naar je lokale AI-server
    const aiResponse = await axios.post('http://192.168.56.1:1234/v1/chat/completions', {
      prompt: userInput
    });

    // Stuur het antwoord terug naar de frontend
    res.json({ reply: aiResponse.data });
  } catch (error) {
    console.error('Fout bij verbinden met AI-server:', error.message);
    res.status(500).json({ error: 'AI-server niet bereikbaar' });
  }
});

// Start de brugserver
app.listen(PORT, () => {
  console.log(`Bridge server draait op http://localhost:${PORT}`);
});
