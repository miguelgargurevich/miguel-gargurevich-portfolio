import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let locale: string | undefined;
  try {
    const { message, locale: reqLocale } = await request.json();
    locale = reqLocale;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!locale) {
      return NextResponse.json(
        { error: 'Locale is required' },
        { status: 400 }
      );
    }

    // Check if API key is available
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_AI_API_KEY not found in environment variables');
      throw new Error('API key not configured');
    }

    console.log('Initializing Gemini AI with API key present');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Adjust system prompt based on locale
    const systemPrompt =
      locale === 'en'
        ? `You are a professional assistant for Miguel Fernandez Gargurevich, a Web Developer specialized in:

EXPERTISE:
- Web Development (HTML, CSS, JavaScript, React, Next.js)
- E-commerce Solutions
- Landing Pages
- Mobile Applications

INSTRUCTIONS:
- Respond in English professionally and technically
- Provide realistic time and cost estimates
- Suggest appropriate technologies for each project
- Offer alternatives and explain benefits
- Maintain a consultative and expert tone
- Focus on scalable and modern solutions
- Personalize the response based on the specific query

Respond to this professional query:`
        : `Eres un asistente profesional para Miguel Fernandez Gargurevich, un Desarrollador Web especializado en:

EXPERTISE:
- Desarrollo Web (HTML, CSS, JavaScript, React, Next.js)
- Soluciones de E-commerce
- Landing Pages
- Aplicaciones Móviles

INSTRUCCIONES:
- Responde en español de manera profesional y técnica
- Proporciona estimaciones realistas de tiempo y costo
- Sugiere tecnologías apropiadas para cada proyecto
- Ofrece alternativas y explica beneficios
- Mantén un tono consultivo y experto
- Enfócate en soluciones escalables y modernas
- Personaliza la respuesta según la consulta específica

Responde a esta consulta profesional:`;

    const prompt = `${systemPrompt}\n\nConsulta del cliente: ${message}`;

    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Successfully received response from Gemini API');
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error in professional-chat API:', error);

    // Check if it's a quota exceeded error
    const errorMsg = error instanceof Error ? error.message : String(error);
    if (errorMsg.includes('exceeded your current quota') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
      const quotaMessage = locale === 'en' 
        ? `I apologize, but the AI assistant has reached its daily usage limit. Please try again tomorrow or contact Miguel directly at miguel@gargurevich.com for immediate assistance.

In the meantime, I can help you with:
• **Web Development**: Modern websites with React/Next.js
• **E-commerce**: Online stores with payment integration
• **Landing Pages**: High-converting promotional pages  
• **Mobile Apps**: Cross-platform applications

**Estimated Timeline**: 2-4 weeks
**Starting Price**: $500 - $5,000 USD (depending on complexity)

Contact me directly for a detailed consultation!`
        : `Disculpa, el asistente de IA ha alcanzado su límite diario de uso. Por favor intenta mañana o contacta a Miguel directamente en miguel@gargurevich.com para asistencia inmediata.

Mientras tanto, puedo ayudarte con:
• **Desarrollo Web**: Sitios modernos con React/Next.js
• **E-commerce**: Tiendas online con integración de pagos
• **Landing Pages**: Páginas promocionales de alta conversión
• **Apps Móviles**: Aplicaciones multiplataforma

**Tiempo estimado**: 2-4 semanas
**Precio inicial**: $500 - $5,000 USD (según complejidad)

¡Contáctame directamente para una consulta detallada!`;

      return NextResponse.json({ response: quotaMessage });
    }

    const errorMessage =
      locale === 'en'
        ? 'Internal server error'
        : 'Error interno del servidor';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
