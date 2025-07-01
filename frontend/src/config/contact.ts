// Configuration file for contact information
export const CONTACT_CONFIG = {
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51966918363',
    // Helper function to get WhatsApp URL
    getUrl: (message: string) => {
      const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51966918363';
      return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    }
  },
  email: 'miguel@gargurevich.com',
  location: 'Remoto / Global',
  availability: 'Abierto a nuevas oportunidades'
} as const;

export default CONTACT_CONFIG;
