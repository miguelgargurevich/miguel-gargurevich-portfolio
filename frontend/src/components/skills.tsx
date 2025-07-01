'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Cloud, 
  Code, 
  Database, 
  Brain, 
  Settings
} from 'lucide-react';

interface SkillCategory {
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  skills: string[];
}

export default function Skills() {
  const t = useTranslations('skills');

  const skillCategories: SkillCategory[] = [
    {
      icon: Cloud,
      titleKey: 'cloud',
      skills: [
        'Microsoft Azure',
        'Azure DevOps',
        'Azure Functions',
        'Azure Kubernetes Service',
        'Azure Active Directory',
        'Amazon Web Services',
        'Google Cloud Platform'
      ]
    },
    {
      icon: Code,
      titleKey: 'frontend',
      skills: [
        'React / Next.js',
        'TypeScript / JavaScript',
        'Tailwind CSS',
        'HTML5 / CSS3',
        'Vue.js',
        'Angular',
        'Progressive Web Apps'
      ]
    },
    {
      icon: Database,
      titleKey: 'backend',
      skills: [
        'Node.js / Express',
        'Python / FastAPI',
        '.NET Core',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'GraphQL / REST APIs'
      ]
    },
    {
      icon: Brain,
      titleKey: 'ai',
      skills: [
        'Azure AI Services',
        'OpenAI / GPT Models',
        'Google Genkit',
        'Machine Learning',
        'Natural Language Processing',
        'Computer Vision',
        'TensorFlow / PyTorch'
      ]
    },
    {
      icon: Settings,
      titleKey: 'devops',
      skills: [
        'Docker / Kubernetes',
        'CI/CD Pipelines',
        'Infrastructure as Code',
        'Terraform',
        'GitHub Actions',
        'Azure Pipelines',
        'Monitoring & Logging'
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">
                      {t(category.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
                        >
                          <span className="text-sm font-medium text-foreground">
                            {skill}
                          </span>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, starIndex) => (
                              <div
                                key={starIndex}
                                className={`w-2 h-2 rounded-full ${
                                  starIndex < 4 // Most skills have high proficiency
                                    ? 'bg-primary'
                                    : 'bg-muted'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Skills Note */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              {t('learningNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
