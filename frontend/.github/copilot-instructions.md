<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Miguel Fernandez Gargurevich Portfolio - Copilot Instructions

## Project Overview
This is a modern, multilingual portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. It features an AI-powered keyword optimizer for enhanced SEO and project visibility.

## Key Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI components
- **Internationalization**: next-intl for English/Spanish support
- **AI Integration**: Custom keyword generation service

## Code Style Guidelines

### TypeScript
- Use strict TypeScript with proper type definitions
- Prefer interfaces over types for object definitions
- Use proper typing for React components and props
- Avoid `any` types - use proper type annotations

### React/Next.js
- Use functional components with hooks
- Prefer `'use client'` directive for client-side components
- Use Next.js App Router conventions
- Follow React best practices for state management
- Use proper error boundaries and loading states

### Styling
- Use Tailwind CSS utility classes
- Follow the existing design system with CSS variables
- Use ShadCN UI components for consistency
- Maintain responsive design (mobile-first approach)
- Use proper semantic HTML elements

### File Organization
- Components go in `src/components/`
- UI components go in `src/components/ui/`
- API routes go in `src/app/api/`
- Internationalization messages go in `src/messages/`
- Types and interfaces can be defined inline or in separate files

### Internationalization
- All user-facing text should use `useTranslations` hook
- Add new translation keys to both `en.json` and `es.json`
- Use semantic key names (e.g., `hero.title`, `nav.about`)
- Support both English (`en`) and Spanish (`es`) languages

### AI Integration
- The keyword optimizer uses a mock implementation
- For real AI integration, use the established pattern in `suggest-portfolio-keywords.ts`
- API routes should handle errors gracefully with fallback responses
- Simulate processing delays for better UX

## Component Patterns

### ShadCN UI Components
- Import from `@/components/ui/`
- Use proper props and variants
- Maintain accessibility standards
- Follow existing component patterns

### Form Handling
- Use controlled components with React state
- Implement proper validation
- Show loading and success states
- Handle errors gracefully

### Navigation
- Use Next.js `Link` components
- Support language switching
- Maintain active states
- Use smooth scrolling for internal links

## Performance Considerations
- Use Next.js Image component for images
- Implement proper loading states
- Use React.memo for heavy components when needed
- Optimize bundle size with proper imports

## Accessibility
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Maintain proper color contrast
- Support screen readers

## SEO Optimization
- Use proper meta tags
- Implement structured data where appropriate
- Optimize for Core Web Vitals
- Use the keyword optimizer feature for content enhancement

When suggesting code changes or new features, ensure they align with these patterns and maintain consistency with the existing codebase.
