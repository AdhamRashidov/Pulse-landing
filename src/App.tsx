import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BannerShowcase } from './components/BannerShowcase';
import { Features } from './components/Features';
import { RoiCalculator } from './components/RoiCalculator';
import { HowItWorks } from './components/HowItWorks';
import { Faq } from './components/Faq';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 flex flex-col font-sans antialiased">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BannerShowcase />
        <Features />
        <RoiCalculator />
        <HowItWorks />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}

export default App;
