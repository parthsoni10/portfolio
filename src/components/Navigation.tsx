import { Moon, Sun, Github, Linkedin } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../utils/constants';

export const Navigation = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center glassmorphism"
    >
      <div className="text-xl font-display font-bold tracking-wider text-gradient">
        PS.
      </div>
      
      <div className="flex gap-6 items-center">
        {['About', 'Projects', 'Education', 'Skills', 'Contact'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium hover:text-accent transition-colors hidden md:block"
          >
            {item}
          </a>
        ))}
        
        {/* Social Icons */}
        <div className="flex gap-3 items-center ml-2">
          <a
            href={PORTFOLIO_DATA.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 interactive hover:text-accent hover:shadow-[0_0_12px_rgba(0,240,255,0.4)]"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={PORTFOLIO_DATA.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 interactive hover:text-accent-purple hover:shadow-[0_0_12px_rgba(176,38,255,0.4)]"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
        
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full hover:bg-white/10 transition-colors interactive"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-accent" />
          ) : (
            <Moon className="w-5 h-5 text-accent-purple" />
          )}
        </button>
      </div>
    </motion.nav>
  );
};
