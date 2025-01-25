import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './Menu.css';

interface MenuProps {
  onClear: () => void;
  onExport: () => void;
}

const Menu: React.FC<MenuProps> = ({ onClear, onExport }) => {
  return (
    <header className="header">
      <nav className="nav-menu">
        <div className="logo">Ney Nota</div>
        <div className="nav-buttons">
          <a href="#" onClick={(e) => { e.preventDefault(); onExport(); }}>
            <FontAwesomeIcon icon={faFileExport} title="Export" />
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); onClear(); }}>
            <FontAwesomeIcon icon={faTrash} title="Clear" />
          </a>
          <a href="https://github.com/ahmeturganci/ney-nota-coloring" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} title="GitHub" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Menu;