import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const Skills: React.FC = () => {
  const { skills } = resumeData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="section">
      <h2>Skills</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="skills-container"
      >
        {skills.map((skill, index) => (
          <motion.div key={index} variants={itemVariants} className="skill-tag">
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;