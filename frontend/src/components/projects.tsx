'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
}

export default function Projects() {
  const t = useTranslations('projects');

  const projects: Project[] = [
    {
      title: t('projectList.miguelGargurevichPortfolio.title'),
      description: t('projectList.miguelGargurevichPortfolio.description'),
      technologies: ["Next.js 15", "TypeScript", "Google Gemini AI"],
      demoUrl: "https://miguelgargurevich.com",
      githubUrl: "https://github.com/miguelgargurevich/miguel-gargurevich-portfolio"
    },
    {
      title: t('projectList.lumic.title'),
      description: t('projectList.lumic.description'),
      technologies: ["TypeScript"],
      githubUrl: "https://github.com/miguelgargurevich/lumic"
    },
    {
      title: t('projectList.habitappNew.title'),
      description: t('projectList.habitappNew.description'),
      technologies: ["TypeScript"],
      githubUrl: "https://github.com/miguelgargurevich/HabitappNew"
    },
    {
      title: t('projectList.agileProject.title'),
      description: t('projectList.agileProject.description'),
      technologies: ["JavaScript"],
      githubUrl: "https://github.com/miguelgargurevich/AgileProject"
    },
    {
      title: t('projectList.mgConsultoresCore.title'),
      description: t('projectList.mgConsultoresCore.description'),
      technologies: ["CSS"],
      githubUrl: "https://github.com/miguelgargurevich/MGConsultoresCore"
    },
    {
      title: t('projectList.calendarApp.title'),
      description: t('projectList.calendarApp.description'),
      technologies: ["JavaScript"],
      githubUrl: "https://github.com/miguelgargurevich/CalendarApp"
    }
  ];

  return (
    <section id="projects" className="py-20">
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      {t('technologies')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex gap-2">
                  {project.demoUrl && (
                    <Button
                      variant="default"
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t('viewProject')}
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        {t('viewCode')}
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
