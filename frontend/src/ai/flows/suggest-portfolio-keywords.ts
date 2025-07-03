// AI service for keyword generation using Google Gemini AI
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ProjectData {
  title: string;
  description: string;
  technologies: string[];
}

export interface KeywordResponse {
  keywords: string[];
  explanation: string;
}

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function suggestPortfolioKeywords(input: ProjectData): Promise<KeywordResponse> {
  try {
    const { title, description, technologies } = input;
    
    // Create a comprehensive prompt for the AI
    const prompt = `
You are an expert SEO and technical recruiter consultant. Analyze the following project details and generate strategic keywords for portfolio optimization:

Project Title: ${title}
Project Description: ${description}
Technologies Used: ${technologies.join(', ')}

Please provide:
1. 15-20 highly relevant keywords that would help this project be discovered by:
   - Technical recruiters looking for specific skills
   - Potential clients searching for solutions
   - Industry professionals browsing portfolios
   
2. A brief explanation of your keyword strategy

Focus on:
- Technical skills and frameworks mentioned
- Industry domains and use cases
- Professional roles and competencies
- Trending technologies and buzzwords
- SEO-optimized terms that real people search for

Return your response in the following JSON format:
{
  "keywords": ["keyword1", "keyword2", ...],
  "explanation": "Your strategic explanation here"
}

Make sure keywords are relevant, searchable, and cover both technical and business aspects of the project.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Try to parse the JSON response
      const aiResponse = JSON.parse(text);
      
      // Validate the response structure
      if (aiResponse.keywords && Array.isArray(aiResponse.keywords) && aiResponse.explanation) {
        return {
          keywords: aiResponse.keywords.slice(0, 20), // Limit to 20 keywords
          explanation: aiResponse.explanation
        };
      }
    } catch (parseError) {
      console.warn('Failed to parse AI response as JSON, falling back to text parsing:', parseError);
    }
    
    // Fallback: Extract keywords from text if JSON parsing fails
    const fallbackKeywords = extractKeywordsFromText(text, technologies);
    
    return {
      keywords: fallbackKeywords,
      explanation: "AI-generated keywords based on your project details, optimized for discoverability by technical recruiters and potential clients."
    };
    
  } catch (error) {
    console.error('AI keyword generation failed:', error);
    
    // Fallback to enhanced mock implementation
    return generateFallbackKeywords(input);
  }
}

// Helper function to extract keywords from AI text response
function extractKeywordsFromText(text: string, technologies: string[]): string[] {
  const keywords = new Set<string>();
  
  // Add technologies as base keywords
  technologies.forEach(tech => keywords.add(tech));
  
  // Common technical keywords to look for in the text
  const technicalTerms = [
    'frontend', 'backend', 'full-stack', 'web development', 'mobile development',
    'cloud computing', 'devops', 'microservices', 'api', 'database', 'sql',
    'javascript', 'typescript', 'python', 'java', 'react', 'angular', 'vue',
    'node.js', 'express', 'mongodb', 'postgresql', 'redis', 'kubernetes',
    'docker', 'aws', 'azure', 'gcp', 'ci/cd', 'agile', 'scrum', 'git',
    'machine learning', 'artificial intelligence', 'data science', 'analytics',
    'responsive design', 'user experience', 'user interface', 'scalability',
    'performance', 'security', 'testing', 'automation'
  ];
  
  const lowerText = text.toLowerCase();
  technicalTerms.forEach(term => {
    if (lowerText.includes(term.toLowerCase())) {
      keywords.add(term);
    }
  });
  
  return Array.from(keywords).slice(0, 15);
}

// Enhanced fallback keyword generation
function generateFallbackKeywords(input: ProjectData): KeywordResponse {
  
  const { title, description, technologies } = input;
  
  // Smart keyword generation based on input
  const techKeywords = technologies.flatMap(tech => {
    const lowerTech = tech.toLowerCase();
    const keywords = [tech];
    
    // Add related keywords based on technology
    if (lowerTech.includes('react')) keywords.push('frontend development', 'component architecture', 'jsx');
    if (lowerTech.includes('next')) keywords.push('server-side rendering', 'full-stack development', 'react framework');
    if (lowerTech.includes('typescript')) keywords.push('type safety', 'javascript', 'static typing');
    if (lowerTech.includes('azure')) keywords.push('cloud computing', 'microsoft cloud', 'cloud architecture', 'devops');
    if (lowerTech.includes('node')) keywords.push('backend development', 'javascript runtime', 'server development');
    if (lowerTech.includes('python')) keywords.push('data science', 'machine learning', 'backend development');
    if (lowerTech.includes('docker')) keywords.push('containerization', 'microservices', 'devops');
    if (lowerTech.includes('kubernetes')) keywords.push('container orchestration', 'scalability', 'cloud native');
    
    return keywords;
  });
  
  // Domain-specific keywords based on title and description
  const domainKeywords = [];
  const combinedText = `${title} ${description}`.toLowerCase();
  
  if (combinedText.includes('ai') || combinedText.includes('artificial intelligence')) {
    domainKeywords.push('artificial intelligence', 'machine learning', 'AI integration', 'intelligent systems');
  }
  if (combinedText.includes('cloud') || combinedText.includes('migration')) {
    domainKeywords.push('cloud migration', 'cloud architecture', 'scalable infrastructure', 'cloud solutions');
  }
  if (combinedText.includes('dashboard') || combinedText.includes('monitoring')) {
    domainKeywords.push('data visualization', 'real-time monitoring', 'analytics dashboard', 'business intelligence');
  }
  if (combinedText.includes('api') || combinedText.includes('microservices')) {
    domainKeywords.push('API development', 'microservices architecture', 'RESTful services', 'system integration');
  }
  if (combinedText.includes('portfolio') || combinedText.includes('website')) {
    domainKeywords.push('web development', 'responsive design', 'user experience', 'modern web applications');
  }
  
  // Professional keywords
  const professionalKeywords = [
    'software engineer',
    'full-stack developer',
    'web developer digital solutions specialist',
    'technical leadership',
    'agile development',
    'best practices',
    'scalable applications',
    'performance optimization',
    'code quality',
    'problem solving'
  ];
  
  // Combine and deduplicate keywords
  const allKeywords = [
    ...techKeywords,
    ...domainKeywords,
    ...professionalKeywords
  ];
  
  const uniqueKeywords = Array.from(new Set(allKeywords))
    .filter(keyword => keyword.length > 2)
    .slice(0, 15);
  
  return {
    keywords: uniqueKeywords,
    explanation: `These keywords have been strategically selected based on your project's technical stack (${technologies.join(', ')}) and domain focus. They target both technical recruiters searching for specific skills and potential clients looking for solutions in your area of expertise. The combination of technical terms, industry buzzwords, and professional roles will improve your project's discoverability across different search contexts.`
  };
}
