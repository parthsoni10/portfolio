import { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../utils/constants';
import { ExternalLink, Github, ChevronRight, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  highlights?: string[];
  tech: string[];
  link: string;
  liveLink?: string;
  color: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.2 1"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Trap wheel events inside the overlay so page doesn't scroll
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    // Manually scroll the overlay content
    const el = overlayContentRef.current;
    if (el) {
      el.scrollTop += e.deltaY;
    }
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="relative glassmorphism rounded-3xl overflow-hidden interactive perspective-1000"
    >
      {/* Default Card View */}
      <motion.div
        animate={{ opacity: isExpanded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="p-8 flex flex-col h-full min-h-[360px]"
        onMouseEnter={() => setIsExpanded(true)}
      >
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)` }}
        />
        
        <div className="relative z-10 flex-grow">
          <h3 className="text-3xl font-display font-bold mb-1" style={{ color: project.color }}>
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-sm font-medium mb-4 text-text-muted">
              {project.subtitle}
            </p>
          )}
          <p className="text-text-muted mb-6 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.slice(0, 5).map((tech: string) => (
              <span 
                key={tech} 
                className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/50 border border-border"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/50 border border-border text-text-muted">
                +{project.tech.length - 5} more
              </span>
            )}
          </div>
        </div>
        
        {/* Hover hint */}
        <div className="relative z-10 flex items-center gap-2 text-xs text-text-muted/60 mt-auto">
          <ChevronRight className="w-3 h-3 animate-pulse" />
          <span>Hover for details</span>
        </div>
      </motion.div>

      {/* Expanded Detail Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 flex flex-col"
            onMouseLeave={() => setIsExpanded(false)}
          >
            {/* Gradient background */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ 
                background: `linear-gradient(135deg, rgba(10,10,15,0.97) 0%, rgba(18,18,26,0.98) 50%, rgba(10,10,15,0.97) 100%)`,
              }}
            />
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ 
                background: `radial-gradient(ellipse at top left, ${project.color}15 0%, transparent 50%)`,
              }}
            />

            {/* Content */}
            <div
              ref={overlayContentRef}
              onWheel={handleWheel}
              className="relative z-10 p-8 flex flex-col h-full overflow-y-auto custom-scrollbar"
              style={{ overscrollBehavior: 'contain' }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <motion.h3 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className="text-2xl font-display font-bold"
                    style={{ color: project.color }}
                  >
                    {project.title}
                  </motion.h3>
                  {project.subtitle && (
                    <motion.p 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-xs font-medium text-text-muted mt-1"
                    >
                      {project.subtitle}
                    </motion.p>
                  )}
                </div>
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4 text-text-muted" />
                </motion.button>
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-4 flex-grow">
                  <ul className="space-y-2.5">
                    {project.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -15, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + i * 0.06, ease: "easeOut" }}
                        className="flex items-start gap-2.5 text-sm text-text/90 leading-relaxed"
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{ backgroundColor: project.color, boxShadow: `0 0 6px ${project.color}60` }}
                        />
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack (full) */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech: string) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 text-[11px] font-medium rounded-full border"
                      style={{ 
                        borderColor: `${project.color}30`,
                        backgroundColor: `${project.color}10`,
                        color: project.color
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Action Links */}
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex gap-3 mt-auto pt-2"
              >
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105"
                  style={{ 
                    borderColor: `${project.color}40`,
                    color: project.color
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${project.color}20`;
                    e.currentTarget.style.boxShadow = `0 0 15px ${project.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Github className="w-4 h-4" /> View Code
                </a>
                {project.liveLink && (
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                    style={{ 
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${project.color}35`;
                      e.currentTarget.style.boxShadow = `0 0 15px ${project.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${project.color}20`;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const ProjectCards = () => {
  return (
    <section id="projects" className="relative min-h-screen py-24 px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            A selection of my recent work focusing on full-stack development, AI integration, and machine learning applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
