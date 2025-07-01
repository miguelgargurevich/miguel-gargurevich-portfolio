# Miguel Fernandez Gargurevich - Portfolio Website

A modern, multilingual portfolio website built with Next.js, featuring an AI-powered keyword optimizer for enhanced SEO and project visibility.

## 🚀 Features

- **Multilingual Support**: English and Spanish with `next-intl`
- **Modern Tech Stack**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **AI-Powered SEO**: Keyword optimizer for better project discoverability
- **Responsive Design**: Beautiful UI with ShadCN components
- **Dark/Light Theme**: Automatic theme switching
- **Professional Sections**:
  - Hero section with animated elements
  - About me with statistics
  - Project showcase with live demos
  - Skills matrix with proficiency indicators
  - AI keyword optimizer tool
  - Contact form with validation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **AI Integration**: Custom keyword generation algorithm (mock implementation)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── layout.tsx      # Locale-specific layout
│   │   └── page.tsx        # Main page
│   ├── api/
│   │   └── suggest-keywords/ # API route for keyword suggestions
│   └── globals.css         # Global styles with CSS variables
├── components/
│   ├── ui/                 # Reusable UI components (ShadCN)
│   ├── header.tsx          # Navigation with language switcher
│   ├── hero.tsx           # Hero section
│   ├── about.tsx          # About section
│   ├── projects.tsx       # Project showcase
│   ├── skills.tsx         # Skills matrix
│   ├── keyword-optimizer.tsx # AI keyword optimizer
│   ├── contact.tsx        # Contact form
│   └── footer-component.tsx # Footer
├── ai/
│   └── flows/             # AI logic for keyword generation
├── lib/
│   └── utils.ts           # Utility functions
├── messages/              # Internationalization messages
│   ├── en.json           # English translations
│   └── es.json           # Spanish translations
├── i18n.ts               # Internationalization config
└── middleware.ts         # Next.js middleware for i18n
```

## 🌍 Internationalization

The website supports English and Spanish languages:

- **English**: `/en` or `/`
- **Spanish**: `/es`

Add new languages by:
1. Creating a new message file in `src/messages/`
2. Adding the locale to `src/i18n.ts`
3. Updating the middleware configuration

## 🎨 Styling

The project uses Tailwind CSS with a custom design system:

- **CSS Variables**: Defined in `src/app/globals.css`
- **ShadCN Components**: Pre-built, accessible components
- **Dark/Light Theme**: Automatic theme switching
- **Responsive Design**: Mobile-first approach

## 🔧 Customization

### Adding New Projects

Edit the `projects` array in `src/components/projects.tsx`:

```typescript
const projects = [
  {
    title: "Your Project Title",
    description: "Project description...",
    technologies: ["Tech1", "Tech2"],
    demoUrl: "https://demo.com",
    githubUrl: "https://github.com/..."
  }
];
```

### Modifying Skills

Update the `skillCategories` array in `src/components/skills.tsx`:

```typescript
const skillCategories = [
  {
    icon: YourIcon,
    titleKey: 'translationKey',
    skills: ['Skill 1', 'Skill 2', ...]
  }
];
```

### AI Keyword Optimizer

The keyword optimizer uses a mock implementation. To integrate with real AI services:

1. Install your preferred AI SDK (OpenAI, Google AI, etc.)
2. Update `src/ai/flows/suggest-portfolio-keywords.ts`
3. Add API keys to environment variables
4. Update the API route in `src/app/api/suggest-keywords/route.ts`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy your app

### Other Platforms

Build the project and deploy the `.next` folder:

```bash
npm run build
```

## 🔐 Environment Variables

For production deployment, you may need:

```env
# AI Service Configuration (if using real AI)
OPENAI_API_KEY=your_openai_key
GOOGLE_AI_API_KEY=your_google_ai_key

# Email Service (for contact form)
SMTP_HOST=your_smtp_host
SMTP_USER=your_email
SMTP_PASS=your_password
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

Miguel Fernandez Gargurevich - miguel@gargurevich.com

Project Link: [https://github.com/miguelgargurevich/portfolio-site](https://github.com/miguelgargurevich/portfolio-site)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
