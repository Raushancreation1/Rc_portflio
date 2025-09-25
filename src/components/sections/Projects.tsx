'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiDatabase, FiCpu, FiLayers, FiMonitor, FiSmartphone, FiServer, FiGlobe } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaPython, FaJava, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiFirebase, SiGraphql, SiRedux, SiExpress, SiStripe, SiSocketdotio, SiFramer } from 'react-icons/si';
import { useInView } from 'react-intersection-observer';
import ThreeDCard from '@/components/ui/ThreeDCard';

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        if (!res.ok) {
          let detail = '';
          try {
            detail = await res.text();
          } catch {}
          throw new Error(`HTTP ${res.status}${detail ? `: ${detail}` : ''}`);
        }
        const data = await res.json();
        if (!data?.ok) {
          throw new Error(data?.error || 'Unknown API error');
        }
        const items: Project[] = (data.projects || []).map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          tags: Array.isArray(p.tags) ? p.tags : [],
          image: p.image || '',
          githubUrl: p.githubUrl || '',
          liveUrl: p.liveUrl || '',
        }));
        setProjects(items);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to get icon for tech stack tags
  const getIconForTag = (tag: string): ReactNode => {
    const iconMap: Record<string, ReactNode> = {
      // Frameworks
      'React': <FaReact className="mr-1" />,
      'Next.js': <SiNextdotjs className="mr-1" />,
      'Node.js': <FaNodeJs className="mr-1" />,
      'Express': <SiExpress className="mr-1" />,
      'Redux': <SiRedux className="mr-1" />,
      'GraphQL': <SiGraphql className="mr-1" />,
      'TypeScript': <SiTypescript className="mr-1" />,
      'JavaScript': <FaJs className="mr-1" />,
      'HTML5': <FaHtml5 className="mr-1" />,
      'CSS': <FaCss3Alt className="mr-1" />,
      'Tailwind CSS': <SiTailwindcss className="mr-1" />,
      'MongoDB': <SiMongodb className="mr-1" />,
      'PostgreSQL': <SiPostgresql className="mr-1" />,
      'Firebase': <SiFirebase className="mr-1" />,
      'Python': <FaPython className="mr-1" />,
      'Java': <FaJava className="mr-1" />,
      'Docker': <FaDocker className="mr-1" />,
      'AWS': <FaAws className="mr-1" />,
      // Extras
      'Stripe': <SiStripe className="mr-1" />,
      'WebSocket': <SiSocketdotio className="mr-1" />,
      'Framer Motion': <SiFramer className="mr-1" />,
      // Fallback icons based on category
      'frontend': <FiMonitor className="mr-1" />,
      'backend': <FiServer className="mr-1" />,
      'mobile': <FiSmartphone className="mr-1" />,
      'database': <FiDatabase className="mr-1" />,
      'api': <FiCode className="mr-1" />,
      'full-stack': <FiLayers className="mr-1" />
    };

    return iconMap[tag] || <FiCode className="mr-1" />;
  };

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
      id="projects"
      className="py-20 bg-gray-50 dark:bg-gray-800"
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
            My Projects
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-12"
            variants={itemVariants}
          />
          
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
              <p className="mt-4 text-gray-700 dark:text-gray-300">Loading projects...</p>
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="col-span-full text-center text-gray-600 dark:text-gray-400 py-8">
              No projects found. Add some via the API or seed your database.
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <ThreeDCard className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/600x400/1e40af/ffffff?text=${encodeURIComponent(project.title)}`;
                        }}
                      />
                    </div>
                    <div className="p-6">
                      {/* 3D Tech Icons Grid */}
                      <div className="grid grid-cols-5 gap-3 mb-4">
                        {project.tags.slice(0, 5).map((tag, idx) => (
                          <ThreeDCard
                            key={`${project.id}-icon-${idx}`}
                            className="bg-white dark:bg-gray-900 rounded-md p-2 flex items-center justify-center border border-gray-100 dark:border-gray-800 shadow-sm"
                            maxTilt={20}
                            perspective={700}
                            scaleOnHover={true}
                          >
                            <div
                              className="text-indigo-600 dark:text-indigo-400 text-xl"
                              aria-label={`${tag} icon`}
                              title={tag}
                            >
                              {getIconForTag(tag)}
                            </div>
                          </ThreeDCard>
                        ))}
                      </div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        <div className="flex space-x-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                              aria-label="GitHub Repository"
                            >
                              <FiGithub size={20} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                              aria-label="Live Demo"
                            >
                              <FiExternalLink size={20} />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="flex items-center px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-gray-700 text-indigo-800 dark:text-indigo-300 rounded-full"
                          >
                            {getIconForTag(tag)}
                            <span className="ml-1">{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </ThreeDCard>
                </motion.div>
              ))}
            </div>
          )}
          
          <motion.div
            className="text-center mt-12"
            variants={itemVariants}
          >
            <a
              href="https://github.com/Raushancreation1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors"
            >
              View All Projects on GitHub
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
