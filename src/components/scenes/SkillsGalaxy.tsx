import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../utils/constants';

export const SkillsGalaxy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="skills" ref={containerRef} className="relative min-h-screen py-24 px-8 z-10 flex flex-col items-center justify-center">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Skills <span className="text-gradient">Galaxy</span>
        </h2>
        <p className="text-text-muted">Technologies I work with</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {PORTFOLIO_DATA.skills.map((skill, index) => {
          // Calculate random floating values
          const duration = 3 + Math.random() * 2;
          const yOffset = 10 + Math.random() * 15;
          const delay = Math.random() * 2;

          return (
            <motion.div
              key={skill}
              custom={index}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: (i) => ({
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }
                })
              }}
              className="relative group interactive"
            >
              <motion.div
                animate={{
                  y: [-yOffset, yOffset],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay,
                }}
                className="glassmorphism px-6 py-3 rounded-full border border-accent/20 cursor-default shadow-[0_0_15px_rgba(0,240,255,0.0)] hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-shadow duration-300"
              >
                <span className="font-medium text-text group-hover:text-accent transition-colors">
                  {skill}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
