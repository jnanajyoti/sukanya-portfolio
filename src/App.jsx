import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import WaveDivider from './components/WaveDivider/WaveDivider';
import Hero from './sections/Hero/Hero';
import Research from './sections/Research/Research';
import Publications from './sections/Publications/Publications';
import Conferences from './sections/Conferences/Conferences';
import Education from './sections/Education/Education';
import Awards from './sections/Awards/Awards';
import Skills from './sections/Skills/Skills';
import Teaching from './sections/Teaching/Teaching';
import Leadership from './sections/Leadership/Leadership';
import Gallery from './sections/Gallery/Gallery';
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
        <Conferences />
        <WaveDivider />
        <Awards />
        <WaveDivider flip />
        <Skills />
        <WaveDivider />
        <Teaching />
        <WaveDivider flip />
        <Leadership />
        <WaveDivider />
        <Gallery />
        <WaveDivider flip />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
