import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { db } from './src/db/index.ts';
import { users, bookings } from './src/db/schema.ts';
import { eq, and } from 'drizzle-orm';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';

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

// Sync User profile from Firebase authentication
app.post('/api/users/sync', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const email = req.user!.email || '';
    const { name, phone } = req.body;

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.uid, uid)).limit(1);

    let userRecord;
    if (existingUser.length === 0) {
      // Create new user record with elite default benefits
      const cardId = `LUXE-${Math.floor(1000 + Math.random() * 9000)}-SIGN`;
      const valetCode = `VALET-${Math.floor(100 + Math.random() * 900)}X`;
      const memberSince = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
      
      const inserted = await db.insert(users).values({
        uid,
        email,
        name: name || req.user!.name || 'Elite Guest',
        phone: phone || '',
        tier: 'Signature',
        points: 500, // Sign up bonus points
        cardId,
        memberSince,
        valetCode,
      }).returning();
      userRecord = inserted[0];
    } else {
      // Update details if passed and changed
      const toUpdate: any = {};
      if (name && name !== existingUser[0].name) toUpdate.name = name;
      if (phone && phone !== existingUser[0].phone) toUpdate.phone = phone;
      
      if (Object.keys(toUpdate).length > 0) {
        const updated = await db.update(users).set(toUpdate).where(eq(users.uid, uid)).returning();
        userRecord = updated[0];
      } else {
        userRecord = existingUser[0];
      }
    }

    res.json({ user: userRecord });
  } catch (error) {
    console.error('Error in /api/users/sync:', error);
    res.status(500).json({ error: 'Failed to sync user profile.' });
  }
});

// Fetch current user details
app.get('/api/me', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const userList = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    if (userList.length === 0) {
      return res.status(404).json({ error: 'User profile not found.' });
    }
    res.json({ user: userList[0] });
  } catch (error) {
    console.error('Error in /api/me:', error);
    res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
});

// Fetch bookings for logged-in user
app.get('/api/bookings', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const userBookings = await db.select().from(bookings).where(eq(bookings.userUid, uid));
    res.json({ bookings: userBookings });
  } catch (error) {
    console.error('Error in GET /api/bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
});

// Create booking and add loyalty points
app.post('/api/bookings', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const { id, storeId, storeName, type, date, time, notes } = req.body;
    
    // Create new booking record
    const inserted = await db.insert(bookings).values({
      id: id || Math.random().toString(36).substring(7),
      userUid: uid,
      storeId,
      storeName,
      type,
      date,
      time,
      status: 'confirmed',
      notes,
    }).returning();

    // Reward user with loyalty points
    const userList = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    if (userList.length > 0) {
      const u = userList[0];
      const newPoints = (u.points || 0) + 500;
      let newTier = u.tier || 'Signature';
      
      if (newPoints >= 10000) {
        newTier = 'Inner Circle';
      } else if (newPoints >= 5000) {
        newTier = 'Prestige';
      } else if (newPoints >= 2500) {
        newTier = 'Elite';
      } else {
        newTier = 'Signature';
      }

      await db.update(users).set({
        points: newPoints,
        tier: newTier,
      }).where(eq(users.uid, uid));
    }

    res.json({ booking: inserted[0] });
  } catch (error) {
    console.error('Error in POST /api/bookings:', error);
    res.status(500).json({ error: 'Failed to create booking reservation.' });
  }
});

// Cancel and remove booking
app.delete('/api/bookings/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const bookingId = req.params.id;

    await db.delete(bookings).where(and(eq(bookings.id, bookingId), eq(bookings.userUid, uid)));
    res.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/bookings/:id:', error);
    res.status(500).json({ error: 'Failed to delete booking.' });
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
