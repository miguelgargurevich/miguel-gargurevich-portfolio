import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Miguel Fernandez Gargurevich - Portfolio',
    short_name: 'M.F. Gargurevich',
    description: 'Desarrollador Web & Especialista en Soluciones Digitales especializado en Azure Cloud, IA/ML y desarrollo full-stack.',
    start_url: '/es',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0ea5e9',
    orientation: 'portrait-primary',
    categories: ['productivity', 'business', 'developer', 'portfolio'],
    lang: 'es',
    scope: '/',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable'
      }
    ],
    screenshots: [
      {
        src: '/og-image.svg',
        sizes: '1200x630',
        type: 'image/svg+xml',
        label: 'Portfolio Homepage'
      }
    ],
    related_applications: [],
    prefer_related_applications: false
  }
}
