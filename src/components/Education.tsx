import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const Education: React.FC = () => {
  const { education } = resumeData;

  return (
    <section className="section">
      <h2>Education</h2>
      {education.map((edu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="card"
        >
          <h3>{edu.institution}</h3>
          <p>{edu.degree}</p>
          <p><em>{edu.dates}</em></p>
        </motion.div>
      ))}
    </section>
  );
};

export default Education;