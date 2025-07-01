'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Sparkles, Zap } from 'lucide-react';
import { useQuestionRotation } from '@/hooks/useQuestionRotation';

interface DynamicQuickQuestionsProps {
  onQuestionSelect: (question: string) => void;
}

export default function DynamicQuickQuestions({ onQuestionSelect }: DynamicQuickQuestionsProps) {
  const t = useTranslations('professionalChat');

  // Get all questions from translations
  const allQuestions: string[] = t.raw('quickQuestions') as string[];

  // Use custom hook for question rotation
  const {
    currentQuestions,
    isRotating,
    showNewLabel,
    refreshQuestions
  } = useQuestionRotation({
    questions: allQuestions,
    questionsPerBatch: 4,
    rotationInterval: 20000 // 20 seconds
  });

  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-background to-primary/5">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
      
      <CardHeader className="pb-3 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              {showNewLabel && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-ping" />
              )}
            </div>
            <CardTitle className="text-lg bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {t('quickActions')}
            </CardTitle>
            {showNewLabel && (
              <span className="px-2 py-0.5 text-xs bg-green-500 text-white rounded-full animate-bounce">
                {t('quickActionsNew')}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshQuestions}
            className="h-8 w-8 p-0 hover:bg-primary/10 hover:scale-110 transition-all duration-200"
            disabled={isRotating}
          >
            <RefreshCw className={`h-4 w-4 transition-transform duration-500 ${isRotating ? 'animate-spin' : 'hover:rotate-180'}`} />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Zap className="h-3 w-3" />
          {t('quickActionsDescription')}
        </p>
      </CardHeader>
      <CardContent className="space-y-2 relative">
        <div className={`transition-all duration-400 ${isRotating ? 'opacity-30 scale-95 blur-sm' : 'opacity-100 scale-100'}`}>
          {currentQuestions.map((question, index) => (
            <Button
              key={`${question}-${index}-${Date.now()}`}
              variant="outline"
              className="w-full justify-start text-xs h-auto py-3 px-3 text-left hover:bg-primary/10 hover:border-primary/30 hover:shadow-md hover:scale-[1.02] transition-all duration-300 group border-primary/10"
              onClick={() => onQuestionSelect(question)}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <span className="line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {question}
              </span>
            </Button>
          ))}
        </div>
        
        {/* Animated indicator */}
        <div className="flex justify-center pt-2">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  isRotating ? 'bg-primary animate-pulse' : 'bg-primary/30'
                }`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
