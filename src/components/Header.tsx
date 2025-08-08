import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const Header: React.FC = () => {
  const { name, title, contact } = resumeData;

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section"
    >
      <h1>{name}</h1>
      <h2>{title}</h2>
      <p>
        <a href={`mailto:${contact.email}`}>{contact.email}</a> | 
        <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a> | 
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
    </motion.header>
  );
};

export default Header;