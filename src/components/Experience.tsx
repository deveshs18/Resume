import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const Experience: React.FC = () => {
  const { experience } = resumeData;

  return (
    <section className="section">
      <h2>Experience</h2>
      {experience.map((job, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="card"
        >
          <h3>{job.role} at {job.company}</h3>
          <p><em>{job.dates}</em></p>
          <ul>
            {job.description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </section>
  );
};

export default Experience;