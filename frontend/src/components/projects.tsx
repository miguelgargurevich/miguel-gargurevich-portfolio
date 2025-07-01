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
      title: t('projectList.azureMigration.title'),
      description: t('projectList.azureMigration.description'),
      technologies: ["Azure", "TypeScript", "React", "Node.js", "PostgreSQL"],
      demoUrl: "https://demo.example.com",
      githubUrl: "https://github.com/miguelgargurevich/azure-migration-platform"
    },
    {
      title: t('projectList.aiOptimizer.title'),
      description: t('projectList.aiOptimizer.description'),
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Google Genkit", "Azure"],
      demoUrl: "https://miguelgargurevich.com",
      githubUrl: "https://github.com/miguelgargurevich/portfolio-site"
    },
    {
      title: t('projectList.microservicesDashboard.title'),
      description: t('projectList.microservicesDashboard.description'),
      technologies: ["Docker", "Kubernetes", "Python", "FastAPI", "Redis"],
      githubUrl: "https://github.com/miguelgargurevich/microservices-dashboard"
    },
    {
      title: t('projectList.dataPipeline.title'),
      description: t('projectList.dataPipeline.description'),
      technologies: ["Azure Functions", "Python", "CosmosDB", "Event Grid", "Power BI"],
      demoUrl: "https://analytics.example.com"
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
