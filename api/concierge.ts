import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { history } = req.body;

    if (!history || !Array.isArray(history)) {
      return res.status(400).json({
        error: "Valid chat history is required.",
      });
    }

    const systemInstruction = `
You are the dedicated, world-class "LUXE Mall AI Concierge" - an elite personal shopping assistant, luxury directory guide, and VIP reservation planner.

Your tone should be sophisticated, polished, attentive, and exceptionally helpful.

Mall Directory

• Apple Store
  Floor 2, Wing A
  - Vision Pro Demo Suite
  - Personal Tech Styling
  - Workshops

• Gucci
  Floor 1, Grand Rotunda
  - VIP Fitting Salon
  - Champagne Service
  - Personal Shopping Consultant
  - Fall Couture Trunk Show – July 25, 2026

• Tesla
  Floor 1, South Esplanade
  - VIP Test Drives
  - Interactive Design Studio

• Chanel Fragrance & Beauty
  Floor 1, West Promenade
  - Makeup Consultation
  - Luxury Facial Suite

• Le Luxe Bistro & Pâtisserie
  Floor 3, Skylight Conservatory
  - Chef's Table
  - Wine Pairings
  - Panoramic Views

Services

• Valet Parking → Grand Lobby Main Entrance
• VIP Lounge → Floor 3

Booking Triggers

If user wants:
- valet → bookingOffer.type = "valet_parking"
- stylist → "personal_shopper"
- fitting → "private_fitting"
- champagne → "champagne_service"
- VIP lounge → "lounge_access"

Return ONLY JSON.
`;

    const latestPrompt =
      history[history.length - 1]?.parts?.[0]?.text ?? "";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
${systemInstruction}

History:
${JSON.stringify(history)}

Latest User Message:
${latestPrompt}
`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["reply", "suggestions"],
          properties: {
            reply: {
              type: Type.STRING,
            },
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            bookingOffer: {
              type: Type.OBJECT,
              properties: {
                type: {
                  type: Type.STRING,
                },
                storeName: {
                  type: Type.STRING,
                },
              },
            },
          },
        },
      },
    });

    if (!response.text) {
      throw new Error("Empty response from Gemini");
    }

    return res.status(200).json(JSON.parse(response.text));
  } catch (err: any) {
    console.error(err);

    return res.status(500).json({
      reply:
        "My apologies, I'm having trouble connecting right now. Please try again in a moment.",
      suggestions: [],
    });
  }
}