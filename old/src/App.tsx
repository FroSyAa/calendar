import { Header } from './components/Header';
import { Preloader } from './components/Preloader';
import { AboutMe } from './sections/AboutMe/AboutMe';
import { Contacts } from './sections/Contacts/Contacts';
import { Experience } from './sections/Experience/Experience';
import { Hero } from './sections/Hero/Hero';
import { Skills } from './sections/Skills/Skills';
import { useAssetsReady } from './hooks/useAssetsReady';

function App() {
  const assetsReady = useAssetsReady();

  return (
    <div className="app">
      {!assetsReady && <Preloader />}
      <Header />
      <Hero />
      <AboutMe />
      <Experience />
      <Skills />
      <Contacts />
    </div>
  );
}

export default App;