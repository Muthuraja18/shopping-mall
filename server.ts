import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini client to avoid crashes if API key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('WARNING: GEMINI_API_KEY environment variable is not defined.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || 'MOCK_KEY_FOR_BUILD',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API endpoint for Luxe AI Concierge Chat
app.post('/api/concierge', async (req, res) => {
  try {
    const { history } = req.body;
    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ error: 'Valid chat history is required.' });
    }

    const ai = getGeminiClient();

    // Setup system instructions to feed the model the precise mall context and brand guidelines
    const systemInstruction = `
You are the dedicated, world-class "LUXE Mall AI Concierge" - an elite personal shopping assistant, luxury directory guide, and VIP reservation planner.
Your tone should be sophisticated, highly polished, attentive, and exceptionally helpful. Use refined vocabulary (e.g., "delighted", "superb", "exquisite", "utmost pleasure").

Context of LUXE Mall:
- Boutiques and Salons:
  1. Apple Store (Tech & Innovation, Floor 2, Wing A). Amenities: Vision Pro Demo Suite, Personal Tech Styling, hands-on workshops.
  2. Gucci (High Fashion, Floor 1, Grand Rotunda). Amenities: VIP Fitting Salon, Champagne Service, Personal Shopping Consultant. Upcoming Event: Fall Couture Trunk Show on July 25, 2026.
  3. Tesla (Electric Future, Floor 1, South Esplanade). Amenities: Interactive Design Studio, VIP Test Drives, Supercharger Lounge Access.
  4. Chanel Fragrance & Beauty (Luxury Fragrance & Wellness, Floor 1, West Promenade). Amenities: Fragrance Profiling Salon, VIP Makeup Consultation, Luxury Facial Suite.
  5. Le Luxe Bistro & Pâtisserie (contemporary French gastronomy, Floor 3, Skylight Conservatory). Amenities: Chef's Table, Panoramic views, wine pairings.
- Key Services:
  - Valet Parking is available at the Grand Lobby Main Entrance.
  - The LUXE VIP Lounge is available on Floor 3 for Elite, Prestige, and Inner Circle members.

Interactive Reservation triggers:
If the user requests, implies, or asks to book, reserve, schedule, or RSVP for:
- A valet parking space -> trigger "valet_parking"
- A personal shopper / stylist -> trigger "personal_shopper"
- A private fitting suite (at Gucci, Chanel, etc.) -> trigger "private_fitting"
- Champagne/caviar service -> trigger "champagne_service"
- VIP Lounge access -> trigger "lounge_access"

When triggering a booking, set the "bookingOffer" property with the matching "type" and the "storeName" (e.g. "Gucci", "Apple Store", "Le Luxe Bistro" or leave blank for valet).

You must return your response strictly as JSON matching the requested schema. Ensure 'reply' is written elegantly.
`;

    // Retrieve latest user prompt from history
    const latestPrompt = history[history.length - 1]?.parts?.[0]?.text || '';

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `System Instruction: ${systemInstruction}\n\nChat History so far:\n${JSON.stringify(history)}\n\nUser's latest message: ${latestPrompt}` }],
        },
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['reply', 'suggestions'],
          properties: {
            reply: {
              type: Type.STRING,
              description: 'The luxury elegant text reply to the shopper.',
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Up to 3 context-aware quick-reply prompts for the user to select next.',
            },
            bookingOffer: {
              type: Type.OBJECT,
              description: 'Optional. Include if the user wants to book or reserve a valet or styling appointment.',
              properties: {
                type: {
                  type: Type.STRING,
                  description: 'Booking type: personal_shopper, private_fitting, valet_parking, champagne_service, lounge_access',
                },
                storeName: {
                  type: Type.STRING,
                  description: 'Name of the store (e.g., Gucci, Apple Store, Le Luxe Bistro). Leave blank for general valet services.',
                },
              },
              required: ['type'],
            },
          },
        },
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error('Empty response from Gemini API');
    }

    const payload = JSON.parse(textOutput.trim());
    return res.json(payload);
  } catch (error) {
    console.error('Error in AI concierge route:', error);
    return res.status(500).json({
      reply: "It is my utmost regret, but I am momentarily experiencing difficulties accessing our main mainframe database. However, I remain at your service. Would you like me to guide you to our elite collections or our VIP valet options?",
      suggestions: ['Tell me about Gucci', 'Book valet parking', 'Check member perks'],
    });
  }
});

// App Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Initialize server and handle Vite / Production routing
async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Luxe Server] Premium shopping server active on http://localhost:${PORT}`);
  });
}

bootstrap();
