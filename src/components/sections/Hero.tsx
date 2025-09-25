'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import ThreeDCard from '@/components/ui/ThreeDCard';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16"
    >
      <div className="container mx-auto px-4 py-16 md:py-24">
        <ThreeDCard className="max-w-4xl mx-auto text-center bg-transparent">
          <motion.div
            ref={ref}
            className=""
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
          {/* 3D layered heading */}
          <div className="relative [transform-style:preserve-3d]">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
              variants={itemVariants}
              initial={{ backgroundPosition: '0% 50%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%', transform: 'translateZ(40px)' }}
            >
              Hi, I'm Raushan Kumar
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-8"
              variants={itemVariants}
              style={{ transform: 'translateZ(20px)' }}
            >
              Full Stack Developer
            </motion.h2>

            {/* subtle glow layer */}
            <motion.div
              className="pointer-events-none absolute -inset-x-10 -inset-y-2 rounded-3xl blur-2xl"
              style={{ transform: 'translateZ(5px)' }}
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-full h-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
            </motion.div>
          </div>
          
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            I build exceptional digital experiences. Specialized in creating beautiful, responsive,
            and user-friendly applications with modern technologies.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            <a
              href="#contact"
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get In Touch
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <FiDownload /> Download CV
            </a>
          </motion.div>
          
          <motion.div
            className="flex justify-center space-x-6"
            variants={itemVariants}
          >
            <a
              href="https://github.com/Raushancreation1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/raushan-kumar-b4a9a0203/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={24} />
            </a>
            <a
              href="mailto:raushancraetionmuz@gmail.com"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Email"
            >
              <FiMail size={24} />
            </a>
          </motion.div>
          </motion.div>
        </ThreeDCard>
        
        <motion.div
          className="mt-16 md:mt-24 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="w-12 h-20 border-4 border-indigo-600 dark:border-indigo-400 rounded-full flex justify-center p-2">
            <motion.div
              className="w-2 h-6 bg-indigo-600 dark:bg-indigo-400 rounded-full"
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
