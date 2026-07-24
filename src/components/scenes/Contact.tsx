import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../utils/constants';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus('sending');

    try {
      // Construct mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:parthsoni1015@gmail.com?subject=${subject}&body=${body}`;
      
      // Open the mailto link
      window.location.href = mailtoLink;

      // Show success after a brief delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 4 seconds
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="relative min-h-[80vh] py-24 px-8 z-10 flex items-center justify-center">
      <div className="w-full max-w-4xl glassmorphism rounded-3xl p-8 md:p-16 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--color-accent-purple)_0%,_transparent_50%)] opacity-10 pointer-events-none mix-blend-screen" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
            >
              Let's <span className="text-gradient">Connect</span>
            </motion.h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            {/* Contact Info */}
            <div className="mb-8 space-y-3">
              <a href={PORTFOLIO_DATA.socials.email} className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors interactive">
                <Mail className="w-4 h-4" />
                <span className="text-sm">parthsoni1015@gmail.com</span>
              </a>
              <a href={PORTFOLIO_DATA.socials.phone} className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors interactive">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91-9974144294</span>
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noreferrer" className="p-3 glassmorphism rounded-full hover:bg-accent/20 transition-colors interactive">
                <Github className="w-6 h-6" />
              </a>
              <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="p-3 glassmorphism rounded-full hover:bg-accent/20 transition-colors interactive">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href={PORTFOLIO_DATA.socials.email} className="p-3 glassmorphism rounded-full hover:bg-accent/20 transition-colors interactive">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="relative group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors peer interactive"
              />
              <div className="absolute inset-0 border border-accent rounded-lg opacity-0 peer-focus:opacity-100 peer-focus:shadow-[0_0_10px_var(--color-accent)] transition-all pointer-events-none" />
            </div>
            
            <div className="relative group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors peer interactive"
              />
              <div className="absolute inset-0 border border-accent rounded-lg opacity-0 peer-focus:opacity-100 peer-focus:shadow-[0_0_10px_var(--color-accent)] transition-all pointer-events-none" />
            </div>
            
            <div className="relative group">
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors peer resize-none interactive"
              />
              <div className="absolute inset-0 border border-accent rounded-lg opacity-0 peer-focus:opacity-100 peer-focus:shadow-[0_0_10px_var(--color-accent)] transition-all pointer-events-none" />
            </div>
            
            <button
              type="submit"
              disabled={status === 'sending'}
              className="relative bg-text text-background font-semibold py-3 rounded-lg hover:bg-accent transition-all duration-300 interactive disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </motion.span>
                )}
                {status === 'sending' && (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.div>
                    Opening Email Client...
                  </motion.span>
                )}
                {status === 'success' && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 text-green-600"
                  >
                    <CheckCircle className="w-4 h-4" /> Email Client Opened!
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 text-red-500"
                  >
                    <AlertCircle className="w-4 h-4" /> Something went wrong
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Direct email fallback */}
            <p className="text-center text-xs text-text-muted mt-2">
              Or email me directly at{' '}
              <a href="mailto:parthsoni1015@gmail.com" className="text-accent hover:underline interactive">
                parthsoni1015@gmail.com
              </a>
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
