'use client';

import { motion } from 'framer-motion';
import { FiHeart, FiGlobe, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import ThreeDCard from '@/components/ui/ThreeDCard';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Raushancreation1',
      icon: <FaGithub className="w-5 h-5" />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/raushan-kumar-b4a9a0203/',
      icon: <FaLinkedin className="w-5 h-5" />,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: <FaTwitter className="w-5 h-5" />,
    },
  ];

  const linkColumns = [
    {
      title: 'Explore',
      links: [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Skills', href: '#skills' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'GitHub', href: 'https://github.com/Raushancreation1' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/raushan-kumar-b4a9a0203/' },
        { label: 'Resume', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Get in touch',
      links: [
        { label: 'Email', href: 'mailto:raushancreationmuz@gmail.com' },
        { label: 'Location', href: 'https://www.google.com/maps' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <a
              href="#home"
              className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors"
            >
              Raushan Kumar
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex space-x-4 md:space-x-6 mb-10"
          >
            {socialLinks.map((social, index) => (
              <ThreeDCard
                key={index}
                className="bg-gray-800/60 rounded-xl p-3 border border-gray-800 hover:border-indigo-500/40"
                maxTilt={16}
                perspective={700}
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-indigo-400 transition-colors flex items-center justify-center"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              </ThreeDCard>
            ))}
          </motion.div>

          {/* Link Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl mb-10 text-left"
          >
            {linkColumns.map((col, i) => (
              <div key={i}>
                <h5 className="text-indigo-400 uppercase tracking-wide text-sm mb-3">{col.title}</h5>
                <ul className="space-y-2 text-gray-300">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="hover:text-white transition-colors flex items-center gap-2">
                        {l.label === 'Email' && <FiMail className="opacity-70" />}
                        {l.label === 'Location' && <FiGlobe className="opacity-70" />}
                        <span>{l.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-400"
          >
            <span>© {currentYear} All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>
              Made with <FiHeart className="inline text-red-500" /> by Raushan Kumar
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 pt-8 border-t border-gray-800 w-full max-w-md"
          >
            <p className="text-sm text-gray-500">
              Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.
              <br />
              Hosted on Vercel.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
