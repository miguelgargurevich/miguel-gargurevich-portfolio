import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
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

    // Professional context prompt for Miguel Fernandez Gargurevich
    const systemPrompt = `Eres un asistente profesional para Miguel Fernandez Gargurevich, un Cloud Solutions Architect y Full-Stack Developer especializado en:

EXPERTISE:
- Microsoft Azure (Cloud Architecture, DevOps, Kubernetes)
- Full-Stack Development (TypeScript, React, Next.js, Python, .NET)
- AI/ML Integration (OpenAI, Azure AI, Google Gemini)
- Database Design (SQL Server, PostgreSQL, MongoDB)
- CI/CD Pipelines (Azure DevOps, GitHub Actions)
- Microservices Architecture
- Modern Web Applications

SERVICIOS PRINCIPALES:
1. Cloud Migration & Architecture (Azure)
2. Custom Web Applications (Next.js, React)
3. E-commerce Solutions
4. AI Integration & Automation
5. Database Design & Optimization
6. DevOps & CI/CD Setup
7. Technical Consulting

PRECIOS ORIENTATIVOS:
- Landing Page Básica: $500-800
- E-commerce Completo: $1,500-3,000
- App Web Personalizada: $800-2,500
- Integración IA: $1,200-2,500
- Migración a la Nube: $1,000-5,000
- App Móvil: $3,000-8,000
- Consultoría por hora: $50-100

INSTRUCCIONES:
- Responde en español de manera profesional y técnica
- Proporciona estimaciones realistas de tiempo y costo
- Sugiere tecnologías apropiadas para cada proyecto
- Ofrece alternativas y explica beneficios
- Mantén un tono consultivo y experto
- Si preguntan por disponibilidad, sugiere contactar directamente
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
    
    // More specific error handling
    let errorMessage = 'Error interno del servidor';
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if (error.message.includes('API key')) {
        errorMessage = 'Error de configuración de IA';
      } else if (error.message.includes('quota') || error.message.includes('rate limit')) {
        errorMessage = 'Límite de uso de IA alcanzado';
      }
    }
    
    // Fallback professional response in Spanish with more variety
    const fallbackResponses = [
      `Hola! Gracias por contactarme. Soy Miguel Fernandez Gargurevich, Cloud Solutions Architect especializado en Azure y desarrollo full-stack.

Para poder ayudarte mejor, me gustaría conocer más detalles sobre tu proyecto:
• ¿Qué tipo de solución necesitas? (web app, e-commerce, migración cloud, etc.)
• ¿Cuál es tu objetivo principal?
• ¿Tienes algún presupuesto en mente?
• ¿Hay alguna tecnología específica que prefieras?

Mientras tanto, puedo contarte que trabajo con tecnologías como Next.js, React, TypeScript, Python, .NET, y Microsoft Azure para crear soluciones escalables y modernas.

¿En qué puedo ayudarte específicamente?`,

      `¡Perfecto! Como Cloud Solutions Architect, puedo ayudarte con una amplia gama de proyectos tecnológicos.

Mi experiencia incluye:
🚀 Desarrollo de aplicaciones web modernas (Next.js, React, TypeScript)
☁️ Arquitectura e infraestructura en la nube (Microsoft Azure)
🤖 Integración de IA y automatización
🛒 Soluciones de e-commerce completas
📊 Sistemas de gestión y bases de datos

Para darte una cotización precisa, necesito entender mejor tu proyecto. ¿Podrías contarme más sobre lo que tienes en mente?`,

      `Hola! Soy Miguel, especialista en soluciones cloud y desarrollo full-stack. 

Trabajo principalmente con:
• Microsoft Azure para infraestructura cloud
• Next.js/React para aplicaciones web modernas  
• TypeScript/Python/.NET para desarrollo backend
• Integración de IA (OpenAI, Azure AI, Gemini)
• DevOps y CI/CD

¿Qué tipo de proyecto estás considerando? Me encantaría ayudarte a encontrar la mejor solución técnica para tus necesidades.`
    ];

    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

    return NextResponse.json({ 
      response: randomResponse,
      error: errorMessage
    });
  }
}
