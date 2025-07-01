import { NextRequest, NextResponse } from 'next/server';
import jsPDF from 'jspdf';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ProposalRequest {
  conversation: Message[];
  estimatedCost: number;
  clientLocale: string;
}

export async function POST(request: NextRequest) {
  try {
    const { conversation, estimatedCost, clientLocale }: ProposalRequest = await request.json();

    // Create new PDF document
    const doc = new jsPDF();
    
    const currentDate = new Date().toLocaleDateString(clientLocale === 'es' ? 'es-ES' : 'en-US');
    const userMessages = conversation.filter(msg => msg.type === 'user');
    const projectDescription = userMessages.map(msg => msg.content).join(' ').substring(0, 300);
    
    // Identify key features from conversation
    const features = [];
    const content = projectDescription.toLowerCase();
    
    if (content.includes('ecommerce') || content.includes('tienda')) {
      features.push(clientLocale === 'es' ? 'E-commerce con carrito de compras' : 'E-commerce with shopping cart');
    }
    if (content.includes('cms') || content.includes('administración')) {
      features.push(clientLocale === 'es' ? 'Sistema de gestión de contenidos' : 'Content management system');
    }
    if (content.includes('seo')) {
      features.push(clientLocale === 'es' ? 'Optimización SEO' : 'SEO optimization');
    }
    if (content.includes('app móvil') || content.includes('mobile app')) {
      features.push(clientLocale === 'es' ? 'Aplicación móvil nativa' : 'Native mobile application');
    }
    if (content.includes('ia') || content.includes('inteligencia artificial') || content.includes('chatbot')) {
      features.push(clientLocale === 'es' ? 'Integración de IA/Chatbot' : 'AI/Chatbot integration');
    }
    if (content.includes('cloud') || content.includes('nube')) {
      features.push(clientLocale === 'es' ? 'Hosting en la nube' : 'Cloud hosting');
    }
    
    // If no specific features identified, add basic web development
    if (features.length === 0) {
      features.push(clientLocale === 'es' ? 'Desarrollo web profesional' : 'Professional web development');
    }

    // Generate PDF content
    if (clientLocale === 'es') {
      generateSpanishPDF(doc, currentDate, features, estimatedCost, projectDescription);
    } else {
      generateEnglishPDF(doc, currentDate, features, estimatedCost, projectDescription);
    }

    // Convert PDF to buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="propuesta-${Date.now()}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error generating proposal:', error);
    return NextResponse.json({ error: 'Failed to generate proposal' }, { status: 500 });
  }
}

function generateSpanishPDF(doc: jsPDF, date: string, features: string[], estimatedCost: number, description: string): void {
  // Set default font to support special characters better
  doc.setFont("helvetica");
  
  let y = 20;
  const lineHeight = 7;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const maxLineWidth = pageWidth - 2 * margin;

  // Helper function to add text with line wrapping
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    if (isBold) {
      doc.setFont("helvetica", "bold");
    } else {
      doc.setFont("helvetica", "normal");
    }
    
    const lines = doc.splitTextToSize(text, maxLineWidth);
    for (const line of lines) {
      if (y > 270) { // Check if we need a new page
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    }
    y += 3; // Extra spacing after paragraphs
  };

  // Header
  addText("PROPUESTA TÉCNICA Y COMERCIAL", 18, true);
  addText("Miguel Fernandez Gargurevich", 14, true);
  addText("Arquitecto de Soluciones Cloud & Desarrollador Full-Stack", 12);
  addText(`Fecha: ${date}`, 11);
  
  y += 10;

  // Section 1
  addText("1. RESUMEN EJECUTIVO", 14, true);
  addText("Estimado Cliente,", 12);
  addText("Gracias por su interés en mis servicios de desarrollo y arquitectura cloud. Basado en nuestra conversación, he preparado esta propuesta personalizada para su proyecto.", 12);
  
  y += 5;

  // Section 2
  addText("2. ENTENDIMIENTO DEL PROYECTO", 14, true);
  addText(`Descripción del Proyecto: ${description}`, 12);
  
  y += 5;

  // Section 3
  addText("3. CARACTERÍSTICAS PRINCIPALES", 14, true);
  features.forEach((feature, index) => {
    addText(`${index + 1}. ${feature}`, 12);
  });
  
  y += 5;

  // Section 4
  addText("4. TECNOLOGÍAS PROPUESTAS", 14, true);
  const technologies = [
    "• Frontend: Next.js 15, TypeScript, Tailwind CSS",
    "• Backend: Node.js/Python, APIs RESTful",
    "• Base de Datos: PostgreSQL/MongoDB según necesidades",
    "• Cloud: Microsoft Azure (mi especialidad)",
    "• DevOps: Docker, Kubernetes, CI/CD",
    "• Seguridad: Autenticación JWT, HTTPS, Firewall"
  ];
  technologies.forEach(tech => addText(tech, 12));
  
  y += 5;

  // Section 5
  addText("5. INVERSIÓN", 14, true);
  addText(`Estimación Inicial: $${estimatedCost.toLocaleString()} USD`, 12, true);
  addText("* Esta es una estimación preliminar basada en la información proporcionada.", 10);
  addText("* El precio final se determinará después del análisis detallado de requerimientos.", 10);
  addText("* Incluye desarrollo, despliegue inicial y documentación.", 10);
  addText("* No incluye hosting mensual (estimado: $50-200/mes según tráfico).", 10);
  
  y += 5;

  // Section 6
  addText("6. PRÓXIMOS PASOS", 14, true);
  const steps = [
    "1. Reunión de refinamiento de requerimientos",
    "2. Firma de contrato y anticipo (30%)",
    "3. Inicio del proyecto",
    "4. Entregables semanales y revisiones"
  ];
  steps.forEach(step => addText(step, 12));
  
  y += 10;

  // Contact
  addText("CONTACTO", 14, true);
  addText("Miguel Fernandez Gargurevich", 12, true);
  addText("Email: miguel@gargurevich.com", 12);
  addText("WhatsApp: +51 987 654 321", 12);
  addText("Web: https://miguelgargurevich.com", 12);
  
  y += 5;
  addText("¡Gracias por considerar mis servicios!", 12, true);
  addText("Esta propuesta es válida por 30 días.", 10);
}

