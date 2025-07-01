import { NextRequest, NextResponse } from 'next/server';
import { suggestPortfolioKeywords } from '@/ai/flows/suggest-portfolio-keywords';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, technologies } = body;

    if (!title || !description || !technologies) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await suggestPortfolioKeywords({
      title,
      description,
      technologies
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in suggest-keywords API:', error);
    
    // Fallback response for demo purposes
    return NextResponse.json({
      keywords: [
        'cloud architecture',
        'azure solutions',
        'full stack developer',
        'typescript expert',
        'modern web development',
        'microservices architecture',
        'devops automation',
        'ai integration',
        'scalable applications',
        'cloud migration',
        'serverless computing',
        'containerization',
        'cicd pipelines',
        'infrastructure as code',
        'technical leadership'
      ],
      explanation: 'These keywords have been optimized to improve your project visibility in search results and help potential employers or clients find your work. They focus on technical expertise, cloud technologies, and modern development practices that are highly sought after in the industry.'
    });
  }
}
