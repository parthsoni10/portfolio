import { useLenis } from './hooks/useLenis';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { CanvasContainer } from './components/CanvasContainer';
import { HeroScene } from './components/scenes/HeroScene';
import { AboutOrb } from './components/scenes/AboutOrb';
import { ProjectCards } from './components/scenes/ProjectCards';
import { Education } from './components/scenes/Education';
import { SkillsGalaxy } from './components/scenes/SkillsGalaxy';
import { Contact } from './components/scenes/Contact';

function App() {
  useLenis();

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-accent font-sans">
      <CustomCursor />
      <Navigation />
      <CanvasContainer />
      
      <main className="relative z-10 w-full flex flex-col">
        <HeroScene />
        <AboutOrb />
        <ProjectCards />
        <Education />
        <SkillsGalaxy />
        <Contact />
      </main>
    </div>
  );
}

export default App;
