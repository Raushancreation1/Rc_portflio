'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Dynamically import components with no SSR to avoid hydration issues
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false });
const About = dynamic(() => import('@/components/sections/About'), { ssr: false });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false });
const Skills = dynamic(() => import('@/components/sections/Skills').then(mod => mod.default), { 
  ssr: false,
  loading: () => <div className="h-screen flex items-center justify-center">Loading skills...</div> 
});
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });
const ThreeDCardExample = dynamic(() => import('@/components/examples/ThreeDCardExample'), { 
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading 3D cards...</div>
});

// Loading component for suspense fallback
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We're having trouble loading this section. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main page component
export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<Loading />}>
            <Hero />
            <About />
            <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  My <span className="text-indigo-600 dark:text-indigo-400">Expertise</span>
                </h2>
                <ThreeDCardExample />
              </div>
            </section>
            <Projects />
            <Skills />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
