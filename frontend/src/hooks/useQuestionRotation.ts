import { useState, useEffect, useCallback } from 'react';

interface UseQuestionRotationOptions {
  questions: string[];
  questionsPerBatch: number;
  rotationInterval: number;
}

export function useQuestionRotation({
  questions,
  questionsPerBatch = 4,
  rotationInterval = 20000
}: UseQuestionRotationOptions) {
  const [currentQuestions, setCurrentQuestions] = useState<string[]>([]);
  const [isRotating, setIsRotating] = useState(false);
  const [showNewLabel, setShowNewLabel] = useState(false);

  // Memoize the function to get random questions
  const getRandomQuestions = useCallback(() => {
    if (questions.length === 0) return [];
    
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(questionsPerBatch, questions.length));
  }, [questions, questionsPerBatch]);

  // Initialize with random questions
  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestions(getRandomQuestions());
    }
  }, [getRandomQuestions, questions.length]);

  // Auto-rotate questions
  useEffect(() => {
    if (questions.length === 0) return;

    const interval = setInterval(() => {
      setIsRotating(true);
      setShowNewLabel(true);
      
      setTimeout(() => {
        setCurrentQuestions(getRandomQuestions());
        setIsRotating(false);
        
        // Hide "new" label after 3 seconds
        setTimeout(() => setShowNewLabel(false), 3000);
      }, 400);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [getRandomQuestions, rotationInterval, questions.length]);

  // Manual refresh function
  const refreshQuestions = useCallback(() => {
    if (questions.length === 0) return;
    
    setIsRotating(true);
    setShowNewLabel(true);
    
    setTimeout(() => {
      setCurrentQuestions(getRandomQuestions());
      setIsRotating(false);
      
      // Hide "new" label after 3 seconds
      setTimeout(() => setShowNewLabel(false), 3000);
    }, 400);
  }, [getRandomQuestions, questions.length]);

  return {
    currentQuestions,
    isRotating,
    showNewLabel,
    refreshQuestions
  };
}
