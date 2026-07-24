import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../utils/constants';

const EducationCard = ({ item, index }: { item: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.2 1"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className={`flex w-full mb-12 ${isEven ? 'justify-start' : 'justify-end'} relative`}
    >
      {/* Timeline line connector */}
      <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_10px_var(--color-accent)] hidden md:block" />
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`w-full md:w-[45%] glassmorphism rounded-3xl p-8 relative group overflow-hidden interactive flex flex-col perspective-1000 ${
          isEven ? 'md:pr-12' : 'md:pl-12'
        }`}
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, #00f0ff 0%, transparent 70%)` }}
        />
        
        <div className="relative z-10 flex-grow">
          <span className="text-accent font-medium mb-2 block">{item.period}</span>
          <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300" style={{ backgroundImage: `linear-gradient(to right, #fff, #00f0ff)` }}>
            {item.degree}
          </h3>
          <h4 className="text-lg text-text mb-4">{item.institution}</h4>
          
          {item.details && item.details.length > 0 && (
            <ul className="text-text-muted list-disc list-inside space-y-1">
              {item.details.map((detail: string, i: number) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Education = () => {
  return (
    <section id="education" className="relative min-h-screen py-24 px-8 z-10">
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Academic <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            My educational background and academic achievements.
          </p>
        </motion.div>

        {/* Central Timeline Line */}
        <div className="absolute top-[180px] bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-accent/50 via-accent/20 to-transparent -translate-x-1/2 hidden md:block" />

        <div className="relative z-10">
          {PORTFOLIO_DATA.education.map((item, index) => (
            <EducationCard key={index} item={item} index={index} />
          ))}
          
          {PORTFOLIO_DATA.awards && PORTFOLIO_DATA.awards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 w-full glassmorphism rounded-3xl p-8 interactive"
            >
              <h3 className="text-3xl font-display font-bold mb-6 text-center">Awards & <span className="text-gradient">Honors</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PORTFOLIO_DATA.awards.map((award, i) => (
                  <div key={i} className="bg-background/30 p-6 rounded-2xl border border-white/5 hover:border-accent/30 transition-colors">
                    <p className="font-semibold text-lg mb-2">{award.title}</p>
                    <p className="text-accent/80 text-sm">{award.issuer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
