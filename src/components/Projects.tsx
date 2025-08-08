import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const Projects: React.FC = () => {
  const { projects } = resumeData;

  return (
    <section className="section">
      <h2>Projects</h2>
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="card"
        >
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div>
            {project.tech.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default Projects;