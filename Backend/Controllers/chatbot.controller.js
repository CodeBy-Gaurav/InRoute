// import axios from 'axios';
// import { detectLanguage } from '../Utils/languageDetector.js';

// export const sendMessage = async (req, res) => {
//   const { message } = req.body;

//   if (!message.trim()) {
//     return res.status(400).json({ reply: "Message cannot be empty." });
//   }

//   try {
//     // Detect the language of the incoming message
//     const languageCode = detectLanguage(message);

//     if (!languageCode) {
//       return res.status(400).json({ reply: "Unable to detect language." });
//     }

//     // For now, just echo back the message
//     const botReply = `Received message in ${languageCode}: ${message}`;

//     // Convert the bot's reply to speech
//     const audioResponse = await generateSpeech(botReply, languageCode);

//     res.status(200).json({
//       reply: botReply,
//       audio: audioResponse, // Returns base64 encoded audio
//     });
//   } catch (error) {
//     console.error("Error processing the message:", error);
//     res.status(500).json({ reply: "Error getting response" });
//   }
// };

// // Function to generate speech using Google TTS
// const generateSpeech = async (text, languageCode) => {
//   try {
//     const response = await axios.post(
//       `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_API_KEY}`,
//       {
//         input: { text },
//         voice: { languageCode, ssmlGender: 'NEUTRAL' },
//         audioConfig: { audioEncoding: 'MP3' },
//       }
//     );

//     return response.data.audioContent; // Returns base64 encoded audio
//   } catch (error) {
//     console.error("Error generating speech:", error);
//     throw new Error("Speech generation failed");
//   }
// };

import { franc } from "franc-min"; // For language detection

// Function to detect the language of the input text
const detectLanguage = (text) => {
  const languageCode = franc(text); // Detect the language
  return languageCode !== "und" ? languageCode : null; // Return null if language is undetected
};

// Controller function to handle chatbot messages
export const sendMessage = async (req, res) => {
  const { message } = req.body;

  if (!message.trim()) {
    return res.status(400).json({ reply: "Message cannot be empty." });
  }

  try {
    // Detect the language of the incoming message
    const languageCode = detectLanguage(message);

    if (!languageCode) {
      return res.status(400).json({ reply: "Unable to detect language." });
    }

    // For now, just echo back the message
    const botReply = `Received message in ${languageCode}: ${message}`;

    // Return the bot's reply as text (speech synthesis will happen on the client side)
    res.status(200).json({
      reply: botReply,
      language: languageCode, // Pass the detected language to the client
    });
  } catch (error) {
    console.error("Error processing the message:", error);
    res.status(500).json({ reply: "Error getting response" });
  }
};