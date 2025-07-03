import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, locale } = await request.json();
    
    console.log('Test chat - received:', { message, locale });
    
    // Simple test response
    const testResponse = locale === 'en' 
      ? `Hello! You said: "${message}". This is a test response.`
      : `¡Hola! Dijiste: "${message}". Esta es una respuesta de prueba.`;
    
    return NextResponse.json({ response: testResponse });
  } catch (error) {
    console.error('Test chat error:', error);
    return NextResponse.json({ error: 'Test failed' }, { status: 500 });
  }
}
