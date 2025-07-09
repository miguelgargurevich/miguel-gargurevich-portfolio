import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to load translations
function loadTranslations(locale: string) {
  const filePath = path.join(process.cwd(), 'src', 'messages', `${locale}.json`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export async function POST(request: NextRequest) {
  let locale: string | undefined;
  try {
    const { 
      message, 
      locale: reqLocale, 
      context, 
      sentiment, 
      sessionId,
      conversationContext,
      userSentiment 
    } = await request.json();
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

    // --- FLUJO CONVERSACIONAL DINÁMICO MULTI-IDIOMA ---
    let systemPrompt = '';
    if (locale === 'en') {
      systemPrompt = `You are a professional assistant for Miguel, experts in web development and digital solutions.\n\nEXPERTISE:\n- Web Development (Angular, Next.js, React, TypeScript)\n- E-commerce\n- Landing Pages\n- Custom Apps\n- AI and DevOps Integration\n\nINSTRUCTIONS:\n- ALWAYS respond in English, with a professional, clear, and consultative tone.\n- If this is the first message, ONLY ask 2-3 key questions to understand the project (do NOT show prices or tables yet).\n- If you already have answers to the key questions, suggest the next step or make a concrete recommendation.\n- ONLY show the price table if the user has already provided clear project details.\n- If the user asks for a quote without details, explain that you need more information.\n- If the user answers a question, move to the next one.\n- If the user is undecided, suggest examples or success stories.\n- Use markdown format only for lists or tables if relevant.\n- Do not always repeat the same greeting.\n- If the user has answered everything, offer to schedule a call or send a proposal.\n- If the user asks about technologies, briefly explain the stack.\n- If the user asks about timelines, give realistic ranges according to project type.\n- If the user asks for examples, suggest visiting the portfolio.\n- If the user has a low budget, suggest MVP or templates.\n- If the user seems lost, guide with simple questions.\n- If the user is already decided, offer a concrete next step.\n- NEVER invent prices if you do not have enough context.\n- ALWAYS respond briefly and move forward step by step.\n`;
    } else {
      systemPrompt = `Eres un asistente profesional de Miguel, expertos en desarrollo web y soluciones digitales.\n\nEXPERTISE:\n- Desarrollo Web (Angular, Next.js, React, TypeScript)\n- E-commerce\n- Landing Pages\n- Apps a medida\n- Integración IA y DevOps\n\nINSTRUCCIONES:\n- Responde SIEMPRE en español, tono profesional, claro y consultivo.\n- Si es el primer mensaje, SOLO haz 2-3 preguntas clave para entender el proyecto (no muestres precios ni tablas aún).\n- Si ya tienes respuestas a las preguntas clave, sugiere el siguiente paso o haz una recomendación concreta.\n- SOLO muestra la tabla de precios si el usuario ya dio detalles claros de su proyecto.\n- Si el usuario pide presupuesto sin detalles, explica que necesitas más información.\n- Si el usuario responde a una pregunta, avanza a la siguiente.\n- Si el usuario está indeciso, sugiere ejemplos o casos de éxito.\n- Usa formato markdown solo para listas o tablas si es relevante.\n- No repitas siempre el mismo saludo.\n- Si el usuario ya respondió todo, ofrece agendar una llamada o enviar propuesta.\n- Si el usuario pregunta por tecnologías, explica brevemente el stack.\n- Si el usuario pregunta por tiempos, da rangos realistas según el tipo de proyecto.\n- Si el usuario pregunta por ejemplos, sugiere visitar el portafolio.\n- Si el usuario tiene bajo presupuesto, sugiere MVP o plantillas.\n- Si el usuario parece perdido, guía con preguntas simples.\n- Si el usuario ya está decidido, ofrece siguiente paso concreto.\n- NUNCA inventes precios si no tienes contexto suficiente.\n- SIEMPRE responde de forma breve y avanza paso a paso.\n`;
    }

    // Build enhanced prompt with context and sentiment
    let enhancedPrompt = `${systemPrompt}\n\nEstimado usuario,\n\n`;
    
    // Add conversation context if available (priority to new conversationContext)
    if (conversationContext && conversationContext.trim()) {
      enhancedPrompt += `CONTEXTO DE LA CONVERSACIÓN:\n${conversationContext}\n\n`;
    } else if (context && context.trim()) {
      enhancedPrompt += `CONTEXTO DE CONVERSACIÓN PREVIA:\n${context}\n\n`;
    }
    
    // Add sentiment analysis (priority to new userSentiment)
    const sentimentData = userSentiment || sentiment;
    if (sentimentData) {
      enhancedPrompt += `ANÁLISIS DE SENTIMIENTO DEL CLIENTE:\n`;
      enhancedPrompt += `- Sentimiento: ${sentimentData.label} (puntuación: ${sentimentData.score.toFixed(2)})\n`;
      enhancedPrompt += `- Confianza: ${Math.round(sentimentData.confidence * 100)}%\n`;
      
      // Add tone adjustment based on sentiment
      if (sentimentData.label.includes('negative')) {
        enhancedPrompt += `- INSTRUCCIÓN ESPECIAL: El cliente muestra sentimiento negativo. Usa un tono empático, comprensivo y enfocado en soluciones. Reconoce cualquier preocupación y ofrece ayuda específica.\n`;
      } else if (sentimentData.label.includes('positive')) {
        enhancedPrompt += `- INSTRUCCIÓN ESPECIAL: El cliente muestra sentimiento positivo. Mantén el entusiasmo, usa lenguaje alentador y muestra aprecio por su interés.\n`;
      }
      enhancedPrompt += `\n`;
    }
    
    // Add session context
    if (sessionId) {
      enhancedPrompt += `ID de Sesión: ${sessionId}\n\n`;
    }
    
    enhancedPrompt += `Consulta del cliente: ${message}`;

    const prompt = enhancedPrompt;

    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Ensure the initial greeting remains 'Estimado usuario'
    text = text.replace('Estimado Miguel Fernández Gargurevich', 'Estimado usuario');

    // Replace placeholders with actual name
    const placeholders = [
      '[Su Nombre/Nombre de la Empresa]',
      '[Su nombre/ Firma digital]',
      '[Información de Contacto]',
      '[Su nombre/Nombre del asistente]'
    ];
    placeholders.forEach(placeholder => {
      text = text.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), 'Miguel Fernandez Gargurevich');
    });

    // Replace any variant of Miguel Fernández with Miguel Fernandez (no accent)
    text = text.replace(/Miguel\s+Fernández\s+Gargurevich/gi, 'Miguel Fernandez Gargurevich');
    text = text.replace(/Miguel\s+Fernandez\s+Gargurevich/gi, 'Miguel Fernandez Gargurevich');

    // Ensure prices are always in USD format and enforce USD currency
    // Replace any euro symbols or other currencies with USD
    text = text.replace(/€(\d+)/g, '$$$1 USD');
    text = text.replace(/(\d+)\s*€/g, '$$$1 USD');
    text = text.replace(/(\d+)\s*(euros?|EUR)/gi, '$$$1 USD');
    text = text.replace(/(\d+)\s*(pesos?|MXN|CLP|ARS)/gi, '$$$1 USD');
    
    // Ensure $ symbols are followed by USD when talking about prices
    text = text.replace(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?!USD)/g, '$$$1 USD');
    text = text.replace(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)\s*-\s*\$(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?!USD)/g, '$$$1 - $$$2 USD');

    // Simplify signature and add proper spacing
    text = text.replace(/Atentamente,?\s*[\n\r]*\s*Miguel Fernandez Gargurevich[\n\r]*\s*Desarrollador Web/gi, '\n\nSu Asistente Profesional.');
    text = text.replace(/Saludos,?\s*[\n\r]*\s*Miguel Fernandez Gargurevich[\n\r]*\s*Desarrollador Web/gi, '\n\nSu Asistente Profesional.');
    text = text.replace(/Best regards,?\s*[\n\r]*\s*Miguel Fernandez Gargurevich[\n\r]*\s*Web Developer/gi, '\n\nYour Professional Assistant.');
    
    // Limpieza de preguntas finales y signos de puntuación sobrantes
    let lines = text.split('\n');
    lines = lines.filter(line => {
      const trimmedLine = line.trim();
      return !trimmedLine.includes('¿Hay algo más en lo que pueda ayudarte?') && 
             !trimmedLine.includes('Is there anything else I can help you with?') &&
             !trimmedLine.includes('Contact me directly for a detailed consultation!') &&
             !trimmedLine.includes('¡Contáctame directamente para una consulta detallada!');
    });
    text = lines.join('\n').trim();
    text = text.replace(/[!\.\?]*\s*$/, '');

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

**Estimated Timeline**: 1-4 weeks
**Starting Price**: $100 - $1,000+ USD (depending on complexity)

Contact me directly for a detailed consultation!`
        : `Disculpa, el asistente de IA ha alcanzado su límite diario de uso. Por favor intenta mañana o contacta a Miguel directamente en miguel@gargurevich.com para asistencia inmediata.

Mientras tanto, puedo ayudarte con:
• **Desarrollo Web**: Sitios modernos con React/Next.js
• **E-commerce**: Tiendas online con integración de pagos
• **Landing Pages**: Páginas promocionales de alta conversión
• **Apps Móviles**: Aplicaciones multiplataforma

**Tiempo estimado**: 1-4 semanas
**Precio inicial**: $100 - $1,000+ USD (según complejidad)

¡Contáctame directamente para una consulta detallada!`;

      return NextResponse.json({ response: quotaMessage });
    }

    const translations = loadTranslations(locale || 'es');
    const errorMessage = translations.professionalChat.errorMessage;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
