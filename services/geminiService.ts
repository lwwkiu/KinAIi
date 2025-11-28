import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

// Note: In a real app, this would be secure. For this demo, we assume process.env.API_KEY exists.
const getAI = () => {
  const apiKey = process.env.API_KEY || ''; 
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features will return mock data.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generatePasswordAdvice = async (userName: string, lang: 'EN' | 'RU'): Promise<string> => {
  const ai = getAI();
  const prompt = lang === 'RU' 
    ? `Привет, я ${userName}. Дай мне 3 коротких совета по созданию надежного пароля. Не более 50 слов. Отвечай на русском языке.`
    : `Hi, I am ${userName}. Give me 3 short, friendly tips on creating a secure password for a food delivery app. Keep it under 50 words total.`;

  if (!ai) return lang === 'RU' ? "Используйте разные символы и цифры." : "Use a mix of letters, numbers, and symbols.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || (lang === 'RU' ? "Используйте сложные пароли!" : "Use strong passwords!");
  } catch (e) {
    console.error(e);
    return lang === 'RU' ? "Ошибка соединения." : "Connection error.";
  }
};

export const analyzeFood = async (productName: string, lang: 'EN' | 'RU'): Promise<string> => {
  const ai = getAI();
  const prompt = lang === 'RU'
    ? `Кратко опиши ингредиенты и одну полезную особенность блюда: ${productName}. Макс 40 слов. Тон: помощник Кинай. Отвечай на русском.`
    : `Briefly describe the ingredients and one key health benefit of ${productName}. Max 40 words. Tone: Helpful assistant named Kinai.`;

  if (!ai) return lang === 'RU' ? "Вкусно и полезно!" : "Delicious and nutritious!";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || (lang === 'RU' ? "Отличный выбор!" : "Healthy choice!");
  } catch (e) {
    return lang === 'RU' ? "Полезный продукт." : "Tasty and filled with energy!";
  }
};

export const recommendFood = async (preferences: string, lang: 'EN' | 'RU', excludeIds: string[] = []): Promise<string[]> => {
  const ai = getAI();
  const menuString = MOCK_PRODUCTS.map(p => `${p.id}: ${p.name} (${p.category})`).join(', ');
  
  if (!ai) {
    // Return items not in exclude list
    return MOCK_PRODUCTS.filter(p => !excludeIds.includes(p.id)).slice(0, 6).map(p => p.id);
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User preferences (${lang}): ${preferences}. 
      Menu: [${menuString}]. 
      Do NOT include these IDs in the result: ${excludeIds.join(', ')}.
      Return ONLY a JSON array of IDs (e.g. ["s1", "m2"]) of the top 6 most suitable items from the menu that match the preferences. Prioritize variety. No markdown, just plain JSON.`,
    });
    
    const text = response.text || "[]";
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error(e);
    // Fallback: return items not in exclude list
    const fallback = MOCK_PRODUCTS.filter(p => !excludeIds.includes(p.id)).slice(0, 6).map(p => p.id);
    return fallback;
  }
};

export const chatWithKinai = async (message: string, lang: 'EN' | 'RU'): Promise<string> => {
  const ai = getAI();
  const systemPrompt = lang === 'RU'
    ? "Система: Ты Кинай, профессиональный ИИ-диетолог. Твои ответы должны быть строго научными, содержать точные граммовки, пропорции (БЖУ) и конкретные рекомендации. Не используй общие фразы. Если спрашивают диету, распиши меню по граммам. Отвечай на русском."
    : "System: You are Kinai, a professional AI Dietitian. Your answers must be precise, including exact gram measurements, macro proportions, and scientific nutritional advice. Do not use vague terms. If asked for a diet, provide a menu with exact weights. Answer in English.";

  if (!ai) return lang === 'RU' ? "Я Кинай, ваш диетолог. Чем могу помочь?" : "I am Kinai, your dietitian. How can I help?";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemPrompt}
      User: ${message}`,
    });
    return response.text || (lang === 'RU' ? "Рассчитываю ваш рацион..." : "Calculating your macros...");
  } catch (e) {
    return lang === 'RU' ? "Проблемы с соединением." : "I am having trouble connecting right now.";
  }
};

export const getDeliveryEstimate = async (address: string): Promise<{ distance: number, lat: number, lng: number }> => {
  const ai = getAI();
  const restaurantLocation = "Maldybaeva 34B, Bishkek";
  
  if (!ai) {
    // Fallback mock
    return { distance: 5.5, lat: 42.87, lng: 74.62 };
  }

  const prompt = `
    Task: Estimate the driving distance and geolocation for a delivery.
    Origin: ${restaurantLocation}
    Destination: ${address}, Bishkek, Kyrgyzstan.
    
    Output Requirement: Return a strict JSON object with:
    - "distance": number (distance in km)
    - "lat": number (approximate latitude of destination)
    - "lng": number (approximate longitude of destination)
    
    If the address is vague, estimate the center of the street/area in Bishkek.
    JSON ONLY.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    const text = response.text || "[]";
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Error estimating distance", e);
    return { distance: 4.0, lat: 42.85, lng: 74.61 }; // Default fallback
  }
};