function generateEnglishPDF(doc: jsPDF, date: string, features: string[], estimatedCost: number, description: string): void {
  // Set default font to support special characters better
  doc.setFont("helvetica");
  
  let y = 20;
  const lineHeight = 7;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const maxLineWidth = pageWidth - 2 * margin;

  // Helper function to add text with line wrapping
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    if (isBold) {
      doc.setFont("helvetica", "bold");
    } else {
      doc.setFont("helvetica", "normal");
    }
    
    const lines = doc.splitTextToSize(text, maxLineWidth);
    for (const line of lines) {
      if (y > 270) { // Check if we need a new page
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    }
    y += 3; // Extra spacing after paragraphs
  };

  // Header
  addText("TECHNICAL AND COMMERCIAL PROPOSAL", 18, true);
  addText("Miguel Fernandez Gargurevich", 14, true);
  addText("Cloud Solutions Architect & Full-Stack Developer", 12);
  addText(`Date: ${date}`, 11);
  
  y += 10;

  // Section 1
  addText("1. EXECUTIVE SUMMARY", 14, true);
  addText("Dear Client,", 12);
  addText("Thank you for your interest in my development and cloud architecture services. Based on our conversation, I have prepared this personalized proposal for your project.", 12);
  
  y += 5;

  // Section 2
  addText("2. PROJECT UNDERSTANDING", 14, true);
  addText(`Project Description: ${description}`, 12);
  
  y += 5;

  // Section 3
  addText("3. KEY FEATURES", 14, true);
  features.forEach((feature, index) => {
    addText(`${index + 1}. ${feature}`, 12);
  });
  
  y += 5;

  // Section 4
  addText("4. PROPOSED TECHNOLOGIES", 14, true);
  const technologies = [
    "• Frontend: Next.js 15, TypeScript, Tailwind CSS",
    "• Backend: Node.js/Python, RESTful APIs",
    "• Database: PostgreSQL/MongoDB as needed",
    "• Cloud: Microsoft Azure (my specialty)",
    "• DevOps: Docker, Kubernetes, CI/CD",
    "• Security: JWT Authentication, HTTPS, Firewall"
  ];
  technologies.forEach(tech => addText(tech, 12));
  
  y += 5;

  // Section 5
  addText("5. INVESTMENT", 14, true);
  addText(`Initial Estimate: $${estimatedCost.toLocaleString()} USD`, 12, true);
  addText("* This is a preliminary estimate based on provided information.", 10);
  addText("* Final price will be determined after detailed requirements analysis.", 10);
  addText("* Includes development, initial deployment, and documentation.", 10);
  addText("* Does not include monthly hosting (estimated: $50-200/month based on traffic).", 10);
  
  y += 5;

  // Section 6
  addText("6. NEXT STEPS", 14, true);
  const steps = [
    "1. Requirements refinement meeting",
    "2. Contract signing and down payment (30%)",
    "3. Project kickoff",
    "4. Weekly deliverables and reviews"
  ];
  steps.forEach(step => addText(step, 12));
  
  y += 10;

  // Contact
  addText("CONTACT", 14, true);
  addText("Miguel Fernandez Gargurevich", 12, true);
  addText("Email: miguel@gargurevich.com", 12);
  addText("WhatsApp: +51 987 654 321", 12);
  addText("Web: https://miguelgargurevich.com", 12);
  
  y += 5;
  addText("Thank you for considering my services!", 12, true);
  addText("This proposal is valid for 30 days.", 10);
}
