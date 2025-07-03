'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send, Bot, User, MessageCircle, Trash2, FileText, Download, ArrowLeft } from 'lucide-react';
import DynamicQuickQuestions from '@/components/dynamic-quick-questions';
import Footer from '@/components/footer';
import { CONTACT_CONFIG } from '@/config/contact';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ProfessionalChat() {
  const t = useTranslations('professionalChat');
  const homeT = useTranslations('backToHome');
  const locale = useLocale();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  // Function to render text with basic markdown (bold)
  const renderTextWithMarkdown = (text: string) => {
    // Split text by ** for bold formatting
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove ** and make it bold
        const boldText = part.slice(2, -2);
        return <strong key={index}>{boldText}</strong>;
      }
      return part;
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Only scroll to bottom if it's not the initial load
    if (!isInitialLoad.current) {
      scrollToBottom();
    }
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'assistant',
      content: t('welcomeMessage') + ' ' + t('howCanIHelp'),
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);

    setTimeout(() => {
      isInitialLoad.current = false;
    }, 100);
  }, [t]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/professional-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          locale: locale // Enviar el idioma actual al backend
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: t('errorMessage') + ' Por favor, intenta nuevamente o pregunta algo diferente.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'assistant',
      content: t('welcomeMessage'),
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  // Function to estimate project cost based on conversation content
  const estimateProjectCost = (conversationText: string) => {
    let estimatedCost = 500; // Base cost
    const text = conversationText.toLowerCase();
    
    // Add costs based on mentioned features
    if (text.includes('ecommerce') || text.includes('tienda')) estimatedCost += 1500;
    if (text.includes('cms') || text.includes('administración')) estimatedCost += 800;
    if (text.includes('seo')) estimatedCost += 300;
    if (text.includes('analytics')) estimatedCost += 200;
    if (text.includes('app móvil') || text.includes('mobile app')) estimatedCost += 3000;
    if (text.includes('ia') || text.includes('inteligencia artificial') || text.includes('chatbot')) estimatedCost += 1200;
    if (text.includes('hosting') || text.includes('nube') || text.includes('cloud')) estimatedCost += 150;
    
    return estimatedCost;
  };

  // Function to generate PDF proposal
  const generatePDFProposal = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const conversationText = messages.map(m => `${m.type}: ${m.content}`).join('\n');
      const estimatedCost = estimateProjectCost(conversationText);
      
      // Call API to generate PDF
      const response = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation: messages,
          estimatedCost,
          clientLocale: locale
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `propuesta-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Show error message
      const errorMessage: Message = {
        id: (Date.now()).toString(),
        type: 'assistant',
        content: t('pdfError'),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Function to send proposal via WhatsApp
  const sendProposalWhatsApp = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const conversationText = messages.map(m => `${m.type}: ${m.content}`).join('\n');
      const estimatedCost = estimateProjectCost(conversationText);
      
      // Generate summary for WhatsApp
      const summary = `
Hola! Aquí tienes un resumen de nuestra conversación:

💬 *Consulta realizada:* ${new Date().toLocaleDateString()}
💰 *Estimación inicial:* $${estimatedCost.toLocaleString()} USD

📋 *Características discutidas:*
${messages.filter(m => m.type === 'user').map(m => `• ${m.content.substring(0, 100)}...`).join('\n')}

📞 *Próximos pasos:*
• Análisis detallado de requerimientos
• Propuesta formal con cronograma
• Reunión para definir detalles técnicos

¡Gracias por tu interés! Te enviaré la propuesta detallada en PDF pronto.
      `.trim();

      // Open WhatsApp with the summary
      const whatsappUrl = CONTACT_CONFIG.whatsapp.getUrl(summary);
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      console.error('Error preparing WhatsApp message:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      <section className="py-10 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Back to Home Button */}
            <div className="mb-6">
              <Link href={`/${locale}`}>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
                  title={homeT('tooltip')}
                >
                  <ArrowLeft className="w-4 h-4" />
                  {homeT('button')}
                </Button>
              </Link>
            </div>

            {/* Section Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                  {t('title')}
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Chat Interface - Takes more space */}
            <div className="xl:col-span-3">
              <Card className="h-[600px] md:h-[700px] flex flex-col overflow-hidden">
                <CardHeader className="flex-shrink-0 border-b px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Bot className="w-5 h-5 text-primary" />
                        {t('chatTitle')}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {t('chatDescription')}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearChat}
                      className="flex items-center gap-2 text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('clearChat')}</span>
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col min-h-0 p-0">
                  {/* Messages Container with fixed height and scroll */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 scroll-smooth">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[90%] sm:max-w-[85%] rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {message.type === 'assistant' && (
                              <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            )}
                            {message.type === 'user' && (
                              <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm leading-relaxed whitespace-pre-line break-words">
                                {renderTextWithMarkdown(message.content)}
                              </p>
                              <p className="text-xs opacity-60 mt-1">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted text-muted-foreground rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Bot className="w-4 h-4" />
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">{t('typing')}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Input Form - Fixed at bottom */}
                  <div className="flex-shrink-0 border-t bg-background p-4">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={t('inputPlaceholder')}
                        disabled={isLoading}
                        className="flex-1 h-10"
                      />
                      <Button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        size="sm"
                        className="px-4"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Quick Actions and Proposal Options */}
            <div className="xl:col-span-1 space-y-6">
              {/* Proposal Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5 text-primary" />
                    {t('proposalTitle')}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {t('proposalDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={generatePDFProposal}
                    disabled={isGeneratingPDF || messages.length <= 1}
                    className="w-full"
                    size="sm"
                  >
                    {isGeneratingPDF ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        {t('generating')}
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        {t('downloadPDF')}
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={sendProposalWhatsApp}
                    disabled={isGeneratingPDF || messages.length <= 1}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t('sendWhatsApp')}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    {t('proposalNote')}
                  </p>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <DynamicQuickQuestions onQuestionSelect={setInputValue} />
            </div>
          </div>
        </div>
      </div>
      </section>
      
      <Footer />
    </>
  );
}
