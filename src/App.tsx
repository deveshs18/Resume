import React from 'react';
import Header from './components/Header';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import './styles/main.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <Skills />
      <Projects />
      <Experience />
      <Education />
    </div>
  );
};

export default App;