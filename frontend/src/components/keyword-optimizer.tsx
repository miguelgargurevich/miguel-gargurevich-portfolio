'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Copy, CheckCircle, Sparkles } from 'lucide-react';

interface KeywordResult {
  keywords: string[];
  explanation: string;
}

export default function KeywordOptimizer() {
  const t = useTranslations('keywordOptimizer');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: ''
  });
  const [result, setResult] = useState<KeywordResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call to our Genkit flow
      const response = await fetch('/api/suggest-keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          technologies: formData.technologies.split(',').map(tech => tech.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate keywords');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error generating keywords:', error);
      // Fallback keywords for demo purposes
      setResult({
        keywords: [
          'cloud architecture',
          'azure solutions',
          'full stack developer',
          'typescript expert',
          'modern web apps',
          'microservices',
          'devops engineer',
          'ai integration',
          'scalable systems',
          'cloud migration'
        ],
        explanation: 'These keywords are optimized for technical roles and cloud expertise, helping improve visibility for potential employers and clients.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result) {
      const keywordsText = result.keywords.join(', ');
      await navigator.clipboard.writeText(keywordsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="keyword-optimizer" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t('title')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>{t('projectInfo')}</CardTitle>
                <CardDescription>
                  {t('projectInfoDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('projectTitle')}
                    </label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder={t('titlePlaceholder')}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('projectDescription')}
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder={t('descriptionPlaceholder')}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('technologies')}
                    </label>
                    <Input
                      type="text"
                      value={formData.technologies}
                      onChange={(e) => handleInputChange('technologies', e.target.value)}
                      placeholder={t('technologiesPlaceholder')}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('optimizing')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        {t('optimize')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>{t('results')}</CardTitle>
                <CardDescription>
                  {t('aiKeywordsDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    {/* Keywords */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-foreground">{t('suggestedKeywords')}</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopy}
                          className="flex items-center gap-2"
                        >
                          {copied ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              {t('copied')}
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              {t('copy')}
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Explanation */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{t('explanation')}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.explanation}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {t('emptyStateMessage')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
