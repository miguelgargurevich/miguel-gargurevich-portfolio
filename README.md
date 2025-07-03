# Miguel Fernandez Gargurevich - Portfolio Website

🌟 **Modern multilingual portfolio website with AI-powered keyword optimization**

[![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)
[![Google AI](https://img.shields.io/badge/Google-Gemini_AI-4285F4)](https://ai.google.dev/)

## 🚀 Overview

Professional portfolio website showcasing web development expertise, digital solutions projects, and modern application capabilities. Built with modern technologies and featuring real AI-powered keyword optimization for enhanced SEO and discoverability.

## ✨ Features

### 🌍 **Multilingual Support**
- **English** and **Spanish** translations
- Automatic language detection and routing
- Seamless language switching

### 🎯 **Key Sections**
- **Hero Section**: Professional introduction with dynamic animations
- **About Me**: Detailed background and expertise overview
- **Projects Showcase**: Featured projects with live demos and source code
- **Skills Matrix**: Technical competencies organized by domain
- **AI Keyword Optimizer**: Real-time keyword generation for project optimization
- **Contact Form**: Direct communication with validation and success states

### 🤖 **AI-Powered Features**
- **Google Gemini Integration**: Real AI keyword generation
- **Smart Prompting**: Context-aware keyword suggestions
- **SEO Optimization**: Strategic keyword selection for recruiters and clients
- **Fallback System**: Robust error handling with backup algorithms

### 🛠 **Technical Stack**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict typing
- **Styling**: Tailwind CSS + ShadCN UI components
- **AI**: Google Generative AI (Gemini Pro)
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **Deployment Ready**: Optimized for Vercel/Netlify

## 📁 Project Structure

```
miguelgargurevichSite/
├── .github/                    # GitHub configurations
├── .vscode/                    # VS Code settings
├── frontend/                   # Next.js application
│   ├── src/
│   │   ├── app/               # Next.js App Router
│   │   │   ├── [locale]/      # Internationalized routes
│   │   │   ├── api/           # API endpoints
│   │   │   └── globals.css    # Global styles
│   │   ├── components/        # React components
│   │   │   ├── ui/            # ShadCN UI components
│   │   │   ├── header.tsx     # Navigation
│   │   │   ├── hero.tsx       # Main banner
│   │   │   ├── about.tsx      # About section
│   │   │   ├── projects.tsx   # Projects showcase
│   │   │   ├── skills.tsx     # Skills matrix
│   │   │   ├── keyword-optimizer.tsx # AI keyword tool
│   │   │   ├── contact.tsx    # Contact form
│   │   │   └── footer-component.tsx # Footer
│   │   ├── ai/
│   │   │   └── flows/         # AI integration logic
│   │   ├── messages/          # Translation files
│   │   │   ├── en.json        # English translations
│   │   │   └── es.json        # Spanish translations
│   │   └── lib/               # Utilities
│   ├── i18n/                  # Internationalization config
│   ├── public/                # Static assets
│   └── package.json           # Dependencies
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🚦 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google AI API key (for keyword optimization)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/miguelgargurevich/portfolio-site.git
   cd portfolio-site
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Google AI API key
   GOOGLE_AI_API_KEY=your_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🌍 Internationalization

The site supports English and Spanish with automatic detection:

- **English**: `/en` or default route
- **Spanish**: `/es`
- **Auto-redirect**: Based on browser language preference

### Adding New Languages

1. Create translation file in `src/messages/[locale].json`
2. Add locale to `i18n/request.ts` configuration
3. Update `next.config.js` with new locale

## 🤖 AI Integration

### Google Gemini AI
The keyword optimizer uses Google's Gemini Pro model for intelligent keyword generation:

- **Context-aware**: Analyzes project title, description, and tech stack
- **SEO-optimized**: Targets recruiters, clients, and industry professionals
- **Fallback system**: Local algorithms if AI service is unavailable

### Configuration
```typescript
// .env.local
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

## 🎨 Customization

### Themes
Built with CSS variables for easy theming:
- Light/Dark mode support
- Customizable color palette
- Responsive design system

### Components
Modular component architecture:
- Reusable UI components
- TypeScript interfaces
- Props validation

## 📊 Performance

- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Minimized with Next.js optimization
- **SSG/SSR**: Static generation with dynamic capabilities

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy 'out' directory
```

### Docker
```dockerfile
# Included Dockerfile for containerized deployment
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 🔐 Security

- **API Keys**: Stored in environment variables
- **HTTPS**: Enforced in production
- **CSP**: Content Security Policy headers
- **Input Validation**: Form validation and sanitization

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Miguel Fernandez Gargurevich**
- Web Developer & Digital Solutions Specialist
- Specialized in Azure, AI integration, and modern web applications

### Connect
- 🌐 **Website**: [miguelgargurevich.com](https://miguelgargurevich.com)
- 💼 **LinkedIn**: [Miguel Fernandez Gargurevich](https://linkedin.com/in/miguelgargurevich)
- 📧 **Email**: miguel@gargurevich.com
- 🐙 **GitHub**: [@miguelgargurevich](https://github.com/miguelgargurevich)

---

⭐ **If you find this project useful, please consider giving it a star!**

Built with ❤️ using Next.js, TypeScript, and Google AI
