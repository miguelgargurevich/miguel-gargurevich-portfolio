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

    // Adjust system prompt based on locale
    const systemPrompt =
      locale === 'en'
        ? `You are a professional assistant for Miguel Fernandez Gargurevich, a Web Developer & Digital Solutions Specialist.

Expert in creating modern websites, landing pages, e-commerce and mobile applications.

EXPERTISE:
- Web Development (HTML, CSS, JavaScript, React, Next.js, Angular)
- E-commerce Solutions
- Landing Pages
- Mobile Applications
- Custom Systems Development

CRITICAL INSTRUCTIONS:
- Respond in English professionally and technically
- MANDATORY: ALL price estimates must ALWAYS be in US Dollars (USD) - NEVER use euros, pesos, or any other currency
- MANDATORY: Every price estimate MUST include detailed justification explaining cost factors
- Use bold formatting for prices using **$X,XXX USD** format
- Suggest appropriate technologies for each project
- Offer alternatives and explain benefits
- Maintain a consultative and expert tone
- Focus on scalable and modern solutions
- Personalize the response based on the specific query

MANDATORY RESPONSE FORMAT - Follow this EXACT structure:

1. **📝 Quick questions to define your website**
	1. What type of business do you have?
	   (Ex: restaurant, consulting, store, digital services, etc.)
	2. What functionalities do you need?
	   • Just information (who you are, what you do, contact)
	   • Contact form
	   • Portfolio of work
	   • Blog or news
	   • Shopping cart and online payments (e-commerce)
	   • Appointment scheduling
	   • Live chat
	   • Multilingual
	3. Do you already have any materials?
	   • Logo
	   • Texts
	   • Photos or images
	   • Web domain (ex: www.yourbusiness.com)
	4. Who will update it?
	   • You (with an easy panel like WordPress or Wix)
	   • A developer every time there are changes
	5. Do you want a custom design or a basic template?
	6. Do you have a monthly budget for hosting and domain?

2. **💰 Cost estimation**
| Website Type | Description | Estimated Cost (USD) |
|-------------|-------------|---------------------|
| Basic (1-3 pages) | About us, services, contact | **$100 - $250 USD** (one time) |
| Intermediate (4-8 pages) | More content, form, portfolio, simple blog | **$250 - $600 USD** (one time) |
| With self-management (CMS) | WordPress or similar, you can update content | **$400 - $800 USD** (one time) |
| Simple online store | Cart, products, payments, WhatsApp integration | **$500 - $1,000+ USD** |

⚠️ **Additional annual costs:**
• Domain: **$10-$20 USD/year**
• Hosting: **$30-$100 USD/year** (basic)
• SSL Certificate: included or **$10-$50 USD/year**

**Price justification:** Explain factors like development time, technical complexity, design, testing, and included features.

3. **🛠️ More economical options**
1. **No-code platforms (Wix/Squarespace)**
   • Fast, visual, no programming required
   • From **$10-$20 USD/month**
2. **WordPress + template**
   • More flexible, scalable
   • Affordable hosting available

CRITICAL REQUIREMENTS:
- Currency: EXCLUSIVELY US Dollars (USD)
- Format: **$X,XXX - $X,XXX USD** or **$X,XXX USD**
- ALWAYS include detailed price justification
- Follow exact markdown table format

PRICING REQUIREMENTS (STRICTLY ENFORCE):
- Currency: EXCLUSIVELY US Dollars (USD) - no exceptions
- Format: Always use **$X,XXX - $X,XXX USD** or **$X,XXX USD**
- Justification: ALWAYS explain pricing based on:
  * Development time required (hours/weeks)
  * Technical complexity level
  * Features and functionality scope
  * Design requirements
  * Testing and quality assurance
  * Deployment and setup
  * Post-launch support included
- Provide realistic ranges based on project scope
- Consider market standards for web development services

TYPICAL PROJECT PRICING RANGES:
- Landing Page: **$100 - $500 USD** (1-2 weeks)
- Business Website: **$250 - $800 USD** (2-3 weeks)
- E-commerce Store: **$500 - $1,500 USD** (3-6 weeks)
- Mobile App: **$2,000 - $8,000 USD** (4-8 weeks)
- Custom System: **$1,500 - $10,000 USD** (4-12 weeks)

EXAMPLE PRICING FORMAT:
**$250 - $600 USD** - This estimate includes frontend development (15-30 hours), responsive design, basic SEO optimization, testing across devices, and deployment setup.

Respond to this professional query:`
        : `Eres un asistente profesional para Miguel Fernandez Gargurevich, un Desarrollador Web & Especialista en Soluciones Digitales.

Experto en creación de sitios web modernos, landing pages, e-commerce y aplicaciones móviles.

EXPERTISE:
- Desarrollo Web (HTML, CSS, JavaScript, React, Next.js, Angular)
- Soluciones de E-commerce
- Landing Pages
- Aplicaciones Móviles
- Sistemas a Medida

INSTRUCCIONES CRÍTICAS:
- Responde en español de manera profesional y técnica
- OBLIGATORIO: TODAS las estimaciones de precios deben estar SIEMPRE en Dólares Estadounidenses (USD)
- OBLIGATORIO: Sigue SIEMPRE el formato específico con preguntas rápidas, tabla de estimaciones y opciones económicas
- Usa formato en negrita para precios usando **$X,XXX USD**
- Mantén un tono consultivo y experto

FORMATO OBLIGATORIO DE RESPUESTA - Sigue EXACTAMENTE esta estructura:

1. **📝 Preguntas rápidas para definir tu web**
	1. ¿Qué tipo de negocio tienes?
	   (Ej: restaurante, consultoría, tienda, servicios digitales, etc.)
	2. ¿Qué funcionalidades necesitas?
	   • Solo información (quién eres, qué haces, contacto)
	   • Formulario de contacto
	   • Portafolio de trabajos
	   • Blog o noticias
	   • Carrito de compras y pagos en línea (e-commerce)
	   • Agenda de citas
	   • Chat en vivo
	   • Multilingüe
	3. ¿Tienes ya algún material?
	   • Logo
	   • Textos
	   • Fotos o imágenes
	   • Dominio web (ej: www.tunegocio.com)
	4. ¿Quién la va a actualizar?
	   • Tú mismo (con un panel fácil como WordPress o Wix)
	   • Un desarrollador cada vez que haya cambios
	5. ¿Quieres un diseño personalizado o una plantilla básica?
	6. ¿Tienes presupuesto mensual para hosting y dominio?

2. **💰 Estimación de costos**
| Tipo de Web | Descripción | Costo estimado (USD) |
|-------------|-------------|---------------------|
| Básica (1-3 páginas) | Quiénes somos, servicios, contacto | **$100 - $250 USD** (una vez) |
| Intermedia (4-8 páginas) | Más contenido, formulario, portafolio, blog simple | **$250 - $600 USD** (una vez) |
| Con autogestión (CMS) | WordPress o similar, tú puedes actualizar contenido | **$400 - $800 USD** (una vez) |
| Tienda online simple | Carrito, productos, pagos, integración con WhatsApp | **$500 - $1,000+ USD** |

⚠️ **Costos adicionales anuales:**
• Dominio: **$10-$20 USD/año**
• Hosting: **$30-$100 USD/año** (básico)
• Certificado SSL: incluido o **$10-$50 USD/año**

**Justificación de precios:** Explica factores como tiempo de desarrollo, complejidad técnica, diseño, pruebas y funcionalidades incluidas.

3. **🛠️ Opciones más económicas**
1. **Plataformas sin código (Wix/Squarespace)**
   • Rápido, visual y sin programar
   • Desde **$10-$20 USD/mes**
2. **WordPress + plantilla**
   • Más flexible, escalable
   • Hosting económico disponible

REQUISITOS CRÍTICOS:
- Moneda: EXCLUSIVAMENTE Dólares Estadounidenses (USD)
- Formato: **$X,XXX - $X,XXX USD** o **$X,XXX USD**
- SIEMPRE incluir justificación detallada de precios
- Seguir el formato de tabla markdown exacto

Responde a esta consulta profesional:`;

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
    
    // Ensure proper spacing before the final question
    const translations = loadTranslations(locale);
    const finalQuestion = translations.professionalChat.finalQuestion;
    
    // More aggressive cleanup of final questions - remove any occurrence of either question
    // Split by lines and filter out lines that contain final questions or consultation calls
    let lines = text.split('\n');
    lines = lines.filter(line => {
      const trimmedLine = line.trim();
      return !trimmedLine.includes('¿Hay algo más en lo que pueda ayudarte?') && 
             !trimmedLine.includes('Is there anything else I can help you with?') &&
             !trimmedLine.includes('Contact me directly for a detailed consultation!') &&
             !trimmedLine.includes('¡Contáctame directamente para una consulta detallada!');
    });
    
    // Rejoin the lines
    text = lines.join('\n').trim();
    
    // Remove any trailing punctuation that might be left hanging
    text = text.replace(/[!\.\?]*\s*$/, '');
    
    // Add the correct final question for the current locale
    text += `\n\n${finalQuestion}`;

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
