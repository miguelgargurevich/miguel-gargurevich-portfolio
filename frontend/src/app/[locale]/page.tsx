import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Projects from '@/components/projects';
import Skills from '@/components/skills';
import ChatTeaser from '@/components/chat-teaser';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <ChatTeaser />
      <Contact />
      <Footer />
    </main>
  );
}
