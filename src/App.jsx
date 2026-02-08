import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
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
        <Research />
        <Publications />
        <Education />
        <Skills />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
