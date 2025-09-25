'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
 

const About = () => {
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

  const skills = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React.js',
    'Next.js',
    'Node.js',
    'Python',
    'C++',
    'MongoDB',
    'Tailwind CSS',
    'Git',
    'Docker',
    'AWS',
  ];

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-12"
            variants={itemVariants}
          />
          
          <div className="flex flex-col items-center gap-12">
            <motion.div
              className="w-full flex justify-center"
              variants={itemVariants}
            >
              <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-indigo-100 dark:border-indigo-900/50 shadow-xl">
                <Image
                  src="/profile/aboutme.jpeg"
                  alt="About Me portrait"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 10rem, 14rem"
                />
              </div>
            </motion.div>
            <motion.div
              className="w-full space-y-6"
              variants={itemVariants}
            >
              <motion.p className="text-lg text-gray-700 dark:text-gray-300">
                Hello! I'm a passionate Full Stack Developer with a strong foundation in both frontend and backend development. 
                I love creating beautiful, responsive, and user-friendly applications that solve real-world problems.
              </motion.p>
              
              <motion.p className="text-lg text-gray-700 dark:text-gray-300">
                I have experience working with modern web technologies and frameworks, and I'm always eager to learn and 
                adapt to new tools and methodologies. My goal is to build applications that are not only functional 
                but also provide an exceptional user experience.
              </motion.p>
              
              <motion.p className="text-lg text-gray-700 dark:text-gray-300">
                Here are a few technologies I've been working with recently:
              </motion.p>
              
              <motion.div className="grid grid-cols-2 gap-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    variants={itemVariants}
                  >
                    <span className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-2"></span>
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div className="pt-4">
                <a
                  href="#contact"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Get In Touch
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
