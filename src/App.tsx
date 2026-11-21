import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Questions } from './components/Questions';
import { Tutorial } from './components/Tutorial';
import { How } from './components/How';
import { Trust } from './components/Trust';
import { Calculator } from './components/Calculator';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-950 font-sans text-fg antialiased">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Questions />
        <Tutorial />
        <How />
        <Trust />
        <Calculator />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
