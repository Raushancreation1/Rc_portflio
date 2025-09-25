'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from 'react';
import ThreeDCard from '@/components/ui/ThreeDCard';
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiExpress } from 'react-icons/si';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  items: Skill[];
}

const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'React', level: 88 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Redux', level: 80 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 82 },
      { name: 'Python', level: 88 },
      { name: 'C++', level: 80 },
      { name: 'RESTful APIs', level: 88 },
      { name: 'GraphQL', level: 75 },
    ],
  },
  {
    category: 'Database & Tools',
    items: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 78 },
      { name: 'AWS', level: 75 },
      { name: 'Firebase', level: 80 },
    ],
  },
];

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const ProgressBar: React.FC<{ level: number }> = ({ level }) => (
    <motion.div
      className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full"
      initial={{ width: 0 }}
      whileInView={{ 
        width: `${level}%`,
        transition: { duration: 1, ease: "easeInOut" } 
      }}
      viewport={{ once: true }}
    />
  );

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      },
    }),
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
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
            My Skills
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-12"
            variants={itemVariants}
          />
          {/* 3D Icons Grid */}
          <motion.div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 mb-12"
            variants={itemVariants}
          >
            {[
              { icon: <FaReact size={32} />, label: 'React' },
              { icon: <SiNextdotjs size={32} />, label: 'Next.js' },
              { icon: <SiTypescript size={32} />, label: 'TypeScript' },
              { icon: <FaNodeJs size={32} />, label: 'Node.js' },
              { icon: <SiExpress size={32} />, label: 'Express' },
              { icon: <SiMongodb size={32} />, label: 'MongoDB' },
              { icon: <SiPostgresql size={32} />, label: 'PostgreSQL' },
              { icon: <SiTailwindcss size={32} />, label: 'Tailwind' },
              { icon: <FaGitAlt size={32} />, label: 'Git' },
              { icon: <FaDocker size={32} />, label: 'Docker' },
              { icon: <FaAws size={32} />, label: 'AWS' },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <ThreeDCard className="bg-white dark:bg-gray-900 rounded-xl p-4 flex flex-col items-center justify-center shadow-md border border-gray-100 dark:border-gray-800">
                  <div className="text-indigo-600 dark:text-indigo-400">{item.icon}</div>
                  <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">{item.label}</div>
                </ThreeDCard>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((category) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <ThreeDCard className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-6 text-center text-indigo-600 dark:text-indigo-400">
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.items.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <ProgressBar level={skill.level} />
                        </div>
                      </div>
                    ))}
                  </div>
                </ThreeDCard>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              And many more...
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              I'm always learning and expanding my skill set. Here are some other technologies I've worked with:
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {[
                'SASS', 'Styled Components', 'Material-UI', 'Chakra UI', 'Framer Motion',
                'Jest', 'Cypress', 'React Testing Library', 'Mocha', 'Chai',
                'MongoDB Atlas', 'Mongoose', 'Prisma', 'TypeORM', 'Sequelize',
                'Docker Compose', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Nginx',
                'Webpack', 'Babel', 'Vite', 'ESLint', 'Prettier'
              ].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 text-sm bg-indigo-100 dark:bg-gray-800 text-indigo-800 dark:text-indigo-300 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
