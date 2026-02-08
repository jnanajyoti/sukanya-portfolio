import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import WaveDivider from './components/WaveDivider/WaveDivider';
import Hero from './sections/Hero/Hero';
import Research from './sections/Research/Research';
import Publications from './sections/Publications/Publications';
import Education from './sections/Education/Education';
import Skills from './sections/Skills/Skills';
import Leadership from './sections/Leadership/Leadership';
import Contact from './sections/Contact/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WaveDivider />
        <Research />
        <WaveDivider flip />
        <Publications />
        <WaveDivider />
        <Education />
        <WaveDivider flip />
        <Skills />
        <WaveDivider />
        <Leadership />
        <WaveDivider flip />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
